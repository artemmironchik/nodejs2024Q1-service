import { Artist } from 'src/modules/artist/types/artist';
import { Track } from 'src/modules/track/types/track';
import { User } from 'src/modules/user/types/user';

export interface Store {
  artists: Artist[];
  users: User[];
  tracks: Track[];
}
