import { Injectable, Input } from '@angular/core';
import { DynamicControl } from './dForms-tokens';

@Injectable()
export class DefaultFormInput<T> implements DynamicControl<T> {
  @Input() formConfig!: T;
}
