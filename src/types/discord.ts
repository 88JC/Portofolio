export interface DiscordStatusData {
  discord_status: string;
  status_color: string;
  status_text: string;
  discord_avatar: string;
  avatar_decoration: string | null;
  discord_username: string;
  custom_status: string | null;
  current_application: string | null;
}

export interface DiscordAvatarProps {
  size?: number;
  className?: string;
  showStatus?: boolean;
  decorationInFront?: boolean;
}

export interface LanyardData {
  success: boolean;
  data: {
    discord_status: string;
    active_on_discord_web: boolean;
    active_on_discord_desktop: boolean;
    active_on_discord_mobile: boolean;
    discord_user: {
      avatar: string;
      avatar_decoration_data?: {
        asset: string;
      };
      global_name?: string;
      username: string;
      clan?: {
        identity_guild_id: string;
        badge: string;
        tag: string;
      };
    };
    activities?: Array<{
      type: number;
      name?: string;
      state?: string;
    }>;
    spotify?: any;
    listening_to_spotify?: boolean;
  };
} 