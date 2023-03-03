import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs'
@Component({
  selector: 'app-StyleClassBiding',
  templateUrl: './StyleClassBiding.component.html',
  styleUrls: ['./StyleClassBiding.component.css']
})
export class StyleClassBidingComponent implements OnInit {

  constructor() { }

  classControl = new FormControl('')

  ngOnInit() {
    this.classControl.valueChanges.subscribe(
      (val) => {
        console.log(val);
      }
    )
  }

}
