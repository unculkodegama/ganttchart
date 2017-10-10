import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {TaskComponentModule} from "./component/task.module";
import {HttpModule, JsonpModule} from "@angular/http";

import {EmitterService} from "./services/event.service";
import {FormsModule} from "@angular/forms";
import {AppComponent} from "./app.component";
import {DateComponentModule} from "./component/date.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    JsonpModule,
    TaskComponentModule,
    DateComponentModule
  ],
  providers: [EmitterService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
