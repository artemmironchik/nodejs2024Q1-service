import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavoritesRepository } from '../repositories/favorites.repository';
import { isUUID } from 'class-validator';

@Injectable()
export class FavoritesService {
  constructor(private favoritesRepository: FavoritesRepository) {}

  getFavorites() {
    const favorites = this.favoritesRepository.getFavorites();

    return favorites;
  }

  addAlbum(id: string) {
    this.isIdValid(id);

    const album = this.favoritesRepository
      .getAlbums()
      .find((album) => album.id === id);

    if (!album) {
      throw new UnprocessableEntityException('Album not found');
    }

    return this.favoritesRepository.addAlbum(album);
  }

  addArtist(id: string) {
    this.isIdValid(id);

    const artist = this.favoritesRepository
      .getArtists()
      .find((artist) => artist.id === id);

    if (!artist) {
      throw new UnprocessableEntityException('Artist not found');
    }

    return this.favoritesRepository.addArtist(artist);
  }

  addTrack(id: string) {
    this.isIdValid(id);

    const track = this.favoritesRepository
      .getTracks()
      .find((track) => track.id === id);

    if (!track) {
      throw new UnprocessableEntityException('Track not found');
    }

    return this.favoritesRepository.addTrack(track);
  }

  removeAlbum(id: string) {
    this.isIdValid(id);

    this.isAlbumInFavorites(id);

    return this.favoritesRepository.removeAlbum(id);
  }

  removeArtist(id: string) {
    this.isIdValid(id);

    this.isArtistInFavorites(id);

    return this.favoritesRepository.removeArtist(id);
  }

  removeTrack(id: string) {
    this.isIdValid(id);

    this.isTrackInFavorites(id);

    return this.favoritesRepository.removeTrack(id);
  }

  private isIdValid(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException(`Invalid album id ${id}`);
    }
  }

  private isAlbumInFavorites(id: string) {
    const album = this.favoritesRepository
      .getFavorites()
      .albums.find((album) => album.id === id);

    if (!album) {
      throw new NotFoundException('Album is not in favorites');
    }

    return album;
  }

  private isArtistInFavorites(id: string) {
    const artist = this.favoritesRepository
      .getFavorites()
      .artists.find((artist) => artist.id === id);

    if (!artist) {
      throw new NotFoundException('Artist is not in favorites');
    }

    return artist;
  }

  private isTrackInFavorites(id: string) {
    const track = this.favoritesRepository
      .getFavorites()
      .tracks.find((track) => track.id === id);

    if (!track) {
      throw new NotFoundException('Track is not in favorites');
    }

    return track;
  }
}
