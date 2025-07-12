import { NextResponse } from 'next/server';
import { LanyardData, DiscordStatusData } from '@/types/discord';
import { config } from '@/lib/data/config';

export async function GET() {
  try {
    const DiscordIds = config.discord.userId;
    const response = await fetch(`https://api.lanyard.rest/v1/users/${DiscordIds}`);
    
    if (!response.ok) {
      console.error('Lanyard API error:', response.status, response.statusText);
      return NextResponse.json({ 
        error: 'Failed to fetch Discord status',
        status: response.status 
      }, { status: 500 });
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Lanyard API returned non-JSON response:', contentType);
      return NextResponse.json({ 
        error: 'Invalid response from Discord API',
        status: 'non-json-response'
      }, { status: 500 });
    }

    const data = await response.json() as LanyardData;
    
    if (data.success === false) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const getDiscordStatus = (status: string): string => {
      switch (status) {
        case 'dnd':
          return 'Do Not Disturb';
        case 'idle':
          return 'Idle';
        case 'online':
          return 'Online';
        case 'offline':
          return 'Offline';
        default:
          return status;
      }
    };

    const getStatusColor = (status: string): string => {
      switch (status) {
        case 'online':
          return 'bg-[#3ba55c]';
        case 'idle':
          return 'bg-[#faa61a]';
        case 'dnd':
          return 'bg-[#ed4245]';
        case 'streaming':
          return 'bg-[#5865f2]';
        default:
          return 'bg-[#747f8d]';
      }
    };

    const getStatusText = (status: string): string => {
      return status;
    };

    const isStreaming = data.data.activities?.some(
      (activity) => activity.type === 1
    );

    let statusForIcon = data.data.discord_status;
    if (isStreaming) {
      statusForIcon = 'streaming';
    }

    const status: DiscordStatusData = {
      discord_status: getDiscordStatus(data.data.discord_status),
      status_color: getStatusColor(statusForIcon),
      status_text: getStatusText(statusForIcon),
      discord_avatar: `https://cdn.discordapp.com/avatars/${DiscordIds}/${data.data.discord_user.avatar}.png?size=512`,
      avatar_decoration: data.data.discord_user.avatar_decoration_data ? 
        `https://cdn.discordapp.com/avatar-decoration-presets/${data.data.discord_user.avatar_decoration_data.asset}.png` : null,
      discord_username: data.data.discord_user.global_name || data.data.discord_user.username,
      custom_status: data.data.activities?.find((activity) => activity.type === 4)?.state || null,
      current_application: data.data.activities?.find((activity) => activity.type === 0)?.name || null,
    };

    return NextResponse.json(status);
  } catch (error) {
    console.error('Error fetching Discord status:', error);
    
    const fallbackStatus: DiscordStatusData = {
      discord_status: 'Offline',
      status_color: 'bg-[#747f8d]',
      status_text: 'offline',
      discord_avatar: `https://cdn.discordapp.com/embed/avatars/0.png`,
      avatar_decoration: null,
      discord_username: 'jexq',
      custom_status: null,
      current_application: null,
    };

    return NextResponse.json(fallbackStatus);
  }
} 