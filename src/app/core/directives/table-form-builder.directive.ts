import {
  ChangeDetectorRef,
  Directive,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

export type IFormArray = FormGroup<{}> | AbstractControl;

@Directive({
  selector: '[appTableFormBuilder]',
  exportAs: 'appTableFormBuilder',
})
export class TableFormBuilderDirective<T> implements OnInit, OnChanges {
  @Input('appTableFormBuilder') data!: T[];
  @Input('appTableFormBuilderCdr') cdr!: ChangeDetectorRef;

  form!: {
    [key: number]: FormGroup;
  };
  subscriptions$: Subscription[] = [];

  constructor() {}

  ngOnInit(): void {
    this.form = {};
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) this.ngOnInit();
  }

  buildForm() {
    const mappedData = this.mapData();
    if (!mappedData) return;
    const keys = Object.keys(mappedData[0]);

    mappedData.forEach((item) => {
      const formGroup = new FormGroup({});
      keys.forEach((key) => {
        const newControl = new FormControl(item[key as keyof T]);
        formGroup.addControl(key, newControl);
      });
      if (this.form) this.form[item.id] = formGroup;
    });
    this.setValueChanges();
  }

  setValueChanges() {
    Object.keys(this.form).forEach((key) => {
      const id = +key;
      const formSubscription = this.form[id].valueChanges.subscribe((value) => {
        this.data[id - 1] = value;
        this.cdr.detectChanges();
      });
      this.subscriptions$ = [...this.subscriptions$, formSubscription];
    });
  }

  mapData() {
    return this.data.map((item) => {
      const typedItem = item as T & { id: number };
      return {
        ...typedItem,
        id: typedItem.id,
      };
    });
  }

  getControl(id: number, name: string) {
    const form = this.getForm(id);
    if (!form || !form.get(name)) return new FormControl();

    return form.get(name) as FormControl;
  }

  getForm(id: number) {
    return this.form[id];
  }
}
