import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-inline',
  templateUrl: './table-inline.component.html',
  styleUrls: ['./table-inline.component.scss']
})
export class TableInlineComponent implements OnInit {
  @Input() user!: string;
  
  constructor() { }

  ngOnInit() {
  }

}
