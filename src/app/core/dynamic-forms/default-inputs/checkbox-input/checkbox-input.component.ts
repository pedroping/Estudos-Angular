import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { DynamicFormConfig } from '../../dForms-tokens';
import { DefaultFormInput } from '../../defaultFormInput';

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
})
export class CheckboxInputComponent extends DefaultFormInput<DynamicFormConfig> {}
