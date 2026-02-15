// Shared TypeScript interfaces for the application

export interface UserData {
  avatar_url?: string;
  name?: string;
  login?: string;
  html_url?: string;
  company?: string;
  location?: string;
  created_at?: string;
  public_repos?: number;
  followers?: number;
  following?: number;
}

export interface LangDataItem {
  label: string;
  value: number;
  color: string;
}

export interface RepoDataItem {
  id: number;
  name: string;
  html_url: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks: number;
  size: number;
  fork: boolean;
}

export interface RepoData {
  [key: string]: any;
}

export interface ErrorState {
  active: boolean;
  type: number;
}

export interface RateLimit {
  remaining: number;
  limit: number;
}