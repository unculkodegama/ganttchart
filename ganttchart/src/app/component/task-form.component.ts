import {Component, OnChanges, Input} from "@angular/core";
import {TaskService} from "../services/task.service";
import {Task} from "../model/task";
import {Observable} from "rxjs";
import {EmitterService} from "../services/event.service";

import {UUID} from 'angular2-uuid';

@Component({
    selector: 'task-form',
    templateUrl: '../html/task-form.component.html',
    styleUrls: ['../css/task-form.component.css']
})

export class TaskFormComponent implements OnChanges {

    constructor(private taskService: TaskService) {
    }

    private model = new Task('', '', '');
    private editing = false;
    private createChild = false;

    @Input() editId: string;
    @Input() listId: string;
    @Input() childId: string;

    //TODO - vyriešiť ID
    submitTask() {
        let taskOperation: Observable<Task[]>;

        if (!this.createChild) {
            if (!this.editing) {
                let uuid = UUID.UUID();
                let priorModel = new Task(uuid.toString(), uuid.toString(), this.model.nameOfTask);

                taskOperation = this.taskService.createTask(priorModel)
            } else {
                taskOperation = this.taskService.updateTask(this.model)
            }
        } else {
            let uuid = UUID.UUID();
            let modelChild = new Task(uuid.toString(), this.model.parentId, this.model.nameOfTask);

            taskOperation = this.taskService.createTask(modelChild);
        }
        taskOperation.subscribe(tasks => {
                EmitterService.get(this.listId).emit(tasks);
                this.model = new Task('', '', '');
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
            this.model = task
            this.editing = true;
        });

        EmitterService.get(this.childId).subscribe((task: Task) => {
            this.model = task
            this.createChild = true;
        });
    }

    resetAll() {
        this.model = new Task('', '', '');
        if (this.editing) this.editing = !this.editing;
        if (this.createChild) this.createChild = !this.createChild;
    }

}