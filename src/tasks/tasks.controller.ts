import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation-pipe';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTaks(@Query(ValidationPipe) filterDto:GetTasksFilterDto): Task[]{
    //console.log(filterDto);
    if(Object.keys(filterDto).length){
      return this.tasksService.getAllTasksFilter(filterDto);
    }else{
      return this.tasksService.getAllTasks();
    }

  }

  @Get('/:id')
  getTaskById(@Param('id') id:string):Task{
    return this.tasksService.getTaskById(id);
  }


  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto):Task{
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id:string):void{
    this.tasksService.removeTaskById(id);
  }

  @Patch('/:id/status')
  updateStatusTaskById(@Param('id') id:string,
                       @Body('status',TaskStatusValidationPipe) status: TaskStatus ):Task{
    return this.tasksService.updateTaskStatus(id,status);
  }
}

