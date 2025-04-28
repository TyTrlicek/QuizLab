import { BaseMedia } from ".";

export type Music = {
    music_id: number;
    artist?: string;
    song?: string;
    images: {
      jpg: {
        picture_medium: string;
      };
    };
  };
  
  