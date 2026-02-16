import { Schedule } from '../entity/schedule.entity';
import { Injectable } from '@nestjs/common';
import { FilmsRepository } from './films.type';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from '../entity/film.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilmsPgRepository implements FilmsRepository {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}
  async getFilms(): Promise<Film[]> {
    return this.filmRepository.find({
      relations: { schedule: true },
    });
  }
  async getFilmById(id: string): Promise<Film> {
    return this.filmRepository.findOne({
      where: { id },
      relations: { schedule: true },
    });
  }
  async updateFilmTaken(
    filmId: string,
    scheduleId: string,
    seats: string[],
  ): Promise<Film> {
    const schedule = await this.scheduleRepository.findOne({
      where: { id: scheduleId },
    });
    schedule.taken = [...new Set([...schedule.taken, ...seats])];
    this.scheduleRepository.update(scheduleId, schedule);

    return this.filmRepository.findOne({
      where: { id: filmId },
      relations: { schedule: true },
    });
  }
}
