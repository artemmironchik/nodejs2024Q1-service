import { Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { FavoritesService } from '../services/favorites.service';
import { StatusCodes } from 'http-status-codes';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getFavorites() {
    return this.favoritesService.getFavorites();
  }

  @Post('/track/:id')
  addTrack(@Param('id') id: string) {
    this.favoritesService.addTrack(id);
  }

  @Post('/album/:id')
  addAlbum(@Param('id') id: string) {
    this.favoritesService.addAlbum(id);
  }

  @Post('/artist/:id')
  addArtist(@Param('id') id: string) {
    this.favoritesService.addArtist(id);
  }

  @Delete('track/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  removeTrack(@Param('id') id: string) {
    this.favoritesService.removeTrack(id);
  }

  @Delete('album/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  removeAlbum(@Param('id') id: string) {
    this.favoritesService.removeAlbum(id);
  }

  @Delete('artist/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  removeArtist(@Param('id') id: string) {
    this.favoritesService.removeArtist(id);
  }
}
