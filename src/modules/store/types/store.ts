import { Album } from 'src/modules/album/types/album';
import { Artist } from 'src/modules/artist/types/artist';
import { Track } from 'src/modules/track/types/track';
import { User } from 'src/modules/user/types/user';

export interface Store {
  albums: Album[];
  artists: Artist[];
  users: User[];
  tracks: Track[];
}
