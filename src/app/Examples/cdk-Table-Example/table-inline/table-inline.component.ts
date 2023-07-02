import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { COLORS } from 'src/app/core/models';
@Component({
  selector: 'app-table-inline',
  templateUrl: './table-inline.component.html',
  styleUrls: ['./table-inline.component.scss'],
})
export class TableInlineComponent implements OnInit {
  @Input() userForm!: FormGroup;
  @Input() sideEffectFunction!: Function;

  colorOptions = COLORS;

  constructor() {}

  ngOnInit() {
    const controls = this.userForm.controls;
    Object.entries(controls).forEach(([key, control]) => {
      const ValueChanges$ = this.sideEffectFunction(control.valueChanges, key);
      ValueChanges$.subscribe();
    });
  }
}
