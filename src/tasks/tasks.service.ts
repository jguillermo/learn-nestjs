import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository:TaskRepository
  ) {}

  async getTaskById(id:number):Promise<Task>{
    const found = await this.taskRepository.findOne(id);
    if(!found){
      throw new NotFoundException(`task with id ${id} not found`);
    }
    return found;
  }

  async createTask(createTaskDto:CreateTaskDto):Promise<Task>{
    return this.taskRepository.createTask(createTaskDto);
  }

  async removeTaskById(id: number) {
    const result = await this.taskRepository.delete(id);
    if(result.affected===0){
      throw new NotFoundException(`task with id ${id} not found`);
    }
  }

  async updateTaskStatus(id:number, status:TaskStatus):Promise<Task>{
    const task = await this.getTaskById(id)
    task.status = status;
    await this.taskRepository.save(task);
    return task;
  }

  async getTasks(filterDto: GetTasksFilterDto):Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto);
  }
}
