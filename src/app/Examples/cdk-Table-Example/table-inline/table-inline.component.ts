import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { startWith } from 'rxjs';
import { COLORS } from 'src/app/core/models';
@Component({
  selector: 'app-table-inline',
  templateUrl: './table-inline.component.html',
  styleUrls: ['./table-inline.component.scss'],
})
export class TableInlineComponent implements OnInit {
  @Input() id!: number;
  @Input() userForm!: FormGroup;
  @Input() sideEffectFunction!: Function;
  @Input() DefaultIncrementorValue: number = 0;

  colorOptions = COLORS;
  incrementorControl = new FormControl(0);

  constructor() {}

  ngOnInit() {
    const ValueChanges$ = this.sideEffectFunction(
      this.incrementorControl.valueChanges,
      'newIncrementor',
      this.id
    );
    ValueChanges$.subscribe();
    this.incrementorControl.setValue(this.DefaultIncrementorValue);

    const controls = this.userForm.controls;
    Object.entries(controls).forEach(([key, control]) => {
      const ValueChanges$ = this.sideEffectFunction(
        control.valueChanges,
        key,
        this.id
      );
      ValueChanges$.subscribe();
    });
  }
}
