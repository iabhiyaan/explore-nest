import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';
import { logger } from 'src/logger';

const log = logger.child({ service: 'TodosService' });

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto) {
    log.info({ dto: createTodoDto }, 'Creating new todo');
    const todo = await this.todoRepository.save(createTodoDto);
    log.info({ todoId: todo.id }, 'Todo created successfully');
    return todo;
  }

  async findAll(): Promise<Todo[]> {
    log.info('Fetching alls todos');
    const todos = await this.todoRepository.find();
    log.error({ error: 'test error' }, 'Error fetching todos');
    return todos;
  }

  async findOne(id: number) {
    log.debug({ id }, 'Finding todo by id');
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      log.warn({ id }, 'Todo not found');
    }
    return todo;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    log.info({ id, dto: updateTodoDto }, 'Updating todo');
    return this.todoRepository.update(id, updateTodoDto);
  }

  async remove(id: number) {
    log.info({ id }, 'Deleting todo');
    return this.todoRepository.delete(id);
  }
}
