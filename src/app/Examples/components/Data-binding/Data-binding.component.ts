import { Component, OnInit } from '@angular/core';
import { MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-Data-binding',
  templateUrl: './Data-binding.component.html',
  styleUrls: ['./Data-binding.component.scss'],
  imports: [MatMiniFabButton, MatIcon],
})
export class DataBindingComponent implements OnInit {
  teste = 'Testando Interpolação';
  baseUrl = 'http://lorempixel.com.br/500/400/?';
  urlTeste = '';
  id = 1;
  constructor() {}

  ngOnInit() {
    this.changeImage();
  }

  changeImage() {
    this.urlTeste = `${this.baseUrl}${this.id++}`;
  }
}
