import { Injectable } from '@nestjs/common';
import { Store } from '../types/store';

@Injectable()
export class StoreService {
  private store: Store = null;

  constructor() {
    this.store = {
      artists: [],
      users: [],
      tracks: [],
    };
  }

  getArtists() {
    return this.store.artists;
  }

  getUsers() {
    return this.store.users;
  }

  getTracks() {
    return this.store.tracks;
  }

  deleteArtist(id: string) {
    const tracks = this.store.tracks.filter((track) => track.artistId === id);

    tracks.forEach((track) => {
      track.artistId = null;
    });

    const index = this.store.artists.findIndex((artist) => artist.id === id);

    if (index !== -1) {
      this.store.artists.splice(index, 1);

      return true;
    }

    return false;
  }

  deleteUser(id: string) {
    const index = this.store.users.findIndex((user) => user.id === id);

    if (index !== -1) {
      this.store.users.splice(index, 1);

      return true;
    }

    return false;
  }

  deleteTrack(id: string) {
    const index = this.store.tracks.findIndex((track) => track.id === id);

    if (index !== -1) {
      this.store.tracks.splice(index, 1);

      return true;
    }

    return false;
  }
}
