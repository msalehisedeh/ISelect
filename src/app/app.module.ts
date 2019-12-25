import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ISelectModule } from './iselect/iselect.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ISelectModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
