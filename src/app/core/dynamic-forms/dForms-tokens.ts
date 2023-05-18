import { InjectionToken, Type } from '@angular/core';
import { ValidatorFn } from '@angular/forms';
import { TextInputComponent } from './default-inputs/text-input/text-input.component';
import { SelectInputComponent } from './default-inputs/select-input/select-input.component';
import { CheckboxInputComponent } from './default-inputs/checkbox-input/checkbox-input.component';
import { DateInputComponent } from './default-inputs/date-input/date-input.component';
import { PaginatorInputComponent } from './default-inputs/paginator-input/paginator-input.component';

export type Fields =
  | 'textInput'
  | 'selectInput'
  | 'checkboxInput'
  | 'textareaInput'
  | 'dateInput'
  | 'pageInput';

export type DynamicFormConfig = {
  type: Fields;
  label: string;
  controlName: string;
  mask?: string;
  suffix?: string;
  prefix?: string;
  initialValue?: any;
  placeholder?: string;
  options?: string[];
  validation?: ValidatorFn[];
  rangeDate?: boolean;
  fnLink?: string;
  formFn?: (params?: any) => void;
};

export interface DynamicControl {
  formConfig: DynamicFormConfig;
}

export type ComponentFields = {
  [Property in Fields]: Type<DynamicControl>;
};

export const DEFAULT_FORMS = {
  textInput: TextInputComponent,
  selectInput: SelectInputComponent,
  checkboxInput: CheckboxInputComponent,
  textareaInput: TextInputComponent,
  dateInput: DateInputComponent,
  pageInput: PaginatorInputComponent,
};

export const DYNAMIC_FORMS = new InjectionToken<ComponentFields>('DYNAMIC_FORMS');