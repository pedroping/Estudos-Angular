import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  ControlContainer,
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { DefaultFormInput } from '../../defaultFormInput';
import { DynamicFormConfig } from '../../dForms-tokens';
import {
  MatFormField,
  MatLabel,
  MatSuffix,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import {
  MatDatepickerInput,
  MatDatepickerToggle,
  MatDatepicker,
} from '@angular/material/datepicker';
import { NgIf } from '@angular/common';

@Component({
  selector: 'brunsker-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    FormsModule,
    MatDatepickerInput,
    ReactiveFormsModule,
    MatDatepickerToggle,
    MatSuffix,
    MatDatepicker,
    NgIf,
  ],
})
export class DateInputComponent extends DefaultFormInput<DynamicFormConfig> {}
