import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { DynamicFormConfig } from '../../dForms-tokens';
import { DefaultFormInput } from '../../defaultFormInput';

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
})
export class TextInputComponent extends DefaultFormInput<DynamicFormConfig> {}
