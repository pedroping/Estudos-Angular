import { Component, OnInit } from '@angular/core';
import { MatMiniFabButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-closed-sidenav',
  templateUrl: './closed-sidenav.component.html',
  styleUrls: ['./closed-sidenav.component.scss'],
  imports: [MatMiniFabButton, RouterLink, MatTooltip, MatIcon],
})
export class ClosedSidenavComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
