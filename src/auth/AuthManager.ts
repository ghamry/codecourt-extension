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
   * Start OAuth2 authentication flow
   * Implementation in Phase 2
   */
  public async authenticate(): Promise<boolean> {
    // TODO: Implement OAuth2 flow in Phase 2
    vscode.window.showInformationMessage('Authentication flow - Phase 2');
    return false;
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
