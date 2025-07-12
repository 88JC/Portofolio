import { NextResponse } from 'next/server';
import { PinnedRepo } from '@/types/project';
import { config } from '@/lib/data/config';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username') || config.github.username;

    const githubToken = process.env.GITHUB_TOKEN;

    const headers: Record<string, string> = githubToken
      ? { Authorization: `token ${githubToken}` }
      : {};

    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, {
      headers,
    });
    if (!reposResponse.ok) {
      return NextResponse.json({ error: 'Failed to fetch repositories' }, { status: 500 });
    }
    const reposData: PinnedRepo[] = await reposResponse.json();

    const pinnedRepos = reposData
      .filter(repo => !repo.fork)
      .sort((a, b) => {
        if (a.stargazers_count !== b.stargazers_count) {
          return b.stargazers_count - a.stargazers_count;
        }
        if (a.forks_count !== b.forks_count) {
          return b.forks_count - a.forks_count;
        }
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      })
      .slice(0, 6);

    return NextResponse.json({
      pinnedRepos: pinnedRepos
    });

  } catch (error) {
    console.error('Error fetching pinned repositories:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 