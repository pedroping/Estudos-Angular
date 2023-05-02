import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { COLORS } from 'src/app/core/models';
@Component({
  selector: 'app-table-inline',
  templateUrl: './table-inline.component.html',
  styleUrls: ['./table-inline.component.scss']
})
export class TableInlineComponent implements OnInit {
  @Input() userForm!: FormGroup;
  
  colorOptions = COLORS
  
  constructor() { }

  ngOnInit() {
  }

}
