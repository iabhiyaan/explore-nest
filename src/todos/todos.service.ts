import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  create(createTodoDto: CreateTodoDto) {
    return this.todoRepository.save(createTodoDto)
  }

  findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  findOne(id: number) {
    return this.todoRepository.findOne({
      where: {
        id
      }
    });
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    return this.todoRepository.update(id, updateTodoDto);
  }

  remove(id: number) {
    return this.todoRepository.delete(id);
  }
}
