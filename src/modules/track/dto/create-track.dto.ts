import { IsString, IsNumber } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  name: string;

  @IsNumber()
  duration: number;

  artistId: string | null;
  albumId: string | null;
}
