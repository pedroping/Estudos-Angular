import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { DynamicFormConfig } from '../../dForms-tokens';
import { DefaultFormInput } from '../../defaultFormInput';

@Component({
  selector: 'brunsker-paginator-input',
  templateUrl: './paginator-input.component.html',
  styleUrls: ['./paginator-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class PaginatorInputComponent extends DefaultFormInput<DynamicFormConfig> {}
