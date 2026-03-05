import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { FilmsRepository } from '../repository/films.type';

describe('OrderService', () => {
  let service: OrderService;
  let repository: FilmsRepository;

  const mockFilmsRepository = {
    getFilms: jest.fn(),
    getFilmById: jest.fn(),
    updateFilmTaken: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        { provide: 'FilmsRepository', useValue: mockFilmsRepository },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    repository = module.get<FilmsRepository>('FilmsRepository');
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('test create order method', () => {
    const orderDto = {
      email: '1@email.com',
      phone: '+79999999999',
      tickets: [
        {
          film: '1',
          session: '1',
          row: 1,
          seat: 1,
        },
      ],
    };

    const mockFilm = {
      id: '1',
      name: 'Film 1',
      tags: [],
      schedule: [
        {
          id: 1,
          daytime: '2026-01-01T10:00:00',
          hall: 1,
          rows: 10,
          seats: 10,
          price: 500,
          taken: '',
        },
      ],
    };

    const mockFilmWithTaken = {
      id: '1',
      name: 'Film 1',
      tags: [],
      schedule: [
        {
          id: 1,
          daytime: '2026-01-01T10:00:00',
          hall: 1,
          rows: 10,
          seats: 10,
          price: 500,
          taken: '[1-1]',
        },
      ],
    };

    const mockTickets = {
      items: [
        {
          id: '1',
          film: '1',
          session: 1,
          row: 1,
          seat: 1,
          daytime: '2026-01-01T10:00:00',
          price: 500,
        },
      ],
      total: 1,
    };

    mockFilmsRepository.getFilmById.mockResolvedValue(mockFilm);
    mockFilmsRepository.updateFilmTaken.mockResolvedValue(mockFilmWithTaken);

    service.createOrder(orderDto).then((result) => {
      expect(repository.getFilmById).toHaveBeenCalledWith('1');
      expect(repository.updateFilmTaken).toHaveBeenCalledWith('1', 1, ['1-1']);
      expect(result.total).toEqual(1);
      expect(result.items.length).toEqual(1);
      expect(result.items[0].price).toEqual(mockTickets.items[0].price);
      expect(result.items[0].daytime).toEqual(mockTickets.items[0].daytime);
      expect(result.items[0].seat).toEqual(mockTickets.items[0].seat);
      expect(result.items[0].row).toEqual(mockTickets.items[0].row);
    });
  });
});
