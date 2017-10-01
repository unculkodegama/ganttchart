import {Component, OnInit, OnChanges, Input} from "@angular/core";
import { Task } from '../model/task';
import {TaskService} from "../services/task.service";
import {EmitterService} from "../services/event.service";

@Component({
    selector: 'task-list',
    template: `
                <task-box [editId]="editId"
                          [listId]="listId"
                          [childId]="childId" 
                          *ngFor="let task of tasks"
                          [task]="task">
                </task-box>
                `
})

export class TaskListComponent implements OnInit, OnChanges {

    tasks: Task[];

    @Input() childId:string;
    @Input() listId: string;
    @Input() editId: string;

    constructor(private taskService: TaskService) {
    }

    ngOnInit() {
        this.loadTasks()
    }

    loadTasks() {
        this.taskService.getTasks().subscribe(tasks => {
            this.tasks = tasks;
        }, err => {
            console.log(err)
        });
    }

    ngOnChanges(changes: any) {
        EmitterService.get(this.listId).subscribe((tasks:Task[]) => { this.loadTasks()});
    }
}
