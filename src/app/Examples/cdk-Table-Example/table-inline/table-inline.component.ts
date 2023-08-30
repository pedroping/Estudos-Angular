import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { startWith } from 'rxjs';
import { COLORS } from 'src/app/core/models';
@Component({
  selector: 'app-table-inline',
  templateUrl: './table-inline.component.html',
  styleUrls: ['./table-inline.component.scss'],
})
export class TableInlineComponent<T> implements OnInit {
  @Input() userForm!: FormGroup;
  @Input() sideEffectFunction!: Function;
  @Input() controls!: { [key: string]: (AbstractControl | FormControl)[] }

  colorOptions = COLORS;
  incrementorControl = new FormControl(0);

  constructor() { }

  ngOnInit() {
    this.incrementorControl.setValue(this.userForm.value.valor);
    const ValueChanges$ = this.sideEffectFunction(
      this.incrementorControl.valueChanges,
      'newIncrementor',
      this.userForm.value
    );
    this.controls['newIncrementor'][this.userForm.value.id] = this.incrementorControl
    ValueChanges$.subscribe();

    const controls = this.userForm.controls;
    Object.entries(controls).forEach(([key, control]) => {
      const ValueChanges$ = this.sideEffectFunction(
        control.valueChanges,
        key,
        this.userForm.value
      );
      if (this.controls[key]) this.controls[key][this.userForm.value.id] = control
      ValueChanges$.subscribe();
    });
  }
}
