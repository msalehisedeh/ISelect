import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe, DecimalPipe, JsonPipe, SlicePipe, UpperCasePipe, LowerCasePipe } from '@angular/common';

import { ISelect, CSSImagePipe } from './components/iselect.component';
import { ISelectDirective } from './directives/iselect.directive'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ISelect,
    CSSImagePipe,
    ISelectDirective
  ],
  exports: [
    ISelect,
    CSSImagePipe,
    ISelectDirective
  ],
  entryComponents: [
    ISelect
  ],
  providers: [
    CSSImagePipe,
    ISelectDirective
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ISelectModule {}
