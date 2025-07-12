import { NextResponse } from 'next/server';
import { GitHubStats, GitHubRepo } from '@/types/github';
import { config } from '@/lib/data/config';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username') || config.github.username;

    const githubToken = process.env.GITHUB_TOKEN;
    const headers: Record<string, string> = githubToken ? { Authorization: `token ${githubToken}` } : {};

    const userResponse = await fetch(`https://api.github.com/users/${username}`, { headers });
    if (!userResponse.ok) {
      return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 404 });
    }
    const userData: GitHubStats = await userResponse.json();

    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`, { headers });
    if (!reposResponse.ok) {
      const errorText = await reposResponse.text();
      console.error('GitHub API error:', reposResponse.status, errorText);
      return NextResponse.json({ error: 'Failed to fetch repositories', details: errorText }, { status: 500 });
    }
    const reposData: GitHubRepo[] = await reposResponse.json();

    let starredCount = 0;
    const starredResponse = await fetch(`https://api.github.com/users/${username}/starred?per_page=1`, { headers });
    if (starredResponse.ok) {
      const linkHeader = starredResponse.headers.get('link');
      if (linkHeader) {
        const lastPageMatch = linkHeader.match(/page=(\d+)>; rel="last"/);
        if (lastPageMatch) {
          starredCount = parseInt(lastPageMatch[1]);
        }
      } else {
        const starredData = await fetch(`https://api.github.com/users/${username}/starred`, { headers }).then(res => res.json());
        starredCount = starredData.length;
      }
    }

    return NextResponse.json({
      user: userData,
      repos: reposData,
      starredCount: starredCount
    });

  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 