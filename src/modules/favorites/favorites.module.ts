import { Module } from '@nestjs/common';
import { FavoritesService } from './services/favorites.service';
import { FavoritesController } from './controllers/favorites.controller';
import { FavoritesRepository } from './repositories/favorites.repository';
import { StoreModule } from '../store/store.module';

@Module({
  providers: [FavoritesService, FavoritesRepository],
  controllers: [FavoritesController],
  imports: [StoreModule],
})
export class FavoritesModule {}
