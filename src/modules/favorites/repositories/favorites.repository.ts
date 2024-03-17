import { Injectable } from '@nestjs/common';

import { StoreService } from 'src/modules/store/services/store.service';
import { Favorites, FavoritesResponse } from '../types/favorites';
import { Track } from 'src/modules/track/types/track';
import { Album } from 'src/modules/album/types/album';
import { Artist } from 'src/modules/artist/types/artist';

@Injectable()
export class FavoritesRepository {
  private readonly favorites: Favorites = null;

  constructor(private readonly storeService: StoreService) {
    this.favorites = this.storeService.getFavorites();
  }

  getFavorites(): FavoritesResponse {
    return this.favorites;
  }

  getAlbums(): Album[] {
    return this.storeService.getAlbums();
  }

  getArtists(): Artist[] {
    return this.storeService.getArtists();
  }

  getTracks(): Track[] {
    return this.storeService.getTracks();
  }

  addAlbum(album: Album) {
    this.favorites.albums.push(album);
  }

  addArtist(artist: Artist) {
    this.favorites.artists.push(artist);
  }

  addTrack(track: Track) {
    this.favorites.tracks.push(track);
  }

  removeAlbum(id: string): void {
    const index = this.favorites.albums.findIndex((album) => album.id === id);

    if (index !== -1) {
      this.favorites.albums.splice(index, 1);
    }
  }

  removeArtist(id: string): void {
    const index = this.favorites.artists.findIndex(
      (artist) => artist.id === id,
    );

    if (index !== -1) {
      this.favorites.artists.splice(index, 1);
    }
  }

  removeTrack(id: string): void {
    const index = this.favorites.tracks.findIndex((track) => track.id === id);

    if (index !== -1) {
      this.favorites.tracks.splice(index, 1);
    }
  }
}
