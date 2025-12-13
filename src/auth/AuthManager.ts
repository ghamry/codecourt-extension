/**
 * AuthManager - Handles OAuth2 authentication with Code Court
 * Follows Single Responsibility Principle
 * Phase 2 Implementation
 */

import * as vscode from 'vscode';
import { AuthData, TokenResponse } from '../types';
import { Logger } from '../utils/Logger';

const AUTH_SECRET_KEY = 'codecourt.auth';

export class AuthManager {
  private authPromiseResolve?: (success: boolean) => void;

  constructor(private readonly context: vscode.ExtensionContext) {}

  /**
   * Check if user is authenticated
   */
  public async isAuthenticated(): Promise<boolean> {
    const authData = await this.getAuthData();
    if (!authData) {
      return false;
    }

    // Check if token is expired
    if (authData.expiresAt < Date.now()) {
      Logger.warn('Authentication token expired');
      await this.clearAuth();
      return false;
    }

    return true;
  }

  /**
   * Get stored authentication data
   */
  public async getAuthData(): Promise<AuthData | null> {
    try {
      const authJson = await this.context.secrets.get(AUTH_SECRET_KEY);
      if (!authJson) {
        return null;
      }
      return JSON.parse(authJson) as AuthData;
    } catch (error) {
      Logger.error('Failed to get auth data', error);
      return null;
    }
  }

  /**
   * Get access token for API requests
   */
  public async getAccessToken(): Promise<string | null> {
    const authData = await this.getAuthData();
    return authData?.accessToken ?? null;
  }

  /**
   * Start modern OAuth authentication flow with automatic callback
   * Opens browser, user approves, VS Code receives callback automatically
   */
  public async authenticate(): Promise<boolean> {
    try {
      Logger.info('Starting modern OAuth authentication flow...');

      // Get API URL from config
      const config = vscode.workspace.getConfiguration('codecourt');
      const apiUrl = config.get<string>('apiUrl') || process.env.CODECOURT_API_URL || 'https://www.codecourt.dev';

      // Generate random state for security (CSRF protection)
      const state = this.generateRandomString(32);

      // Build OAuth URL with callback
      const callbackUri = await vscode.env.asExternalUri(
        vscode.Uri.parse(`${vscode.env.uriScheme}://codecourt.codecourt/auth-callback`)
      );

      const authUrl = `${apiUrl}/vscode-auth?state=${state}&callbackUri=${encodeURIComponent(callbackUri.toString())}`;

      Logger.debug('Auth URL', { authUrl, callbackUri: callbackUri.toString() });

      // Open browser
      await vscode.env.openExternal(vscode.Uri.parse(authUrl));

      // Show waiting message
      vscode.window.showInformationMessage(
        'Opening browser for authentication. After you approve, you\'ll be automatically signed in.',
        { modal: false }
      );

      // Wait for callback (with timeout)
      return new Promise<boolean>((resolve) => {
        this.authPromiseResolve = resolve;

        // Timeout after 5 minutes
        setTimeout(() => {
          if (this.authPromiseResolve) {
            Logger.warn('Authentication timed out');
            this.authPromiseResolve(false);
            this.authPromiseResolve = undefined;
          }
        }, 5 * 60 * 1000);
      });

    } catch (error) {
      Logger.error('Authentication failed', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      vscode.window.showErrorMessage(`Authentication failed: ${errorMessage}`);
      return false;
    }
  }

  /**
   * Handle OAuth callback from browser
   * Called by URI handler in extension.ts
   */
  public async handleAuthCallback(uri: vscode.Uri): Promise<void> {
    try {
      Logger.info('Handling auth callback...');
      Logger.debug('Callback URI details', {
        toString: uri.toString(),
        query: uri.query,
        path: uri.path
      });

      // Parse query parameters
      // Note: The query might be double-encoded, so we need to handle that
      let queryString = uri.query;

      // If the query string is empty but the full URI has parameters after the path,
      // extract them manually
      if (!queryString && uri.toString().includes('?')) {
        const fullUri = uri.toString();
        const queryStart = fullUri.indexOf('?');
        if (queryStart !== -1) {
          queryString = fullUri.substring(queryStart + 1);
        }
      }

      Logger.debug('Extracted query string', { queryString });

      const query = new URLSearchParams(queryString);
      const token = query.get('token');
      const error = query.get('error');

      Logger.debug('Parsed parameters', { hasToken: !!token, hasError: !!error });

      if (error) {
        throw new Error(error);
      }

      if (!token) {
        throw new Error('No token received from callback');
      }

      // Get API URL
      const config = vscode.workspace.getConfiguration('codecourt');
      const apiUrl = config.get<string>('apiUrl') || process.env.CODECOURT_API_URL || 'https://www.codecourt.dev';

      // Verify token with API
      const verifyUrl = `${apiUrl}/api/auth/vscode-verify`;
      const response = await fetch(verifyUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({})) as { error?: string };
        throw new Error(errorData.error || 'Token verification failed');
      }

      const data = await response.json() as {
        valid?: boolean;
        user?: { id: string; email: string; name: string };
        expiresAt?: string;
      };

      if (!data.valid || !data.user) {
        throw new Error('Invalid token response from server');
      }

      // Store authentication data
      const authData: AuthData = {
        accessToken: token,
        userId: data.user.id,
        email: data.user.email,
        name: data.user.name,
        expiresAt: new Date(data.expiresAt!).getTime(),
      };

      await this.context.secrets.store(AUTH_SECRET_KEY, JSON.stringify(authData));
      Logger.info(`User authenticated: ${authData.email}`);

      // Show success message
      vscode.window.showInformationMessage(`Welcome to Code Court, ${data.user.name || 'User'}! 🎉`);

      // Resolve the waiting promise
      if (this.authPromiseResolve) {
        this.authPromiseResolve(true);
        this.authPromiseResolve = undefined;
      }

    } catch (error) {
      Logger.error('Failed to handle auth callback', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      vscode.window.showErrorMessage(`Authentication failed: ${errorMessage}`);

      // Reject the waiting promise
      if (this.authPromiseResolve) {
        this.authPromiseResolve(false);
        this.authPromiseResolve = undefined;
      }
    }
  }

  /**
   * Generate random string for CSRF protection
   */
  private generateRandomString(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Store authentication data securely
   */
  public async setAuthData(tokenResponse: TokenResponse): Promise<void> {
    const authData: AuthData = {
      accessToken: tokenResponse.accessToken,
      userId: tokenResponse.userId,
      email: tokenResponse.email,
      name: tokenResponse.name,
      expiresAt: Date.now() + tokenResponse.expiresIn * 1000,
    };

    await this.context.secrets.store(AUTH_SECRET_KEY, JSON.stringify(authData));
    Logger.info(`User authenticated: ${authData.email}`);
  }

  /**
   * Clear authentication data (sign out)
   */
  public async clearAuth(): Promise<void> {
    await this.context.secrets.delete(AUTH_SECRET_KEY);
    Logger.info('User signed out');
  }
}
