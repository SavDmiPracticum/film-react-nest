import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database.module';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [DatabaseModule.register()],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
