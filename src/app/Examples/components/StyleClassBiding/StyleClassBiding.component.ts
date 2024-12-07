import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { map } from 'rxjs';
import { MatFormField } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
@Component({
  selector: 'app-StyleClassBiding',
  templateUrl: './StyleClassBiding.component.html',
  styleUrls: ['./StyleClassBiding.component.css'],
  imports: [
    MatFormField,
    MatSelect,
    FormsModule,
    ReactiveFormsModule,
    MatOption,
  ],
})
export class StyleClassBidingComponent implements OnInit {
  constructor() {}

  classControl = new FormControl('');

  ngOnInit() {
    this.classControl.valueChanges.subscribe((val) => {
      console.log(val);
    });
  }
}
