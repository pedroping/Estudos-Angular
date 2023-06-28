import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { DynamicFormConfig } from '../../dForms-tokens';
import { DefaultFormInput } from '../../defaultFormInput';

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
})
export class SelectInputComponent extends DefaultFormInput<DynamicFormConfig> {}
