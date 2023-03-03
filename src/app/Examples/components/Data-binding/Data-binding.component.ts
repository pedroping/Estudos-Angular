import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Data-binding',
  templateUrl: './Data-binding.component.html',
  styleUrls: ['./Data-binding.component.scss'],
  
})
export class DataBindingComponent implements OnInit {

  teste = "Testando Interpolação"
  baseUrl = "http://lorempixel.com.br/500/400/?"
  urlTeste = ""
  id = 1
  constructor() { }

  ngOnInit() {
    this.changeImage()
  }

  changeImage(){
    this.urlTeste = `${this.baseUrl}${this.id++}`
  }
}
