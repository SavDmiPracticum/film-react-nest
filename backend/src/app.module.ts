import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database.module';
import { FilmsModule } from './films/films.module';
import { OrderModule } from './order/order.module';
import * as path from 'node:path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: '.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '..', 'public', 'content', 'afisha'),
      serveRoot: '/content/afisha',
    }),
    DatabaseModule.register(),
    FilmsModule,
    OrderModule,
  ],
})
export class AppModule {}
