import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { TrackModule } from './modules/track/track.module';
import { ArtistModule } from './modules/artist/artist.module';
import { StoreModule } from './modules/store/store.module';
import { AlbumModule } from './modules/album/album.module';
import { FavoritesModule } from './modules/favorites/favorites.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    TrackModule,
    ArtistModule,
    StoreModule,
    AlbumModule,
    FavoritesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
