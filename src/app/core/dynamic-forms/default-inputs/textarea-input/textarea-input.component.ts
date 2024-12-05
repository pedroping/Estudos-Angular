import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { DefaultFormInput } from '../../defaultFormInput';
import { DynamicFormConfig } from '../../dForms-tokens';

@Component({
  selector: 'brunsker-textarea-input',
  templateUrl: './textarea-input.component.html',
  styleUrls: ['./textarea-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
  standalone: false,
})
export class TextareaInputComponent extends DefaultFormInput<DynamicFormConfig> {}
