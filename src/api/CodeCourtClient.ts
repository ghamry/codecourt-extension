/**
 * CodeCourtClient - API client for Code Court backend
 * Follows Single Responsibility and Open/Closed Principles
 * Phase 3 Implementation
 */

import axios, { AxiosInstance } from 'axios';
import { AuthManager } from '../auth/AuthManager';
import { Snippet, SnippetsResponse, CreateSnippetRequest, SnippetSearchParams } from '../types';
import { getApiBaseUrl } from '../utils/config';
import { Logger } from '../utils/Logger';

export class CodeCourtClient {
  private axiosInstance: AxiosInstance;

  constructor(private readonly authManager: AuthManager) {
    this.axiosInstance = axios.create({
      baseURL: getApiBaseUrl(),
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add auth token interceptor
    this.axiosInstance.interceptors.request.use(async (config) => {
      const token = await this.authManager.getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  /**
   * Fetch all snippets for authenticated user
   */
  public async getMySnippets(): Promise<Snippet[]> {
    try {
      Logger.info('Fetching user snippets...');
      const response = await this.axiosInstance.get<SnippetsResponse>('/api/vscode/snippets');
      Logger.info(`Fetched ${response.data.snippets.length} snippets`);
      return response.data.snippets;
    } catch (error) {
      Logger.error('Failed to fetch snippets', error);
      throw this.handleError(error);
    }
  }

  /**
   * Search snippets with filters
   */
  public async searchSnippets(params: SnippetSearchParams): Promise<Snippet[]> {
    try {
      Logger.info(`Searching snippets with params: ${JSON.stringify(params)}`);
      const response = await this.axiosInstance.get<SnippetsResponse>('/api/vscode/snippets', {
        params,
      });
      return response.data.snippets;
    } catch (error) {
      Logger.error('Failed to search snippets', error);
      throw this.handleError(error);
    }
  }

  /**
   * Get single snippet by ID
   */
  public async getSnippet(id: string): Promise<Snippet> {
    try {
      Logger.info(`Fetching snippet: ${id}`);
      const response = await this.axiosInstance.get<{ snippet: Snippet }>(`/api/vscode/snippets/${id}`);
      return response.data.snippet;
    } catch (error) {
      Logger.error(`Failed to fetch snippet ${id}`, error);
      throw this.handleError(error);
    }
  }

  /**
   * Create new snippet
   */
  public async createSnippet(data: CreateSnippetRequest): Promise<Snippet> {
    try {
      Logger.info(`Creating snippet: ${data.title}`);
      const response = await this.axiosInstance.post<Snippet>('/api/vscode/snippets', data);
      Logger.info(`Snippet created: ${response.data.id}`);
      return response.data;
    } catch (error) {
      Logger.error('Failed to create snippet', error);
      throw this.handleError(error);
    }
  }

  /**
   * Delete snippet by ID
   */
  public async deleteSnippet(id: string): Promise<void> {
    try {
      Logger.info(`Deleting snippet: ${id}`);
      await this.axiosInstance.delete(`/api/vscode/snippets/${id}`);
      Logger.info(`Snippet deleted: ${id}`);
    } catch (error) {
      Logger.error(`Failed to delete snippet ${id}`, error);
      throw this.handleError(error);
    }
  }

  /**
   * Handle API errors consistently
   */
  private handleError(error: unknown): Error {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const message = error.response?.data?.error || error.message;

      // Special handling for 405 Method Not Allowed - indicates backend mismatch
      if (status === 405) {
        return new Error(`Server returned 405 Method Not Allowed. The backend might not support deleting snippets yet. Error: ${message}`);
      }

      return new Error(`API Error (${status}): ${message}`);
    }
    return error instanceof Error ? error : new Error('Unknown error occurred');
  }
}
