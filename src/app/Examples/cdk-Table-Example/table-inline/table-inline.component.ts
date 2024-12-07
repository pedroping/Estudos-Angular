import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { COLORS } from 'src/app/core/models';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { NgFor } from '@angular/common';
import { MatOption } from '@angular/material/core';
import { IncrementorComponent } from '../../../core/componenets/incrementor/incrementor.component';
@Component({
  selector: 'app-table-inline',
  templateUrl: './table-inline.component.html',
  styleUrls: ['./table-inline.component.scss'],
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    FormsModule,
    ReactiveFormsModule,
    MatSelect,
    NgFor,
    MatOption,
    IncrementorComponent,
  ],
})
export class TableInlineComponent<T> implements OnInit {
  @Input() userForm!: FormGroup;
  @Input() sideEffectFunction!: Function;
  @Input() controls!: { [key: string]: (AbstractControl | FormControl)[] };

  colorOptions = COLORS;
  incrementorControl = new FormControl(0);

  constructor() {}

  ngOnInit() {
    this.incrementorControl.setValue(this.userForm.value.valor);
    const ValueChanges$ = this.sideEffectFunction(
      this.incrementorControl.valueChanges,
      'newIncrementor',
      this.userForm.value,
    );
    this.controls['newIncrementor'][this.userForm.value.id] =
      this.incrementorControl;
    ValueChanges$.subscribe();

    const controls = this.userForm.controls;
    Object.entries(controls).forEach(([key, control]) => {
      const ValueChanges$ = this.sideEffectFunction(
        control.valueChanges,
        key,
        this.userForm.value,
      );
      if (this.controls[key])
        this.controls[key][this.userForm.value.id] = control;
      ValueChanges$.subscribe();
    });
  }
}
