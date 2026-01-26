import { FilmsRepository } from 'src/repository/films.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PostOrderDto, TicketDto } from './dto/order.dto';
import { randomUUID } from 'node:crypto';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: FilmsRepository) {}
  async createOrder(orderDto: PostOrderDto) {
    const tickets: TicketDto[] = orderDto.tickets;
    const saleTickets = [];

    for (const ticket of tickets) {
      const film = await this.filmsRepository.getFilmById(ticket.film);
      if (!film) {
        throw new HttpException(
          { error: 'Film not found' },
          HttpStatus.NOT_FOUND,
        );
      }
      const sessionId = film.schedule[0].id;

      const session = film.schedule.find((s) => s.id === sessionId);
      if (!session) {
        throw new HttpException(
          { error: 'Session not found' },
          HttpStatus.NOT_FOUND,
        );
      }

      if (session.taken.includes(`${ticket.row}-${ticket.seat}`)) {
        throw new HttpException(
          { error: 'Seat is already taken' },
          HttpStatus.BAD_REQUEST,
        );
      }

      await this.filmsRepository.updateFilmTaken(ticket.film, sessionId, [
        `${ticket.row}-${ticket.seat}`,
      ]);

      saleTickets.push({
        id: randomUUID(),
        film: ticket.film,
        session: sessionId,
        row: ticket.row,
        seat: ticket.seat,
        daytime: session.daytime,
        price: session.price,
      });
    }

    return {
      total: saleTickets.length,
      items: saleTickets,
    };
  }
}
