import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  ControlContainer,
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { DefaultFormInput } from '../../defaultFormInput';
import { DynamicFormConfig } from '../../dForms-tokens';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'pa-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss'],
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
    MatSelect,
    FormsModule,
    ReactiveFormsModule,
    MatOption,
    NgFor,
  ],
})
export class SelectInputComponent extends DefaultFormInput<DynamicFormConfig> {}
