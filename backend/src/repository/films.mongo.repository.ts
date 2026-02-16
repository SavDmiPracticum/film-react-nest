import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film } from './films.schema';
import { FilmsRepository } from './films.type';

@Injectable()
export class FilmsMongoRepository implements FilmsRepository {
  constructor(@InjectModel('film') private filmModel: Model<Film>) {}

  async getFilms(): Promise<Film[]> {
    return this.filmModel.find().exec();
  }

  async getFilmById(id: string): Promise<Film> {
    const film = await this.filmModel.findOne({ id: id }).exec();
    return film;
  }
  async updateFilmTaken(
    filmId: string,
    scheduleId: string,
    seats: string[],
  ): Promise<Film> {
    return await this.filmModel
      .findOneAndUpdate(
        { id: filmId, 'schedule.id': scheduleId },
        { $addToSet: { 'schedule.$.taken': { $each: seats } } },
      )
      .exec();
  }
}
