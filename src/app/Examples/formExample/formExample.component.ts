import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicFormConfig } from 'src/app/core/dynamic-forms/dForms-tokens';

@Component({
  selector: 'app-formExample',
  templateUrl: './formExample.component.html',
  styleUrls: ['./formExample.component.scss'],
})
export class FormExampleComponent implements OnInit {
  constructor() {}

  form = new FormGroup({
    testeInput: new FormControl('')
  })
  
  formConfig: DynamicFormConfig[][] = [
    [
      {
        type: 'textInput',
        label: 'Teste',
        controlName: 'testeInput',
      },
      {
        type: 'selectInput',
        label: 'Teste',
        controlName: 'testeInput',
      },
      {
        type: 'textInput',
        label: 'Teste',
        controlName: 'testeInput',
      },
    ],
  ];

  ngOnInit() {}
}
