/**
 * Code Court VS Code Extension
 * Main entry point following clean code and SOLID principles
 */

import * as vscode from 'vscode';
import { AuthManager } from './auth/AuthManager';
import { CodeCourtClient } from './api/CodeCourtClient';
import { SnippetsProvider } from './providers/SnippetsProvider';
import { registerCommands } from './commands';
import { Logger } from './utils/Logger';

/**
 * Extension activation
 * Called when extension is activated (on startup per activationEvents)
 */
export async function activate(context: vscode.ExtensionContext): Promise<void> {
  // Initialize logger with context for environment detection
  Logger.initialize(context);

  Logger.info('Code Court extension is activating...');
  Logger.debug('Environment', {
    extensionMode: context.extensionMode,
    isDevelopment: context.extensionMode === vscode.ExtensionMode.Development,
  });

  try {
    // Initialize core services following Dependency Injection pattern
    const authManager = new AuthManager(context);
    const apiClient = new CodeCourtClient(authManager);
    const snippetsProvider = new SnippetsProvider(apiClient, authManager);

    // Register URI handler for OAuth callbacks
    const uriHandler = vscode.window.registerUriHandler({
      handleUri: async (uri: vscode.Uri) => {
        Logger.info(`Received URI callback: ${uri.toString()}`);

        // Handle auth callback
        if (uri.path === '/auth-callback') {
          await authManager.handleAuthCallback(uri);
        }
      },
    });

    // Register tree view for snippets sidebar
    const treeView = vscode.window.createTreeView('codecourt.snippetsView', {
      treeDataProvider: snippetsProvider,
      showCollapseAll: true,
    });

    // Register all commands with dependency injection
    registerCommands(context, authManager, apiClient, snippetsProvider);

    // Add to subscriptions for proper cleanup
    context.subscriptions.push(uriHandler, treeView);

    // Auto-refresh snippets if user is authenticated and setting is enabled
    const config = vscode.workspace.getConfiguration('codecourt');
    const autoRefresh = config.get<boolean>('autoRefresh', true);
    const isAuthenticated = await authManager.isAuthenticated();

    if (autoRefresh && isAuthenticated) {
      Logger.info('Auto-refreshing snippets...');
      await snippetsProvider.refresh();
    } else if (!isAuthenticated) {
      // Show welcome message for first-time users
      showWelcomeMessage(authManager);
    }

    Logger.info('Code Court extension activated successfully');
  } catch (error) {
    Logger.error('Failed to activate extension', error);
    vscode.window.showErrorMessage(
      'Code Court: Failed to activate extension. Please reload VS Code.'
    );
  }
}

/**
 * Extension deactivation
 * Called when extension is deactivated
 */
export function deactivate(): void {
  Logger.info('Code Court extension is deactivating...');
}

/**
 * Show welcome message to new users
 */
async function showWelcomeMessage(_authManager: AuthManager): Promise<void> {
  const action = await vscode.window.showInformationMessage(
    'Welcome to Code Court! Sign in to access your code snippets directly in VS Code.',
    'Sign In',
    'Learn More'
  );

  if (action === 'Sign In') {
    await vscode.commands.executeCommand('codecourt.authenticate');
  } else if (action === 'Learn More') {
    vscode.env.openExternal(vscode.Uri.parse('https://www.codecourt.dev'));
  }
}
