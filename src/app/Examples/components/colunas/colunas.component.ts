import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-colunas',
  templateUrl: './colunas.component.html',
  styleUrls: ['./colunas.component.scss']
})
export class ColunasComponent implements OnInit {

  checkboxs = [
    {
      formName: 'id',
      label: 'Id'
    },
    {
      formName: 'name',
      label: 'Nome Completo'
    },
    {
      formName: 'email',
      label: 'Email'
    },
    {
      formName: 'age',
      label: 'Idade'
    }
  ]
  
  constructor(public dialogRef: DialogRef<ColunasComponent>, @Inject(DIALOG_DATA) public data: { Form: FormGroup}) { }

  ngOnInit() {
  }

}