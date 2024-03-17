import { Album } from 'src/modules/album/types/album';
import { Artist } from 'src/modules/artist/types/artist';
import { Track } from 'src/modules/track/types/track';

export interface Favorites {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
