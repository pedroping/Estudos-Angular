import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { DefaultFormInput } from '../../defaultFormInput';
import { DynamicFormConfig } from '../../dForms-tokens';

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
  standalone: false,
})
export class CheckboxInputComponent extends DefaultFormInput<DynamicFormConfig> {}
