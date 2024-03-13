import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ArtistService } from '../services/artist.service';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  findAll() {
    return this.artistService.getAllArtists();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.artistService.getArtistById(id);
  }

  @Post()
  create(@Body() body: CreateArtistDto) {
    return this.artistService.createArtist(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateArtistDto) {
    return this.artistService.updateArtist(id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    return this.artistService.deleteArtist(id);
  }
}
