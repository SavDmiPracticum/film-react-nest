import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  FilmDto,
  FilmsDtoResponse,
  ScheduleDto,
  SchedulesDtoResponse,
} from './dto/films.dto';
import { FilmsRepository } from 'src/repository/films.repository';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}
  async getFilms(): Promise<FilmsDtoResponse> {
    const films: FilmDto[] = await this.filmsRepository.getFilms();
    return {
      total: films.length,
      items: films,
    };
  }

  async getFilmScheduleById(id: string): Promise<SchedulesDtoResponse> {
    const film = await this.filmsRepository.getFilmById(id);
    if (!film) {
      throw new HttpException(
        { error: "Film doesn't exist" },
        HttpStatus.NOT_FOUND,
      );
    }
    const schedules: ScheduleDto[] = film.schedule ?? [];

    return {
      total: schedules.length,
      items: schedules,
    };
  }
}
