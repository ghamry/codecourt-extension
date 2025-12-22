/**
 * Logger utility for consistent logging across the extension
 * Follows single responsibility principle
 */

import * as vscode from 'vscode';

class LoggerService {
  private outputChannel: vscode.OutputChannel;
  private isDevelopment: boolean = false; // Default to prediction (safe)

  constructor() {
    this.outputChannel = vscode.window.createOutputChannel('Code Court');
    // Default to false, will be updated in initialize()
    this.isDevelopment = false;
    // Show output channel immediately so it appears in dropdown
    this.outputChannel.show(true); // true = preserveFocus (don't steal focus)
  }

  /**
   * Initialize logger with extension context
   * Determines environment from ExtensionMode
   */
  public initialize(context: vscode.ExtensionContext): void {
    // Development = 2, Test = 3 (Production = 1)
    // We consider Development mode if it's explicitly Development
    this.isDevelopment = context.extensionMode === vscode.ExtensionMode.Development;

    if (this.isDevelopment) {
      this.info('Logger initialized in DEVELOPMENT mode');
    }
  }

  /**
   * Log info message
   * Only shown in Development mode (same as debug) to keep production clean
   */
  public info(message: string): void {
    // Suppress info logs in production, same as debug
    if (!this.isDevelopment) {
      return;
    }

    const timestamp = new Date().toISOString();
    this.outputChannel.appendLine(`[INFO ${timestamp}] ${message}`);
  }

  /**
   * Log debug message (only in development mode)
   */
  public debug(message: string, data?: unknown): void {
    if (!this.isDevelopment) {
      return;
    }

    const timestamp = new Date().toISOString();
    this.outputChannel.appendLine(`[DEBUG ${timestamp}] ${message}`);

    if (data) {
      this.outputChannel.appendLine(`  Data: ${JSON.stringify(data, null, 2)}`);
    }
  }

  /**
   * Log warning message
   */
  public warn(message: string): void {
    const timestamp = new Date().toISOString();
    this.outputChannel.appendLine(`[WARN ${timestamp}] ${message}`);
  }

  /**
   * Log error message with optional error object
   */
  public error(message: string, error?: unknown): void {
    const timestamp = new Date().toISOString();
    this.outputChannel.appendLine(`[ERROR ${timestamp}] ${message}`);

    if (error instanceof Error) {
      this.outputChannel.appendLine(`  Stack: ${error.stack}`);
    } else if (error) {
      this.outputChannel.appendLine(`  Details: ${JSON.stringify(error)}`);
    }
  }

  /**
   * Show output channel to user
   */
  public show(): void {
    this.outputChannel.show();
  }

  /**
   * Clear output channel
   */
  public clear(): void {
    this.outputChannel.clear();
  }
}

// Export singleton instance
export const Logger = new LoggerService();
