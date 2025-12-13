/**
 * Command registration and handlers
 * Follows Command Pattern and Single Responsibility
 * Phase 5 Implementation
 */

import * as vscode from 'vscode';
import { AuthManager } from '../auth/AuthManager';
import { CodeCourtClient } from '../api/CodeCourtClient';
import { SnippetsProvider, SnippetTreeItem } from '../providers/SnippetsProvider';
import { Logger } from '../utils/Logger';
import { getApiBaseUrl } from '../utils/config';

/**
 * Register all extension commands
 */
export function registerCommands(
  context: vscode.ExtensionContext,
  authManager: AuthManager,
  apiClient: CodeCourtClient,
  snippetsProvider: SnippetsProvider
): void {
  // Authentication commands
  context.subscriptions.push(
    vscode.commands.registerCommand('codecourt.authenticate', async () => {
      await authenticateCommand(authManager, snippetsProvider);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('codecourt.signOut', async () => {
      await signOutCommand(authManager, snippetsProvider);
    })
  );

  // Snippet management commands
  context.subscriptions.push(
    vscode.commands.registerCommand('codecourt.refreshSnippets', async () => {
      await refreshSnippetsCommand(authManager, snippetsProvider);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('codecourt.insertSnippet', async (item: SnippetTreeItem) => {
      await insertSnippetCommand(item);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('codecourt.createSnippet', async () => {
      await createSnippetCommand(authManager, apiClient, snippetsProvider);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('codecourt.searchSnippets', async () => {
      await searchSnippetsCommand(apiClient);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('codecourt.openInBrowser', async (item: SnippetTreeItem) => {
      await openInBrowserCommand(item);
    })
  );

  Logger.info('All commands registered successfully');
}

/**
 * Authenticate command handler
 */
async function authenticateCommand(
  authManager: AuthManager,
  snippetsProvider: SnippetsProvider
): Promise<void> {
  try {
    const success = await authManager.authenticate();
    if (success) {
      vscode.window.showInformationMessage('Successfully signed in to Code Court!');
      await snippetsProvider.refresh();
    }
  } catch (error) {
    Logger.error('Authentication failed', error);
    vscode.window.showErrorMessage('Failed to sign in. Please try again.');
  }
}

/**
 * Sign out command handler
 */
async function signOutCommand(
  authManager: AuthManager,
  snippetsProvider: SnippetsProvider
): Promise<void> {
  const confirm = await vscode.window.showWarningMessage(
    'Are you sure you want to sign out?',
    'Sign Out',
    'Cancel'
  );

  if (confirm === 'Sign Out') {
    await authManager.clearAuth();
    vscode.window.showInformationMessage('Signed out successfully');
    snippetsProvider.refresh(); // Will show empty state
  }
}

/**
 * Refresh snippets command handler
 */
async function refreshSnippetsCommand(
  authManager: AuthManager,
  snippetsProvider: SnippetsProvider
): Promise<void> {
  if (!(await authManager.isAuthenticated())) {
    vscode.window.showWarningMessage('Please sign in to view your snippets');
    return;
  }

  await vscode.window.withProgress(
    {
      location: vscode.ProgressLocation.Notification,
      title: 'Refreshing Code Court snippets...',
      cancellable: false,
    },
    async () => {
      await snippetsProvider.refresh();
    }
  );
}

/**
 * Insert snippet command handler
 */
async function insertSnippetCommand(item: SnippetTreeItem): Promise<void> {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showWarningMessage('No active editor found');
    return;
  }

  const snippet = item.snippet;
  const config = vscode.workspace.getConfiguration('codecourt');
  const insertMode = config.get<string>('insertMode', 'cursor');

  await editor.edit((editBuilder) => {
    if (insertMode === 'replace' && !editor.selection.isEmpty) {
      // Replace selection
      editBuilder.replace(editor.selection, snippet.code);
    } else {
      // Insert at cursor
      editBuilder.insert(editor.selection.active, snippet.code);
    }
  });

  vscode.window.showInformationMessage(`Inserted: ${snippet.title}`);
  Logger.info(`Inserted snippet: ${snippet.title} (${snippet.id})`);
}

/**
 * Create snippet command handler
 */
async function createSnippetCommand(
  authManager: AuthManager,
  _apiClient: CodeCourtClient,
  _snippetsProvider: SnippetsProvider
): Promise<void> {
  if (!(await authManager.isAuthenticated())) {
    vscode.window.showWarningMessage('Please sign in to create snippets');
    return;
  }

  // TODO: Implement create snippet flow in Phase 5
  vscode.window.showInformationMessage('Create snippet - Phase 5');
}

/**
 * Search snippets command handler
 */
async function searchSnippetsCommand(_apiClient: CodeCourtClient): Promise<void> {
  // TODO: Implement search in Phase 5
  vscode.window.showInformationMessage('Search snippets - Phase 5');
}

/**
 * Open in browser command handler
 */
async function openInBrowserCommand(item: SnippetTreeItem): Promise<void> {
  const url = `${getApiBaseUrl()}/snippets/${item.snippet.id}`;
  vscode.env.openExternal(vscode.Uri.parse(url));
  Logger.info(`Opened snippet in browser: ${item.snippet.id}`);
}
