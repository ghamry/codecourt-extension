/**
 * Type definitions for Code Court VS Code Extension
 * Following clean code principles with clear, self-documenting types
 */

/**
 * User authentication data stored in VS Code SecretStorage
 */
export interface AuthData {
  accessToken: string;
  userId: string;
  email: string;
  name: string;
  expiresAt: number; // Unix timestamp
}

/**
 * Code snippet from Code Court API
 */
export interface Snippet {
  id: string;
  title: string;
  description: string;
  code: string;
  language: string;
  tags: string[];
  visibility: 'PUBLIC' | 'PROTECTED' | 'PRIVATE';
  authorId: string;
  createdAt: string;
  updatedAt: string;
  author?: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };
  _count?: {
    ratings: number;
    comments: number;
  };
}

/**
 * Request payload for creating a new snippet
 */
export interface CreateSnippetRequest {
  title: string;
  description: string;
  code: string;
  language: string;
  tags: string[];
  visibility: 'PUBLIC' | 'PROTECTED' | 'PRIVATE';
}

/**
 * API response wrapper for snippets list
 */
export interface SnippetsResponse {
  snippets: Snippet[];
  totalCount?: number;
}

/**
 * Search/filter parameters for snippets
 */
export interface SnippetSearchParams {
  query?: string;
  language?: string;
  tags?: string[];
  authorId?: string;
  limit?: number;
  offset?: number;
}

/**
 * Configuration settings for the extension
 */
export interface ExtensionConfig {
  apiUrl: string;
  autoRefresh: boolean;
  insertMode: 'cursor' | 'replace';
}

/**
 * OAuth2 token response from Code Court
 */
export interface TokenResponse {
  accessToken: string;
  userId: string;
  email: string;
  name: string;
  expiresIn: number; // seconds
}

/**
 * Error response from API
 */
export interface ApiError {
  error: string;
  details?: string;
  statusCode?: number;
}
