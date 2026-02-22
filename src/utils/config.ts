/**
 * Configuration helper utility
 * Centralized access to extension settings and environment variables
 */

import * as vscode from 'vscode';
import { ExtensionConfig } from '../types';

/**
 * Get default API URL from environment variable or fallback
 */
function getDefaultApiUrl(): string {
  return process.env.CODECOURT_API_URL || 'https://www.codecourt.dev';
}

/**
 * Get extension configuration
 * Priority: VS Code Settings > Environment Variables > Defaults
 */
export function getConfig(): ExtensionConfig {
  const config = vscode.workspace.getConfiguration('codecourt');

  return {
    apiUrl: config.get<string>('apiUrl', getDefaultApiUrl()),
    autoRefresh: config.get<boolean>('autoRefresh', true),
    insertMode: config.get<'cursor' | 'replace'>('insertMode', 'cursor'),
  };
}

/**
 * Get API base URL (removes trailing slash)
 */
export function getApiBaseUrl(): string {
  const { apiUrl } = getConfig();
  return apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl;
}

/**
 * Check if running in development mode
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development';
}

/**
 * Get authentication timeout in milliseconds
 * Default: 5 minutes (300000ms)
 */
export function getAuthTimeout(): number {
  const config = vscode.workspace.getConfiguration('codecourt');
  // Priority: VS Code Settings > Environment Variable > Default
  const configuredTimeout = config.get<number>('authTimeout');

  if (configuredTimeout) {
    return configuredTimeout;
  }

  const envTimeout = process.env.CODECOURT_AUTH_TIMEOUT;
  if (envTimeout) {
    const parsed = parseInt(envTimeout, 10);
    if (!isNaN(parsed)) {
      return parsed;
    }
  }

  return 5 * 60 * 1000; // 5 minutes default
}

/**
 * Get extension ID
 */
export function getExtensionId(): string {
  return process.env.EXTENSION_ID || 'codecourt.codecourt';
}
