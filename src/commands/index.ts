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
      await searchSnippetsCommand(snippetsProvider);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('codecourt.clearFilter', async () => {
      await clearFilterCommand(snippetsProvider);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('codecourt.editSnippet', async (item: SnippetTreeItem) => {
      await editSnippetCommand(item, apiClient, snippetsProvider);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('codecourt.openInBrowser', async (item: SnippetTreeItem) => {
      await openInBrowserCommand(item);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('codecourt.deleteSnippet', async (item: SnippetTreeItem) => {
      await deleteSnippetCommand(item, apiClient, snippetsProvider);
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
    await snippetsProvider.refresh();
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

  // Use insertSnippet instead of editBuilder to support variables like $1, ${TM_FILENAME}
  if (insertMode === 'replace' && !editor.selection.isEmpty) {
    // Replace selection
    await editor.insertSnippet(new vscode.SnippetString(snippet.code), editor.selection);
  } else {
    // Insert at cursor
    await editor.insertSnippet(new vscode.SnippetString(snippet.code), editor.selection.active);
  }

  vscode.window.showInformationMessage(`Inserted: ${snippet.title}`);
  Logger.info(`Inserted snippet: ${snippet.title} (${snippet.id})`);
}

/**
 * Create snippet command handler
 */
async function createSnippetCommand(
  authManager: AuthManager,
  apiClient: CodeCourtClient,
  snippetsProvider: SnippetsProvider
): Promise<void> {
  if (!(await authManager.isAuthenticated())) {
    vscode.window.showWarningMessage('Please sign in to create snippets');
    return;
  }

  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showWarningMessage('No active editor found. Please open a file first.');
    return;
  }

  const selection = editor.selection;
  const code = selection.isEmpty ? editor.document.getText() : editor.document.getText(selection);

  if (!code.trim()) {
    vscode.window.showWarningMessage(
      'No code to create snippet from. Please select some code or open a file.'
    );
    return;
  }

  const languageId = editor.document.languageId;

  try {
    const title = await vscode.window.showInputBox({
      prompt: 'Enter snippet title',
      placeHolder: 'My awesome snippet',
      validateInput: (value) => {
        if (!value || value.trim().length < 3) {
          return 'Title must be at least 3 characters';
        }
        return null;
      },
    });

    if (!title) {
      return;
    }

    const description = await vscode.window.showInputBox({
      prompt: 'Enter snippet description (optional)',
      placeHolder: 'What does this snippet do?',
    });

    const tagsInput = await vscode.window.showInputBox({
      prompt: 'Enter tags (comma-separated, optional)',
      placeHolder: 'react, hooks, useEffect',
    });

    const tags = tagsInput
      ? tagsInput
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0)
      : [];

    const visibility = await vscode.window.showQuickPick(
      [
        { label: 'Public', description: 'Anyone can view', value: 'PUBLIC' },
        { label: 'Protected', description: 'Only followers can view', value: 'PROTECTED' },
        { label: 'Private', description: 'Only you can view', value: 'PRIVATE' },
      ],
      { placeHolder: 'Select snippet visibility', canPickMany: false }
    );

    if (!visibility) {
      return;
    }

    await vscode.window.withProgress(
      {
        location: vscode.ProgressLocation.Notification,
        title: 'Creating snippet...',
        cancellable: false,
      },
      async () => {
        const snippet = await apiClient.createSnippet({
          title: title.trim(),
          description: description?.trim() || '',
          code,
          language: languageId,
          tags,
          visibility: visibility.value as 'PUBLIC' | 'PROTECTED' | 'PRIVATE',
        });

        Logger.info(`Snippet created: ${snippet.id}`);
        await snippetsProvider.refresh();

        const action = await vscode.window.showInformationMessage(
          `Snippet "${title}" created successfully!`,
          'View in Browser',
          'Create Another'
        );

        if (action === 'View in Browser') {
          const url = `${getApiBaseUrl()}/snippets/${snippet.id}`;
          vscode.env.openExternal(vscode.Uri.parse(url));
        } else if (action === 'Create Another') {
          await createSnippetCommand(authManager, apiClient, snippetsProvider);
        }
      }
    );
  } catch (error) {
    Logger.error('Failed to create snippet', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    vscode.window.showErrorMessage(`Failed to create snippet: ${errorMessage}`);
  }
}

/**
 * Search snippets command handler
 */
async function searchSnippetsCommand(snippetsProvider: SnippetsProvider): Promise<void> {
  const query = await vscode.window.showInputBox({
    prompt: 'Filter snippets in sidebar',
    placeHolder: 'Enter keywords to filter...',
  });

  if (query !== undefined) {
    if (query) {
      await snippetsProvider.setFilter(query);
    } else {
      await snippetsProvider.setFilter('');
    }
  }
}

/**
 * Clear filter command handler
 */
async function clearFilterCommand(snippetsProvider: SnippetsProvider): Promise<void> {
  await snippetsProvider.setFilter('');
}

/**
 * Delete snippet command handler
 */
async function deleteSnippetCommand(
  item: SnippetTreeItem,
  apiClient: CodeCourtClient,
  snippetsProvider: SnippetsProvider
): Promise<void> {
  try {
    const confirm = await vscode.window.showWarningMessage(
      `Are you sure you want to delete "${item.snippet.title}"?`,
      { modal: true },
      'Delete',
      'Cancel'
    );

    if (confirm !== 'Delete') {
      return;
    }

    await vscode.window.withProgress(
      {
        location: vscode.ProgressLocation.Notification,
        title: 'Deleting snippet...',
        cancellable: false,
      },
      async () => {
        await apiClient.deleteSnippet(item.snippet.id);
      }
    );

    Logger.info(`Snippet deleted successfully: ${item.snippet.id}`);
    vscode.window.showInformationMessage(`Deleted: ${item.snippet.title}`);
    await snippetsProvider.refresh();
  } catch (error) {
    Logger.error('Failed to delete snippet', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    vscode.window.showErrorMessage(`Failed to delete snippet: ${errorMessage}`);
  }
}
/**
 * Open in browser command handler
 */
async function openInBrowserCommand(item: SnippetTreeItem): Promise<void> {
  const url = `${getApiBaseUrl()}/snippets/${item.snippet.id}`;
  vscode.env.openExternal(vscode.Uri.parse(url));
  Logger.info(`Opened snippet in browser: ${item.snippet.id}`);
}

/**
 * Edit snippet command handler
 */
async function editSnippetCommand(
  item: SnippetTreeItem,
  apiClient: CodeCourtClient,
  snippetsProvider: SnippetsProvider
): Promise<void> {
  try {
    // 1. Edit Title
    const title = await vscode.window.showInputBox({
      prompt: 'Edit Snippet Title',
      value: item.snippet.title,
      validateInput: (value) => (value.length < 3 ? 'Title must be at least 3 characters' : null),
    });
    if (title === undefined) {
      return;
    } // Cancelled

    // 2. Edit Description
    const description = await vscode.window.showInputBox({
      prompt: 'Edit Description (Optional)',
      value: item.snippet.description || '',
    });
    if (description === undefined) {
      return;
    }

    // 3. Edit Visibility
    const visibility = await vscode.window.showQuickPick(['PUBLIC', 'PROTECTED', 'PRIVATE'], {
      placeHolder: `Select Visibility (Current: ${item.snippet.visibility})`,
    });
    if (!visibility) {
      return;
    }

    // 4. Update via API
    await vscode.window.withProgress(
      { location: vscode.ProgressLocation.Notification, title: 'Updating snippet...' },
      async () => {
        // We include original code/language/tags to ensure they are preserved if backend expects full object
        await apiClient.updateSnippet(item.snippet.id, {
          title,
          description,
          visibility: visibility as 'PUBLIC' | 'PROTECTED' | 'PRIVATE',
          code: item.snippet.code,
          language: item.snippet.language,
          tags: item.snippet.tags,
        });
      }
    );

    vscode.window.showInformationMessage(`Updated: ${title}`);
    await snippetsProvider.refresh();
  } catch (error) {
    Logger.error('Failed to update snippet', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    vscode.window.showErrorMessage(`Failed to update snippet: ${errorMessage}`);
  }
}
