import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-colunas',
  templateUrl: './colunas.component.html',
  styleUrls: ['./colunas.component.scss'],
})
export class ColunasComponent implements OnInit {
  checkboxs = [
    {
      formName: 'id',
      label: 'Id',
    },
    {
      formName: 'name',
      label: 'Nome Completo',
    },
    {
      formName: 'email',
      label: 'Email',
    },
    {
      formName: 'age',
      label: 'Idade',
    },
  ];

  Form!: FormGroup

  constructor(
    private ControlContainer : ControlContainer
  ) {}

  ngOnInit() {
    this.Form = this.ControlContainer.control as FormGroup
    this.Form.valueChanges.subscribe((val) => {
      let Count: number = 0;

      Object.keys(val).forEach((key) => {
        if (val[key] && Object.keys(val).length == 4) {
          Count++;
        }
      });

      Object.keys(this.Form.controls).forEach((key) => {
        this.Form.get(key)?.enable({ emitEvent: false });
        if (this.Form.get(key)?.value && Count == 1) {
          this.Form.get(key)?.disable({ emitEvent: false });
        }
      });
    });
  }
}
