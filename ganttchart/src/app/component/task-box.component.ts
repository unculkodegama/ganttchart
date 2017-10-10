import {Component, Input} from "@angular/core";
import {TaskService} from "../services/task.service";

import {Task} from "../model/task";
import {EmitterService} from "../services/event.service";


@Component({
  selector: 'task-box',
  templateUrl: '../html/task-box.component.html',
  styleUrls: ['../css/task-box.component.css']

})

export class TaskBoxComponent {

  constructor(private taskService: TaskService) {
  }

  @Input() task: Task;
  @Input() listId: string;
  @Input() editId: string;
  @Input() childId: string;

  editTask() {

    EmitterService.get(this.editId).emit(this.task);
  }

  deleteTask(id: string) {

    this.taskService.deleteTask(id).subscribe(tasks => {
      EmitterService.get(this.listId).emit(tasks)
    }, err => {
      console.log(err)
    });
  }

  createChild() {
    EmitterService.get(this.childId).emit(this.task);
  }
}
