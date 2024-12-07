import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-TwoWayDataBiding',
  templateUrl: './TwoWayDataBiding.component.html',
  styleUrls: ['./TwoWayDataBiding.component.css'],
  imports: [FormsModule],
})
export class TwoWayDataBidingComponent implements OnInit {
  data: string = '';
  constructor() {}

  ngOnInit() {}
}
