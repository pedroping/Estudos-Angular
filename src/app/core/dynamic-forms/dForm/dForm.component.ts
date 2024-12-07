import { Component, Input, OnInit } from '@angular/core';
import { DynamicFormConfig } from '../dForms-tokens';
import { NgFor } from '@angular/common';
import { CreateFormDirective } from '../createForm.directive';

@Component({
  selector: 'app-dForm',
  templateUrl: './dForm.component.html',
  styleUrls: ['./dForm.component.scss'],
  imports: [NgFor, CreateFormDirective],
})
export class DFormComponent implements OnInit {
  constructor() {}

  @Input() FormConfig!: DynamicFormConfig[][];

  ngOnInit() {}
}
