import fs from 'fs';

const file = 'src/commands/index.ts';
let c = fs.readFileSync(file, 'utf8');

// The complete implementations
const implementations = {
  create: `async function createSnippetCommand(
  authManager: AuthManager,
  apiClient: CodeCourtClient,
  snippetsProvider: SnippetsProvider
): Promise<void> {
  try {
    if (!(await authManager.isAuthenticated())) {
      vscode.window.showWarningMessage('Please sign in to create snippets');
      return;
    }
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showWarningMessage('No active editor found. Please open a file with code to share.');
      return;
    }
    const code = editor.selection.isEmpty ? editor.document.getText() : editor.document.getText(editor.selection);
    if (!code.trim()) {
      vscode.window.showWarningMessage('No code to create snippet from. Please select code or open a file.');
      return;
    }
    const title = await vscode.window.showInputBox({
      prompt: 'Enter snippet title',
      placeHolder: 'My awesome code snippet',
      validateInput: (value) => {
        if (!value || value.trim().length < 3) {
          return 'Title must be at least 3 characters';
        }
        return null;
      },
    });
    if (!title) return;
    const description = await vscode.window.showInputBox({
      prompt: 'Enter snippet description (optional)',
      placeHolder: 'Describe what this code does...',
    });
    const tagsInput = await vscode.window.showInputBox({
      prompt: 'Enter tags (comma-separated, optional)',
      placeHolder: 'react, hooks, typescript',
    });
    const tags = tagsInput ? tagsInput.split(',').map((tag) => tag.trim()).filter((tag) => tag.length > 0) : [];
    const visibilityOption = await vscode.window.showQuickPick(
      [
        { label: '\$(globe) Public', description: 'Anyone can see this snippet', value: 'PUBLIC' as const },
        { label: '\$(lock) Protected', description: 'Only Code Court users can see this', value: 'PROTECTED' as const },
        { label: '\$(eye-closed) Private', description: 'Only you can see this snippet', value: 'PRIVATE' as const },
      ],
      { placeHolder: 'Select snippet visibility' }
    );
    if (!visibilityOption) return;
    const language = editor.document.languageId;
    const snippet = await vscode.window.withProgress(
      { location: vscode.ProgressLocation.Notification, title: 'Creating snippet...', cancellable: false },
      async () => {
        return await apiClient.createSnippet({
          title, description: description || '', code, language, tags, visibility: visibilityOption.value,
        });
      }
    );
    Logger.info(\`Snippet created successfully: \${snippet.id}\`);
    const action = await vscode.window.showInformationMessage(
      \`Snippet "\${title}" created successfully!\`, 'View in Browser', 'Create Another'
    );
    if (action === 'View in Browser') {
      const url = \`\${getApiBaseUrl()}/snippets/\${snippet.id}\`;
      vscode.env.openExternal(vscode.Uri.parse(url));
    } else if (action === 'Create Another') {
      await createSnippetCommand(authManager, apiClient, snippetsProvider);
      return;
    }
    await snippetsProvider.refresh();
  } catch (error) {
    Logger.error('Failed to create snippet', error);
    vscode.window.showErrorMessage('Failed to create snippet. Please try again.');
  }
}`,

  search: `async function searchSnippetsCommand(apiClient: CodeCourtClient): Promise<void> {
  try {
    const query = await vscode.window.showInputBox({
      prompt: 'Search Code Court snippets',
      placeHolder: 'Enter keywords, tags, or language...',
    });
    if (!query) return;
    const results = await vscode.window.withProgress(
      { location: vscode.ProgressLocation.Notification, title: 'Searching snippets...', cancellable: false },
      async () => await apiClient.searchSnippets({ query })
    );
    if (results.length === 0) {
      vscode.window.showInformationMessage(\`No snippets found for "\${query}"\`);
      return;
    }
    const selectedSnippet = await vscode.window.showQuickPick(
      results.map((snippet) => ({
        label: snippet.title,
        description: snippet.language,
        detail: snippet.description || 'No description',
        snippet: snippet,
      })),
      { placeHolder: \`Found \${results.length} snippet(s) - Select one to insert\` }
    );
    if (!selectedSnippet) return;
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showWarningMessage('No active editor found');
      return;
    }
    const config = vscode.workspace.getConfiguration('codecourt');
    const insertMode = config.get<string>('insertMode', 'cursor');
    await editor.edit((editBuilder) => {
      if (insertMode === 'replace' && !editor.selection.isEmpty) {
        editBuilder.replace(editor.selection, selectedSnippet.snippet.code);
      } else {
        editBuilder.insert(editor.selection.active, selectedSnippet.snippet.code);
      }
    });
    vscode.window.showInformationMessage(\`Inserted: \${selectedSnippet.label}\`);
    Logger.info(\`Inserted snippet from search: \${selectedSnippet.label} (\${selectedSnippet.snippet.id})\`);
  } catch (error) {
    Logger.error('Failed to search snippets', error);
    vscode.window.showErrorMessage('Failed to search snippets. Please try again.');
  }
}`,

  delete: `
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
      \`Are you sure you want to delete "\${item.snippet.title}"?\`,
      { modal: true },
      'Delete',
      'Cancel'
    );
    if (confirm !== 'Delete') return;
    await vscode.window.withProgress(
      { location: vscode.ProgressLocation.Notification, title: 'Deleting snippet...', cancellable: false },
      async () => {
        const authManager = (apiClient as any).authManager;
        const token = await authManager.getAccessToken();
        const axiosInstance = axios.create({
          baseURL: getApiBaseUrl(),
          timeout: 10000,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': \`Bearer \${token}\`,
          },
        });
        await axiosInstance.delete(\`/api/vscode/snippets/\${item.snippet.id}\`);
      }
    );
    Logger.info(\`Snippet deleted successfully: \${item.snippet.id}\`);
    vscode.window.showInformationMessage(\`Deleted: \${item.snippet.title}\`);
    await snippetsProvider.refresh();
  } catch (error) {
    Logger.error('Failed to delete snippet', error);
    vscode.window.showErrorMessage('Failed to delete snippet. Please try again.');
  }
}
`
};

// Replace create
c = c.replace(/async function createSnippetCommand\([^)]+\)[^{]+{[^}]+\/\/ TODO[^}]+}/s, implementations.create);
// Replace search
c = c.replace(/async function searchSnippetsCommand\([^)]+\)[^{]+{[^}]+\/\/ TODO[^}]+}/s, implementations.search);
// Add delete before openInBrowserCommand
c = c.replace('/**\n * Open in browser command handler\n */', implementations.delete + '/**\n * Open in browser command handler\n */');

fs.writeFileSync(file, c, 'utf8');
console.log('✓ File updated successfully!');
console.log('Lines:', c.split('\n').length);
