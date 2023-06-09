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
    testeInput1: new FormControl(''),
    testeInput2: new FormControl(''),
    testeInput3: new FormControl(''),
    testeSelect1: new FormControl(2)
  })
  
  formConfig: DynamicFormConfig[][] = [
    [
      {
        type: 'textInput',
        label: 'Teste',
        controlName: 'testeInput1',
      },
      {
        type: 'selectInput',
        label: 'Teste',
        controlName: 'testeSelect1',
        options: [
          {
            key: 1,
            label: '1',
          },
          {
            key: 2,
            label: '2',
          },
          {
            key: 3,
            label: '3',
          }
        ]
      },
    ],
    [
      {
        type: 'textInput',
        label: 'Teste',
        controlName: 'testeInput2',
      },
      {
        type: 'textInput',
        label: 'Teste',
        controlName: 'testeInput3',
      },
    ]
  ];

  ngOnInit() {}
}
