import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { StoreService } from 'src/modules/store/services/store.service';
import { Artist } from '../types/artist';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';

@Injectable()
export class ArtistRepository {
  private readonly artists: Artist[] = null;

  constructor(private readonly storeService: StoreService) {
    this.artists = this.storeService.getArtists();
  }

  getAllArtists(): Artist[] {
    return this.artists;
  }

  getArtistById(id: string): Artist {
    return this.artists.find((artist) => artist.id === id);
  }

  createArtist(artistData: CreateArtistDto): Artist {
    const newArtist: Artist = {
      id: uuidv4(),
      name: artistData.name,
      grammy: artistData.grammy,
    };

    this.artists.push(newArtist);

    return newArtist;
  }

  updateArtist(id: string, artistData: UpdateArtistDto): Artist {
    const artist = this.getArtistById(id);

    if (artist) {
      Object.entries(artistData).forEach(([key, value]) => {
        artist[key] = value;
      });
    }

    return artist;
  }

  deleteArtist(id: string): boolean {
    return this.storeService.deleteArtist(id);
  }
}
