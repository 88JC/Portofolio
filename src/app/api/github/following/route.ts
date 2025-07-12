import { NextResponse } from 'next/server';
import { GitHubUser } from '@/types/github';
import { config } from '@/lib/data/config';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username') || config.github.username;

    const githubToken = process.env.GITHUB_TOKEN;
    const headers: Record<string, string> = githubToken ? { Authorization: `token ${githubToken}` } : {};

    let allFollowing: GitHubUser[] = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const response = await fetch(`https://api.github.com/users/${username}/following?per_page=100&page=${page}`, { headers });
      if (response.ok) {
        const data = await response.json();
        allFollowing = allFollowing.concat(data);
        if (data.length < 100) {
          hasMore = false;
        } else {
          page++;
        }
      } else {
        hasMore = false;
      }
    }

    return NextResponse.json({ following: allFollowing });

  } catch (error) {
    console.error('Error fetching following:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 