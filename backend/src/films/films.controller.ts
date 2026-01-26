import { Controller, Get, Param } from '@nestjs/common';
import { FilmsDtoResponse, SchedulesDtoResponse } from './dto/films.dto';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}
  @Get()
  async getFilms(): Promise<FilmsDtoResponse> {
    return this.filmsService.getFilms();
  }
  @Get(':id/schedule')
  async getFilmScheduleById(
    @Param('id') id: string,
  ): Promise<SchedulesDtoResponse> {
    return this.filmsService.getFilmScheduleById(id);
  }
}
