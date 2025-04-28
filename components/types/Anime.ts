import { BaseMedia } from ".";

// Raw API shape
export type Anime = {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
};

