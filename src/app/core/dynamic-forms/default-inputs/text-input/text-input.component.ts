import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { DefaultFormInput } from '../../defaultFormInput';
import { DynamicFormConfig } from '../../dForms-tokens';

@Component({
  selector: 'pa-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
  standalone: false,
})
export class TextInputComponent extends DefaultFormInput<DynamicFormConfig> {}
