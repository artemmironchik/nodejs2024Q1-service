import { Module } from '@nestjs/common';
import { TrackService } from './services/track.service';
import { TrackController } from './controllers/track.controller';
import { TrackRepository } from './repositories/track.repository';
import { StoreModule } from '../store/store.module';

@Module({
  providers: [TrackService, TrackRepository],
  controllers: [TrackController],
  imports: [StoreModule],
})
export class TrackModule {}
