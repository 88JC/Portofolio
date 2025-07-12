export interface PinnedRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
  fork: boolean;
  topics: string[];
} 