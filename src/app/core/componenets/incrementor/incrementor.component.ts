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
import {
  BehaviorSubject,
  Observable,
  fromEvent,
  interval,
  merge,
  switchMap,
  take,
  takeUntil,
  tap,
  timer,
} from 'rxjs';

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
  incrementorControl = new FormControl(0);
  disabled!: boolean;
  ngControl!: NgControl;

  onChanged!: (stars: number) => void;
  onTouched!: () => void;

  @ViewChild('PlusIcon') PlusIcon!: ElementRef;
  @ViewChild('MinusIcon') MinusIcon!: ElementRef;

  PlusIconUp$!: Observable<unknown>;
  MinusIconUp$!: Observable<unknown>;

  PlusIconLeave$!: Observable<unknown>;
  MinusIconLeave$!: Observable<unknown>;

  tickCount = 0;

  tickPlusMultiple$ = new BehaviorSubject<number>(1);
  tickMinusMultiple$ = new BehaviorSubject<number>(1);

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
      this.onChanged(val!);
      this.onTouched();
    });
  }

  ngAfterViewInit() {
    this.PlusIconUp$ = fromEvent(this.PlusIcon.nativeElement, 'mouseup');
    this.MinusIconUp$ = fromEvent(this.MinusIcon.nativeElement, 'mouseup');

    this.PlusIconLeave$ = fromEvent(this.PlusIcon.nativeElement, 'mouseleave');
    this.MinusIconLeave$ = fromEvent(
      this.MinusIcon.nativeElement,
      'mouseleave'
    );
  }

  writeValue(value: number) {
    this.incrementorControl.setValue(+value, { emitEvent: false });
  }

  registerOnChange(fn: (value: number) => void) {
    this.onChanged = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  upClick() {
    this.tickPlusMultiple$
      .pipe(
        take(3),
        switchMap((val) =>
          interval(100 / val).pipe(
            takeUntil(
              merge(this.PlusIconUp$, this.PlusIconLeave$).pipe(
                tap(() => {
                  this.tickCount = 0;
                  this.tickPlusMultiple$.next(1);
                })
              )
            )
          )
        )
      )
      .subscribe(() => {
        this.tickCount++;
        this.caclValue(1);
        if (this.tickCount > 100) this.tickPlusMultiple$.next(100);
        else if (this.tickCount > 10) this.tickPlusMultiple$.next(10);
      });
  }

  downClick() {
    this.tickMinusMultiple$
      .pipe(
        take(3),
        switchMap((val) =>
          interval(100 / val).pipe(
            takeUntil(
              merge(this.MinusIconUp$, this.MinusIconLeave$).pipe(
                tap(() => {
                  this.tickCount = 0;
                  this.tickMinusMultiple$.next(1);
                })
              )
            )
          )
        )
      )
      .subscribe(() => {
        this.tickCount++;
        this.caclValue(-1);
        if (this.tickCount > 100) this.tickMinusMultiple$.next(100);
        else if (this.tickCount > 10) this.tickMinusMultiple$.next(10);
      });
  }

  caclValue(val: number) {
    const actualVal = this.incrementorControl.value! + val;
    this.incrementorControl.setValue(actualVal < 0 ? 0 : actualVal);
  }
}
