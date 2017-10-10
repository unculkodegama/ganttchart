import {Component} from "@angular/core";

@Component({
    selector: 'task-widget',
    templateUrl: '../html/tasks.index.html',
    styleUrls: [ '../css/task.index.css']

})

export class TaskIndexComponent {

    private listId = 'COMMENT_COMPONENT_LIST';
    private editId = 'COMMENT_COMPONENT_EDIT';
    private childId = 'COMMENT_COMPONENT_CHILD';
}