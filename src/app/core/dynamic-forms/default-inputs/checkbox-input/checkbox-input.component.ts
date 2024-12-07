import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  ControlContainer,
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { DefaultFormInput } from '../../defaultFormInput';
import { DynamicFormConfig } from '../../dForms-tokens';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'brunsker-checkbox-input',
  templateUrl: './checkbox-input.component.html',
  styleUrls: ['./checkbox-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
  imports: [MatCheckbox, FormsModule, ReactiveFormsModule],
})
export class CheckboxInputComponent extends DefaultFormInput<DynamicFormConfig> {}
