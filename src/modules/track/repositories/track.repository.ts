import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { StoreService } from 'src/modules/store/services/store.service';
import { Track } from '../types/track';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';

@Injectable()
export class TrackRepository {
  private readonly tracks: Track[] = null;

  constructor(private readonly storeService: StoreService) {
    this.tracks = this.storeService.getTracks();
  }

  getAllTracks(): Track[] {
    return this.tracks;
  }

  getTrackById(id: string): Track {
    return this.tracks.find((track) => track.id === id);
  }

  createTrack(trackData: CreateTrackDto): Track {
    const newTrack: Track = {
      id: uuidv4(),
      name: trackData.name,
      artistId: trackData.artistId,
      albumId: trackData.albumId,
      duration: trackData.duration,
    };

    this.tracks.push(newTrack);

    return newTrack;
  }

  updateTrack(id: string, trackData: UpdateTrackDto): Track {
    const track = this.getTrackById(id);

    if (track) {
      Object.entries(trackData).forEach(([key, value]) => {
        track[key] = value;
      });
    }

    return track;
  }

  deleteTrack(id: string): boolean {
    return this.storeService.deleteTrack(id);
  }
}
