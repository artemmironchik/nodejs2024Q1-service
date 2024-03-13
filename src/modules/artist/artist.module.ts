import { Module } from '@nestjs/common';
import { ArtistService } from './services/artist.service';
import { ArtistController } from './controllers/artist.controller';
import { ArtistRepository } from './repositories/artist.repository';
import { StoreModule } from '../store/store.module';

@Module({
  providers: [ArtistService, ArtistRepository],
  controllers: [ArtistController],
  imports: [StoreModule],
})
export class ArtistModule {}
