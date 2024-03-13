import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ArtistRepository } from '../repositories/artist.repository';
import { isUUID } from 'class-validator';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';

@Injectable()
export class ArtistService {
  constructor(private artistRepository: ArtistRepository) {}

  getAllArtists() {
    const tracks = this.artistRepository.getAllArtists();

    return tracks;
  }

  getArtistById(id: string) {
    this.isIdValid(id);

    const track = this.isArtistExists(id);

    return track;
  }

  createArtist(track: CreateArtistDto) {
    const newTrack = this.artistRepository.createArtist(track);

    return newTrack;
  }

  updateArtist(id: string, trackData: UpdateArtistDto) {
    this.isIdValid(id);

    this.isArtistExists(id);

    return this.artistRepository.updateArtist(id, trackData);
  }

  deleteArtist(id: string) {
    this.isIdValid(id);

    this.isArtistExists(id);

    return this.artistRepository.deleteArtist(id);
  }

  private isIdValid(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException(`Invalid artist id ${id}`);
    }
  }

  private isArtistExists(id: string) {
    const artist = this.artistRepository.getArtistById(id);

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    return artist;
  }
}
