import { Module } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { EmailsController } from './emails.controller';
import { BullModule } from '@nestjs/bullmq';
import { EmailConsumer } from './email.consumer';
import { TodosModule } from 'src/todos/todos.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'email',
    }),
    BullModule.registerQueue({
      name: 'update-todo'
    }),
    TodosModule,
  ],
  controllers: [EmailsController],
  providers: [EmailsService, EmailConsumer],
})
export class EmailsModule { }
