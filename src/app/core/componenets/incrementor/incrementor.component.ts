import {
  Component,
  OnInit,
  Injector,
  Optional,
  forwardRef,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NgControl,
} from '@angular/forms';
import { Observable, Subject, fromEvent, takeUntil, tap, timer } from 'rxjs';

@Component({
  selector: 'app-incrementor',
  templateUrl: './incrementor.component.html',
  styleUrls: ['./incrementor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IncrementorComponent),
      multi: true,
    },
  ],
})
export class IncrementorComponent
  implements ControlValueAccessor, OnInit, AfterViewInit
{
  incrementorControl = new FormControl();
  disabled!: boolean;
  ngControl!: NgControl;

  onChanged!: (stars: number) => void;
  onTouched!: () => void;

  @ViewChild('PlusIcon') PlusIcon!: ElementRef;
  @ViewChild('MinusIcon') MinusIcon!: ElementRef;

  PlusIconUp$!: Observable<unknown>;
  MinusIconUp$!: Observable<unknown>;
 
  constructor(
    @Optional() private controlContainer: ControlContainer,
    private injector: Injector
  ) {}

  ngOnInit() {
    this.ngControl = this.injector.get(NgControl);

    if (this.ngControl.control?.validator) {
      this.incrementorControl.validator = this.ngControl.control.validator;
    }

    if (this.controlContainer) {
      const formGroup = this.controlContainer.control as FormGroup;
      const key = this.ngControl.name as keyof FormGroup;
      formGroup.controls[key];
      if (formGroup.controls[key]) {
        this.incrementorControl.validator = formGroup.controls[key].validator;
        this.incrementorControl.updateValueAndValidity();
      }
    }

    this.incrementorControl.valueChanges.subscribe((val) => {
      this.onChanged(val);
      this.onTouched();
    });
  }

  ngAfterViewInit() {
    this.PlusIconUp$ = fromEvent(this.PlusIcon.nativeElement, 'mouseup');
    this.MinusIconUp$ = fromEvent(this.MinusIcon.nativeElement, 'mouseup');
  }

  writeValue(value: number) {
    this.incrementorControl.setValue(+value, { emitEvent: false });
  }

  registerOnChange(fn: (stars: number) => void) {
    this.onChanged = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  upClick() {
    timer(0, 100)
      .pipe(takeUntil(this.PlusIconUp$))
      .subscribe(() => {
        this.caclValue(1);
      });
  }

  downClick() {
    timer(0, 100)
      .pipe(takeUntil(this.MinusIconUp$))
      .subscribe(() => {
        this.caclValue(-1);
      });
  }

  caclValue(val: number) {
    const actualVal = this.incrementorControl.value! + val;
    this.incrementorControl.setValue(actualVal < 0 ? 0 : actualVal);
  }
}
