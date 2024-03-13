import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AlbumRepository } from '../repositories/album.repository';
import { isUUID } from 'class-validator';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';

@Injectable()
export class AlbumService {
  constructor(private albumRepository: AlbumRepository) {}

  getAllAlbums() {
    const albums = this.albumRepository.getAllAlbums();

    return albums;
  }

  getAlbumById(id: string) {
    this.isIdValid(id);

    const album = this.isAlbumExists(id);

    return album;
  }

  createAlbum(album: CreateAlbumDto) {
    const newAlbum = this.albumRepository.createAlbum(album);

    return newAlbum;
  }

  updateAlbum(id: string, albumData: UpdateAlbumDto) {
    this.isIdValid(id);

    this.isAlbumExists(id);

    return this.albumRepository.updateAlbum(id, albumData);
  }

  deleteAlbum(id: string) {
    this.isIdValid(id);

    this.isAlbumExists(id);

    return this.albumRepository.deleteAlbum(id);
  }

  private isIdValid(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException(`Invalid album id ${id}`);
    }
  }

  private isAlbumExists(id: string) {
    const album = this.albumRepository.getAlbumById(id);

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return album;
  }
}
