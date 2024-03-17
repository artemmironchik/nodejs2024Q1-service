import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { StoreService } from 'src/modules/store/services/store.service';
import { Album } from '../types/album';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';

@Injectable()
export class AlbumRepository {
  private readonly albums: Album[] = null;

  constructor(private readonly storeService: StoreService) {
    this.albums = this.storeService.getAlbums();
  }

  getAllAlbums(): Album[] {
    return this.albums;
  }

  getAlbumById(id: string): Album {
    return this.albums.find((album) => album.id === id);
  }

  createAlbum(albumData: CreateAlbumDto): Album {
    const newAlbum: Album = {
      id: uuidv4(),
      name: albumData.name,
      year: albumData.year,
      artistId: albumData.artistId,
    };

    this.albums.push(newAlbum);

    return newAlbum;
  }

  updateAlbum(id: string, artistData: UpdateAlbumDto): Album {
    const album = this.getAlbumById(id);

    if (album) {
      Object.entries(artistData).forEach(([key, value]) => {
        album[key] = value;
      });
    }

    return album;
  }

  deleteAlbum(id: string): boolean {
    return this.storeService.deleteAlbum(id);
  }
}
