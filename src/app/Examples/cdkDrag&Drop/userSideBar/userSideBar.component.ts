import { Component, OnInit } from '@angular/core';
import { CdkDragDropService } from '../services/cdkDragDrop.service';
import { firstValueFrom, of } from 'rxjs';

@Component({
  selector: 'app-userSideBar',
  templateUrl: './userSideBar.component.html',
  styleUrls: ['./userSideBar.component.scss'],
})
export class UserSideBarComponent implements OnInit {
  constructor(public cdkDragDropService: CdkDragDropService) {}

  ngOnInit() {
  }

}
