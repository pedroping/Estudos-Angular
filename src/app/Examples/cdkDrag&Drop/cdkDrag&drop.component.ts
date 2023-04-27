import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cdkDrag&drop',
  templateUrl: './cdkDrag&drop.component.html',
  styleUrls: ['./cdkDrag&drop.component.scss'],
})
export class CdkDragdropComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  changeRouter(argumentes: any) {
    this.router.navigate([argumentes]);
  }
}
