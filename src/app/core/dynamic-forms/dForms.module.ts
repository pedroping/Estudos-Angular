import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { CheckboxInputComponent } from './default-inputs/checkbox-input/checkbox-input.component';
import { DateInputComponent } from './default-inputs/date-input/date-input.component';
import { PaginatorInputComponent } from './default-inputs/paginator-input/paginator-input.component';
import { SelectInputComponent } from './default-inputs/select-input/select-input.component';
import { TextInputComponent } from './default-inputs/text-input/text-input.component';
import { TextareaInputComponent } from './default-inputs/textarea-input/textarea-input.component';
import { DEFAULT_FORMS, DYNAMIC_FORMS } from './dForms-tokens';
import { DFormComponent } from './dForm/dForm.component';
import { CreateFormDirective } from './createForm.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  declarations: [	
    CheckboxInputComponent,
    DateInputComponent,
    PaginatorInputComponent,
    SelectInputComponent,
    TextInputComponent,
    TextareaInputComponent,
    DFormComponent,
    CreateFormDirective
   ],
  exports: [
    DFormComponent,
  ],
  providers: [
    {
      provide: DYNAMIC_FORMS,
      useValue: DEFAULT_FORMS
    }
  ]
})


export class DFormsModule {}
