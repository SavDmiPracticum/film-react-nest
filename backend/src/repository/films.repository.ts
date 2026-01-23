import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film } from './films.schema';

@Injectable()
export class FilmsRepository {
  constructor(@InjectModel('film') private filmModel: Model<Film>) {}

  async getFilms(): Promise<Film[]> {
    return this.filmModel.find().exec();
  }

  async getFilmById(id: string): Promise<Film> {
    const film = await this.filmModel.findOne({ id: id }).exec();
    return film;
  }
}
