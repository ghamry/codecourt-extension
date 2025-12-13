/**
 * SnippetsProvider - Tree view data provider for snippets sidebar
 * Follows Single Responsibility Principle
 * Phase 4 Implementation
 */

import * as vscode from 'vscode';
import { CodeCourtClient } from '../api/CodeCourtClient';
import { Snippet } from '../types';
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

    this.tooltip = snippet.description || snippet.title;
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
export class SnippetsProvider implements vscode.TreeDataProvider<SnippetTreeItem> {
  private _onDidChangeTreeData = new vscode.EventEmitter<SnippetTreeItem | undefined | void>();
  readonly onDidChangeTreeData = this._onDidChangeTreeData.event;

  private snippets: Snippet[] = [];

  constructor(private readonly apiClient: CodeCourtClient) {}

  /**
   * Refresh tree view
   */
  public async refresh(): Promise<void> {
    try {
      Logger.info('Refreshing snippets tree view...');
      this.snippets = await this.apiClient.getMySnippets();
      this._onDidChangeTreeData.fire();
    } catch (error) {
      Logger.error('Failed to refresh snippets', error);
      vscode.window.showErrorMessage('Failed to load snippets. Please check your connection.');
    }
  }

  /**
   * Get tree item for display
   */
  public getTreeItem(element: SnippetTreeItem): vscode.TreeItem {
    return element;
  }

  /**
   * Get children (snippets) for tree view
   */
  public async getChildren(element?: SnippetTreeItem): Promise<SnippetTreeItem[]> {
    if (element) {
      // No nested items for now
      return [];
    }

    if (this.snippets.length === 0) {
      return [];
    }

    // Group snippets by language for better organization
    return this.snippets.map(
      (snippet) => new SnippetTreeItem(snippet, vscode.TreeItemCollapsibleState.None)
    );
  }
}
