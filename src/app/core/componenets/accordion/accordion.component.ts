import { Component, Input, OnInit } from '@angular/core';
import { SendDataService } from '../../services/sendData.service';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit {


  @Input() Title: string = ''
  @Input() Icon: string = ''
  @Input() Rotas!: { rota: string, label: string }[]

  constructor(readonly sendData : SendDataService) { }

  ngOnInit() {
  }

}
