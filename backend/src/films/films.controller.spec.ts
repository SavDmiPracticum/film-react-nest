import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

describe('FilmsController', () => {
  let controller: FilmsController;
  let service: FilmsService;

  const mockFilmsService = {
    getFilms: jest.fn(),
    getFilmScheduleById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [{ provide: FilmsService, useValue: mockFilmsService }],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
    service = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('test get films method', () => {
    const mockFilms = [
      {
        id: '1',
        name: 'Film 1',
        tags: ['драма', 'комедия'],
        schedule: [
          {
            id: 1,
            daytime: '2026-01-01T10:00:00',
            hall: 1,
            rows: 10,
            seats: 10,
            price: 500,
            taken: ['1:1', '1:2'],
          },
        ],
      },
    ];

    mockFilmsService.getFilms.mockResolvedValue(mockFilms);
    controller.getFilms().then((films) => {
      expect(service.getFilms).toHaveBeenCalled();
      expect(films).toEqual(mockFilms);
    });
  });

  it('test get film schedule by id method', () => {
    const mockFilm = {
      id: '1',
      name: 'Film 1',
      tags: ['драма', 'комедия'],
      schedule: [
        {
          id: 1,
          daytime: '2026-01-01T10:00:00',
          hall: 1,
          rows: 10,
          seats: 10,
          price: 500,
          taken: ['1:1', '1:2'],
        },
      ],
    };

    mockFilmsService.getFilmScheduleById.mockResolvedValue(mockFilm);
    controller.getFilmScheduleById('1').then((film) => {
      expect(service.getFilmScheduleById).toHaveBeenCalled();
      expect(film).toEqual(mockFilm);
    });
  });
});
