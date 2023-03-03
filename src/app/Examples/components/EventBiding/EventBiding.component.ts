import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-EventBiding',
  templateUrl: './EventBiding.component.html',
  styleUrls: ['./EventBiding.component.css']
})
export class EventBidingComponent implements OnInit {

  valorSalvo: string = ''

  constructor() { }

  ngOnInit() {
  }

  handleClick(){
    alert("Fui Clicado")
  }

  salvaValor(value: string){
    this.valorSalvo = value
  }

}
