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
 * Get extension ID
 */
export function getExtensionId(): string {
  return process.env.EXTENSION_ID || 'codecourt.codecourt';
}
