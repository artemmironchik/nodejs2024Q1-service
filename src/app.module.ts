import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { TrackModule } from './modules/track/track.module';
import { ArtistModule } from './modules/artist/artist.module';
import { StoreModule } from './modules/store/store.module';

@Module({
  imports: [UserModule, TrackModule, ArtistModule, StoreModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
