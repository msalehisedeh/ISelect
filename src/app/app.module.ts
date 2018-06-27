import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { ISelectModule } from './iselect/iselect.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
	CommonModule,
    ISelectModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
