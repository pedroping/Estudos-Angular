import {
  ChangeDetectorRef,
  Directive,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

export type IFormArray = FormGroup<{}> | AbstractControl;

@Directive({
  selector: '[appTableFormBuilder]',
  exportAs: 'appTableFormBuilder',
  standalone: false,
})
export class TableFormBuilderDirective<T> implements OnInit, OnChanges, OnDestroy {
  @Input('appTableFormBuilder') data!: T & { id: number }[];
  @Input('appTableFormBuilderCdr') cdr!: ChangeDetectorRef;

  form!: {
    [key: number]: FormGroup;
  };
  subscriptions$: Subscription[] = [];

  constructor() { }

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) this.buildForm();
  }

  buildForm() {
    this.form = {};
    const mappedData = this.data;
    if (!mappedData) return;
    const keys = Object.keys(mappedData[0]);

    mappedData.forEach((item) => {
      const formGroup = new FormGroup({});
      keys.forEach((key) => {
        const newControl = new FormControl(item[key as keyof typeof item]);
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


  getControl(id: number, name: string) {
    const form = this.getForm(id);
    if (!form || !form.get(name)) return new FormControl();

    return form.get(name) as FormControl;
  }

  getForm(id: number) {
    return this.form[id];
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach(subscription => subscription.unsubscribe())
  }
}
