import { Component, OnInit } from '@angular/core';
import { CdkDragDropService } from '../services/cdkDragDrop.service';
import { NgFor, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-userSideBar',
  templateUrl: './userSideBar.component.html',
  styleUrls: ['./userSideBar.component.scss'],
  imports: [NgFor, RouterLink, AsyncPipe],
})
export class UserSideBarComponent implements OnInit {
  constructor(public cdkDragDropService: CdkDragDropService) {}

  ngOnInit() {}
}
