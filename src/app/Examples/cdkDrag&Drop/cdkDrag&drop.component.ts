import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { CdkDropListGroup } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-cdkDrag&drop',
  templateUrl: './cdkDrag&drop.component.html',
  styleUrls: ['./cdkDrag&drop.component.scss'],
  imports: [
    MatToolbar,
    MatIconButton,
    RouterLink,
    MatIcon,
    CdkDropListGroup,
    RouterOutlet,
  ],
})
export class CdkDragdropComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  changeRouter(argumentes: any) {
    this.router.navigate([argumentes]);
  }
}
