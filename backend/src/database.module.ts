import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { FilmsMongoRepository } from './repository/films.mongo.repository';
import { FilmsPgRepository } from './repository/films.pg.repository';
import { FilmSchema } from './repository/films.schema';
import { Film } from './entity/film.entity';
import { Schedule } from './entity/schedule.entity';

@Module({})
export class DatabaseModule {
  static register(): DynamicModule {
    const driver = process.env.DATABASE_DRIVER || 'postgres';
    const imports = [];
    const providers = [];

    switch (driver) {
      case 'mongodb':
        imports.push(
          MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
              uri: config.get<string>(
                'DATABASE_URL',
                'mongodb://localhost:27017/prac',
              ),
            }),
          }),
          MongooseModule.forFeature([{ name: 'film', schema: FilmSchema }]),
        );
        providers.push(
          { provide: 'FilmsRepository', useClass: FilmsMongoRepository },
          FilmsMongoRepository,
        );
        break;

      case 'postgres':
        imports.push(
          TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
              type: 'postgres',
              host: config.get<string>('DATABASE_HOST', 'localhost'),
              port: config.get<number>('DATABASE_PORT', 5432),
              username: config.get<string>('DATABASE_USERNAME', 'prac'),
              password: config.get<string>('DATABASE_PASSWORD', 'prac'),
              database: config.get<string>('DATABASE_NAME', 'films'), //в тестах почему-то films вместо prac
              entities: [Film, Schedule],
              synchronize: config.get<boolean>('DATABASE_SYNCHRONIZE', false),
              logging: true,
            }),
          }),
          TypeOrmModule.forFeature([Film, Schedule]),
        );
        providers.push(
          { provide: 'FilmsRepository', useClass: FilmsPgRepository },
          FilmsPgRepository,
        );
        break;
    }
    return {
      module: DatabaseModule,
      imports,
      providers,
      exports: ['FilmsRepository', ...imports],
    };
  }
}
