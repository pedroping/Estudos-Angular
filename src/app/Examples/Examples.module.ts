import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamplesComponent } from './Examples.component';
import { Example_routes } from './Examples.routing';

@NgModule({
  imports: [
    CommonModule,
    Example_routes
  ],
  declarations: [ExamplesComponent]
})
export class ExamplesModule { }
