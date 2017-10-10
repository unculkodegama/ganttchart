import {Component, OnChanges, Input} from "@angular/core";
import {TaskService} from "../services/task.service";
import {Task} from "../model/task";
import {Observable} from "rxjs";
import {EmitterService} from "../services/event.service";
import {IMyDrpOptions, IMyDateRangeModel} from 'mydaterangepicker';

import {UUID} from 'angular2-uuid';

@Component({
  selector: 'task-form',
  templateUrl: '../html/task-form.component.html',
  styleUrls: ['../css/task-form.component.css']
})

export class TaskFormComponent implements OnChanges {

  constructor(private taskService: TaskService) {
  }

  private model = new Task('', '', '', '', '', '');
  private editing = false;
  private createChild = false;
  private startDate: Date;
  private endDate: Date;
  private dateRangeModel: Object;

  @Input() editId: string;
  @Input() listId: string;
  @Input() childId: string;

  private dateRangePickerOptions: IMyDrpOptions = {
    dateFormat: 'dd.mm.yyyy',
    firstDayOfWeek: 'mo',
    sunHighlight: true,
    inline: false,
    minYear: this.actualYearMinusTwo(),
    showWeekNumbers: true,
  }

  //TODO - vyriešiť ID
  submitTask() {
    let taskOperation: Observable<Task[]>;

    if (!this.createChild) {
      if (!this.editing) {

        let uuid = UUID.UUID();
        let date = new Date();

        //creating a prior model, with everything and then push to json
        let priorModel = new Task(uuid.toString(), uuid.toString(), this.model.nameOfTask,
          date.toString(), this.startDate.toUTCString(), this.endDate.toUTCString());

        taskOperation = this.taskService.createTask(priorModel)
      } else {
        //updating a model
        taskOperation = this.taskService.updateTask(this.model)
      }

    } else {
      let uuid = UUID.UUID();
      let date = new Date();

      // crating a child model
      let modelChild = new Task(uuid.toString(), this.model.parentId,
        this.model.nameOfTask, date.toString(), this.startDate.toUTCString(),
        this.endDate.toUTCString());

      taskOperation = this.taskService.createTask(modelChild);
    }

    taskOperation.subscribe(tasks => {
        EmitterService.get(this.listId).emit(tasks);

        this.model = new Task('', '', '', '', '', '');
        this.endDate = null;
        this.startDate = null;

        if (this.editing) this.editing = !this.editing;
        if (this.createChild) this.createChild = !this.createChild;
      },
      err => {
        console.log(err)
      });
  };

  ngOnChanges() {
    // Listen to the 'edit'emitted event so as populate the model
    // with the event payload
    EmitterService.get(this.editId).subscribe((task: Task) => {
      this.model = task;
      this.editing = true;

      let startDate = new Date(task.startDate);
      let endDate = new Date(task.endDate);

      console.log(task.startDate);
      console.log('rok');
      console.log('');
      console.log('mesiac');
      console.log(task.startDate.substring(8,11));
      console.log(this.returnMonth(task.endDate.substring(8,11)));
      console.log('den');
      console.log(Number(task.startDate.substring(5,7)));

      this.dateRangeModel = {
        beginDate: {
          year: startDate.getFullYear(),
          month: this.returnMonth(task.startDate.substring(8,11)),
          day: Number(task.startDate.substring(5,7))
        }, endDate: {
          year: endDate.getFullYear(),
          month: this.returnMonth(task.endDate.substring(8,11)),
          day: Number(task.endDate.substring(5,7))
        }
      };

    });

    EmitterService.get(this.childId).subscribe((task: Task) => {
      this.model = task;
      this.createChild = true;
    });
  }

  resetAll() {
    this.model = new Task('', '', '', '', '', '');
    this.endDate = null;
    this.startDate = null;

    if (this.editing) this.editing = !this.editing;
    if (this.createChild) this.createChild = !this.createChild;
  }

  actualYearMinusTwo(): number {
    let date = new Date();
    return date.getFullYear() - 2;
  }

  onDateRangeChanged(event: IMyDateRangeModel) {
    this.startDate = event.beginJsDate;
    this.endDate = event.endJsDate;
  }

  //TODO vymysliet nieco ine ako switch
  returnMonth(monthString: string) : number {
    let month : number;

    switch (monthString) {
      case 'Jan':
        month = 1;
        break;
      case 'Feb':
        month = 2;
        break;
      case 'Mar':
        month = 3;
        break;
      case 'Apr':
        month = 4;
        break;
      case 'May':
        month = 5;
        break;
      case 'Jun':
        month = 6;
        break;
      case 'Jul':
        month = 7;
        break;
      case 'Aug':
        month = 8;
        break;
      case 'Sep':
        month = 9;
        break;
      case 'Oct':
        month = 10;
        break;
      case 'Nov':
        month = 11;
        break;
      case 'Dec':
        month = 12;
    }
    return month;
  }


}
