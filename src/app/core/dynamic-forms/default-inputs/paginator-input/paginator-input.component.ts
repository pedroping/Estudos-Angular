import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { DefaultFormInput } from '../../defaultFormInput';
import { DynamicFormConfig } from '../../dForms-tokens';

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
  standalone: false,
})
export class PaginatorInputComponent extends DefaultFormInput<DynamicFormConfig> {}
