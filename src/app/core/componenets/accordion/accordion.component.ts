import { Component, Input, OnInit } from '@angular/core';
import { SendDataService } from '../../services/sendData.service';
import { CdkAccordionItem } from '@angular/cdk/accordion';
import { MatIcon } from '@angular/material/icon';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OnRouteDirective } from '../../directives/onRoute.directive';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  imports: [CdkAccordionItem, MatIcon, NgFor, RouterLink, OnRouteDirective],
})
export class AccordionComponent implements OnInit {
  @Input() Title: string = '';
  @Input() Icon: string = '';
  @Input() Rotas!: { rota: string; label: string }[];

  constructor(readonly sendData: SendDataService) {}

  ngOnInit() {}
}
