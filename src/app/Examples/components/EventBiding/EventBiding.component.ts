import { Component, OnInit } from '@angular/core';
import { MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-EventBiding',
  templateUrl: './EventBiding.component.html',
  styleUrls: ['./EventBiding.component.css'],
  imports: [MatMiniFabButton, MatIcon],
})
export class EventBidingComponent implements OnInit {
  valorSalvo: string = '';

  constructor() {}

  ngOnInit() {}

  handleClick() {
    alert('Fui Clicado');
  }

  salvaValor(value: string) {
    this.valorSalvo = value;
  }
}
