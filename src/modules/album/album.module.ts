import { Module } from '@nestjs/common';
import { AlbumService } from './services/album.service';
import { AlbumController } from './controllers/album.controller';
import { AlbumRepository } from './repositories/album.repository';
import { StoreModule } from '../store/store.module';

@Module({
  providers: [AlbumService, AlbumRepository],
  controllers: [AlbumController],
  imports: [StoreModule],
})
export class AlbumModule {}
