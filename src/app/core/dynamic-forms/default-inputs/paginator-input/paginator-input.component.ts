import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { DynamicControl, DynamicFormConfig } from '../../dForms-tokens';

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
export class PaginatorInputComponent implements DynamicControl {
  @Input() formConfig!: DynamicFormConfig;
}
