import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from './films.service';
import { FilmsRepository } from '../repository/films.type';

describe('FilmsService', () => {
  let service: FilmsService;
  let repository: FilmsRepository;

  const mockFilmsRepository = {
    getFilms: jest.fn(),
    getFilmById: jest.fn(),
    updateFilmTaken: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmsService,
        { provide: 'FilmsRepository', useValue: mockFilmsRepository },
      ],
    }).compile();

    service = module.get<FilmsService>(FilmsService);
    repository = module.get<FilmsRepository>('FilmsRepository');
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('test get films method', () => {
    const mockFilms = [
      {
        id: '1',
        name: 'Film 1',
        tags: ['драма', 'комедия'],
        schedule: [
          {
            id: '1',
            daytime: '2026-01-01T10:00:00',
            seat: 'A1',
            row: 1,
            price: 100,
          },
        ],
      },
    ];

    const mockRes = {
      total: mockFilms.length,
      items: mockFilms,
    };

    mockFilmsRepository.getFilms.mockResolvedValue(mockFilms);
    service.getFilms().then((films) => {
      expect(repository.getFilms).toHaveBeenCalled();
      expect(films).toEqual(mockRes);
    });
  });

  it('test get film schedule by id method', () => {
    const mockFilm = {
      id: '1',
      name: 'Film 1',
      tags: ['драма', 'комедия'],
      schedule: [
        {
          id: '1',
          daytime: '2026-01-01T10:00:00',
          seat: 'A1',
          row: 1,
          price: 100,
        },
      ],
    };

    const mockRes = {
      total: mockFilm.schedule.length,
      items: mockFilm.schedule,
    };

    mockFilmsRepository.getFilmById.mockResolvedValue(mockFilm);
    service.getFilmScheduleById('1').then((film) => {
      expect(repository.getFilmById).toHaveBeenCalled();
      expect(film).toEqual(mockRes);
    });
  });
});
