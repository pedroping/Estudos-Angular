import { Component, OnInit } from '@angular/core';
import { CdkDragDropService } from '../services/cdkDragDrop.service';

@Component({
  selector: 'app-userSideBar',
  templateUrl: './userSideBar.component.html',
  styleUrls: ['./userSideBar.component.scss'],
  standalone: false,
})
export class UserSideBarComponent implements OnInit {
  constructor(public cdkDragDropService: CdkDragDropService) {}

  ngOnInit() {
  }

}
