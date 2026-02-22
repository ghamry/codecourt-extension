/**
 * SnippetsProvider - Tree view data provider for snippets sidebar
 * Follows Single Responsibility Principle
 * Phase 4 Implementation
 */

import * as vscode from 'vscode';
import { CodeCourtClient } from '../api/CodeCourtClient';
import { AuthManager } from '../auth/AuthManager';
import { Snippet, SnippetSearchParams } from '../types';
import { Logger } from '../utils/Logger';

/**
 * Tree item for snippet display
 */
export class SnippetTreeItem extends vscode.TreeItem {
  constructor(
    public readonly snippet: Snippet,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState
  ) {
    super(snippet.title, collapsibleState);

    // Create rich tooltip with Markdown
    const tooltip = new vscode.MarkdownString();
    tooltip.appendMarkdown(`**${snippet.title}**\n\n`);
    if (snippet.description) {
      tooltip.appendMarkdown(`_${snippet.description}_\n\n`);
    }
    tooltip.appendMarkdown(`---\n`);
    tooltip.appendCodeblock(snippet.code, snippet.language);

    this.tooltip = tooltip;
    this.description = snippet.language;
    this.contextValue = 'snippet';

    // Set icon based on language
    this.iconPath = new vscode.ThemeIcon('code');

    // Command to insert snippet on click
    this.command = {
      command: 'codecourt.insertSnippet',
      title: 'Insert Snippet',
      arguments: [this],
    };
  }
}

/**
 * Tree data provider for Code Court snippets
 */
export class SnippetsProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
  private _onDidChangeTreeData = new vscode.EventEmitter<vscode.TreeItem | undefined | void>();
  readonly onDidChangeTreeData = this._onDidChangeTreeData.event;

  private snippets: Snippet[] = [];
  private filterQuery: string = '';

  constructor(
    private readonly apiClient: CodeCourtClient,
    private readonly authManager: AuthManager
  ) {}

  /**
   * Set filter query for tree view
   */
  public async setFilter(query: string): Promise<void> {
    this.filterQuery = query;
    await this.refresh();
  }

  /**
   * Refresh tree view
   */
  public async refresh(): Promise<void> {
    try {
      this.snippets = []; // Clear existing while loading
      this._onDidChangeTreeData.fire();

      if (this.filterQuery) {
        Logger.info(`Filtering snippets: "${this.filterQuery}"`);
        const searchParams: SnippetSearchParams = { search: this.filterQuery };
        const results = await this.apiClient.searchSnippets(searchParams);
        this.snippets = results;

        // Update context key for visual state
        vscode.commands.executeCommand('setContext', 'codecourt.isFiltering', true);
      } else {
        Logger.info('Refreshing snippets tree view...');
        this.snippets = await this.apiClient.getMySnippets();

        // Update context key
        vscode.commands.executeCommand('setContext', 'codecourt.isFiltering', false);
      }

      this._onDidChangeTreeData.fire();
    } catch (error) {
      Logger.error('Failed to refresh snippets', error);

      // Check if it's an authentication error (stale/expired token)
      const errorMessage = error instanceof Error ? error.message : '';
      if (errorMessage.includes('Unauthorized') || errorMessage.includes('401')) {
        Logger.warn('Received 401 — clearing stale token and prompting re-login');
        this.snippets = [];
        this._onDidChangeTreeData.fire();

        // Clear the invalid stored token so isAuthenticated() returns false next time
        await this.authManager.clearAuth();

        // Prompt user to sign in again
        const action = await vscode.window.showWarningMessage(
          'Code Court: Your session has expired. Please sign in again.',
          'Sign In'
        );
        if (action === 'Sign In') {
          await vscode.commands.executeCommand('codecourt.authenticate');
        }
      } else {
        vscode.window.showErrorMessage('Failed to load snippets. Please check your connection.');
      }
    }
  }

  /**
   * Get tree item for display
   */
  public getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
    return element;
  }
  /**
   * Get children (snippets) for tree view
   */
  public async getChildren(element?: vscode.TreeItem): Promise<vscode.TreeItem[]> {
    if (element) {
      // No nested items for now
      return [];
    }

    if (this.snippets.length === 0) {
      if (this.filterQuery) {
        // No results for the active filter
        const messageItem = new vscode.TreeItem(`No snippets found for "${this.filterQuery}"`);
        messageItem.contextValue = 'message';
        messageItem.iconPath = new vscode.ThemeIcon('info');
        messageItem.tooltip = 'Try a different search term or clear the filter';
        return [messageItem];
      }

      // Not filtering — check auth state and guide the user
      const isAuth = await this.authManager.isAuthenticated();
      if (!isAuth) {
        const signInItem = new vscode.TreeItem('Sign in to Code Court');
        signInItem.contextValue = 'message';
        signInItem.iconPath = new vscode.ThemeIcon('sign-in');
        signInItem.tooltip = 'Click to sign in and load your snippets';
        signInItem.command = {
          command: 'codecourt.authenticate',
          title: 'Sign In',
        };
        return [signInItem];
      }

      // Authenticated but no snippets yet
      const emptyItem = new vscode.TreeItem('No snippets yet — create one!');
      emptyItem.contextValue = 'message';
      emptyItem.iconPath = new vscode.ThemeIcon('add');
      emptyItem.tooltip = 'Use "Create Snippet from Selection" to add your first snippet';
      emptyItem.command = {
        command: 'codecourt.createSnippet',
        title: 'Create Snippet',
      };
      return [emptyItem];
    }

    // Group snippets by language for better organization
    return this.snippets.map(
      (snippet) => new SnippetTreeItem(snippet, vscode.TreeItemCollapsibleState.None)
    );
  }
}
