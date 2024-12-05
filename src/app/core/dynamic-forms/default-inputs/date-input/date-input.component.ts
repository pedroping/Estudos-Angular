import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { DefaultFormInput } from '../../defaultFormInput';
import { DynamicFormConfig } from '../../dForms-tokens';

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
  standalone: false,
})
export class DateInputComponent extends DefaultFormInput<DynamicFormConfig> {}
