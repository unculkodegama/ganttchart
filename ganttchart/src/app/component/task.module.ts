import {NgModule} from "@angular/core";
import {JsonpModule, HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {TaskBoxComponent} from "./task-box.component";
import {TaskFormComponent} from "./task-form.component";
import {TaskListComponent} from "./task-list.component";
import {TaskIndexComponent} from "./task.component";
import {TaskService} from "../services/task.service";
import {TooltipModule} from "ngx-tooltip";
import {MyDateRangePickerModule} from 'mydaterangepicker';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    TooltipModule,
    MyDateRangePickerModule
  ],

  declarations: [
    TaskBoxComponent,
    TaskFormComponent,
    TaskListComponent,
    TaskIndexComponent,
  ],

  providers: [
    TaskService
  ],

  bootstrap: [TaskBoxComponent, TaskFormComponent, TaskListComponent, TaskIndexComponent],

  exports: [
    TaskBoxComponent,
    TaskFormComponent,
    TaskListComponent,
    TaskIndexComponent,
  ]
})

export class TaskComponentModule {

}
