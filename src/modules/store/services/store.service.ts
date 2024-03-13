import { Injectable } from '@nestjs/common';
import { Store } from '../types/store';

@Injectable()
export class StoreService {
  private store: Store = null;

  constructor() {
    this.store = {
      albums: [],
      artists: [],
      users: [],
      tracks: [],
    };
  }

  getAlbums() {
    return this.store.albums;
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

  deleteAlbum(id: string) {
    const tracks = this.store.tracks.filter((track) => track.albumId === id);

    tracks.forEach((track) => {
      track.albumId = null;
    });

    const index = this.store.albums.findIndex((artist) => artist.id === id);

    if (index !== -1) {
      this.store.albums.splice(index, 1);

      return true;
    }

    return false;
  }

  deleteArtist(id: string) {
    const tracks = this.store.tracks.filter((track) => track.artistId === id);

    tracks.forEach((track) => {
      track.artistId = null;
    });

    const albums = this.store.albums.filter((album) => album.artistId === id);

    albums.forEach((album) => {
      album.artistId = null;
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
