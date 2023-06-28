import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { DynamicFormConfig } from '../../dForms-tokens';
import { DefaultFormInput } from '../../defaultFormInput';

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
})
export class TextareaInputComponent extends DefaultFormInput<DynamicFormConfig> {}
