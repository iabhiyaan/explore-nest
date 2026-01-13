import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CitiesController } from './cities/cities.controller';
import { TodosModule } from './todos/todos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './todos/entities/todo.entity';
import { BullModule } from '@nestjs/bullmq';
import { EmailsModule } from './emails/emails.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'abhiyan123',
      database: 'explore-nest',
      entities: [Todo],
      synchronize: true
    }),
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    TodosModule,
    EmailsModule,
  ],
  controllers: [AppController, CitiesController],
  providers: [AppService],
})
export class AppModule { }
