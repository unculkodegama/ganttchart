import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {DateComponent} from "./date.component";

@NgModule({
  imports: [
    BrowserModule
  ],

  declarations: [
    DateComponent
  ],

  providers: [

  ],

  bootstrap: [DateComponent],

  exports: [
    DateComponent
  ]
})

export class DateComponentModule {

}
