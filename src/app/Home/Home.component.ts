import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.scss'],
  imports: [MatIcon],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
