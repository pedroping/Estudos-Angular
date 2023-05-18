import { Component, Inject, Input, OnInit } from '@angular/core';
import { DynamicFormConfig } from '../dForms-tokens';

@Component({
  selector: 'app-dForm',
  templateUrl: './dForm.component.html',
  styleUrls: ['./dForm.component.scss']
})
export class DFormComponent implements OnInit {

  constructor() { }

  @Input() FormConfig!: DynamicFormConfig[][]

  ngOnInit() { }

}
