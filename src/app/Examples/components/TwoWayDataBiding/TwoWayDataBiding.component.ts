import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-TwoWayDataBiding',
  templateUrl: './TwoWayDataBiding.component.html',
  styleUrls: ['./TwoWayDataBiding.component.css'],
  standalone: false,
})
export class TwoWayDataBidingComponent implements OnInit {

  data: string = ''
  constructor() { }

  ngOnInit() {
  }

}
