import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform{
  readonly allowdStatuses = [
    TaskStatus.OPEN,
    TaskStatus.DONE,
    TaskStatus.IN_PROGRESS
  ];
  transform(value: any, metadata: ArgumentMetadata): any {
    value = value.toUpperCase();
    if(!this.isStatusValid(value)){
      throw new BadRequestException(`${value} is an invalid status`);
    }
    return value;
  }

  private isStatusValid(status:any):boolean{
    const idx=this.allowdStatuses.indexOf(status);
    return idx !== -1
  }

}