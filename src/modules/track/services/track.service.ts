import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TrackRepository } from '../repositories/track.repository';
import { isUUID } from 'class-validator';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';

@Injectable()
export class TrackService {
  constructor(private trackRepository: TrackRepository) {}

  getAllTracks() {
    const tracks = this.trackRepository.getAllTracks();

    return tracks;
  }

  getTrackById(id: string) {
    this.isIdValid(id);

    const track = this.isTrackExists(id);

    return track;
  }

  createTrack(track: CreateTrackDto) {
    const newTrack = this.trackRepository.createTrack(track);

    return newTrack;
  }

  updateTrack(id: string, trackData: UpdateTrackDto) {
    this.isIdValid(id);

    this.isTrackExists(id);

    return this.trackRepository.updateTrack(id, trackData);
  }

  deleteTrack(id: string) {
    this.isIdValid(id);

    this.isTrackExists(id);

    return this.trackRepository.deleteTrack(id);
  }

  private isIdValid(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException(`Invalid track id ${id}`);
    }
  }

  private isTrackExists(id: string) {
    const track = this.trackRepository.getTrackById(id);

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    return track;
  }
}
