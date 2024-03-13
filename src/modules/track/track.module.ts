import { Module } from '@nestjs/common';
import { TrackService } from './services/track.service';
import { TrackController } from './controllers/track.controller';
import { TrackRepository } from './repositories/track.repository';

@Module({
  providers: [TrackService, TrackRepository],
  controllers: [TrackController],
})
export class TrackModule {}
