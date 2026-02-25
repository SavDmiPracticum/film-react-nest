import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;

  const mockOrderService = {
    createOrder: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [{ provide: OrderService, useValue: mockOrderService }],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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

    const mockResponse = {
      total: 1,
      items: [{ orderId: '123' }],
    };

    mockOrderService.createOrder.mockResolvedValue(mockResponse);

    controller.createOrder(orderDto).then((response) => {
      expect(service.createOrder).toHaveBeenCalledWith(orderDto);
      expect(response).toEqual(mockResponse);
    });
  });
});
