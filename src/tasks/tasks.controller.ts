import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation-pipe';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}


  @Get('/:id')
  getTaskById(@Param('id',ParseIntPipe) id:number):Promise<Task>{
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto):Promise<Task>{
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id',ParseIntPipe) id:number):Promise<void>{
    return this.tasksService.removeTaskById(id);
  }

  @Patch('/:id/status')
  updateStatusTaskById(@Param('id',ParseIntPipe) id:number,
                       @Body('status',TaskStatusValidationPipe) status: TaskStatus ):Promise<Task>{
    return this.tasksService.updateTaskStatus(id,status);
  }

  @Get()
  getTaks(@Query(ValidationPipe) filterDto:GetTasksFilterDto): Promise<Task[]>{
      return this.tasksService.getTasks(filterDto);
  }

}

