import {
  IsArray,
  IsDateString,
  IsFQDN,
  IsInt,
  IsMongoId,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

export class FilmDto {
  @IsMongoId()
  id: string;
  @IsNumber()
  rating: number;
  @IsString()
  director: string;
  @IsArray()
  tags: string[];
  @IsFQDN()
  image: string;
  @IsFQDN()
  cover: string;
  @IsString()
  title: string;
  @IsString()
  about: string;
  @IsString()
  description: string;
}

export class FilmsDtoResponse {
  total: number;
  items: FilmDto[];
}

export class ScheduleDto {
  @IsMongoId()
  id: string;
  @IsDateString()
  daytime: string;
  @IsInt()
  @Min(1)
  hall: number;
  @IsInt()
  @Min(1)
  rows: number;
  @IsInt()
  @Min(1)
  seats: number;
  @IsNumber()
  price: number;
  @IsArray()
  taken: string[];
}

export class SchedulesDtoResponse {
  total: number;
  items: ScheduleDto[];
}
