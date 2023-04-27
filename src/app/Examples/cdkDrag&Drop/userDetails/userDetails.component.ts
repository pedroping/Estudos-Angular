import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CdkDragDropService, Photo, User } from '../services/cdkDragDrop.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-userDetails',
  templateUrl: './userDetails.component.html',
  styleUrls: ['./userDetails.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailsComponent implements OnInit {
  user!: User;

  constructor(
    public cdkDragDropService: CdkDragDropService,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((id) => {
      console.log(id);
      
      let users = this.cdkDragDropService.users$.value;
      this.user = users.find((item) => item.id == id['id'])!;
      this.cdr.detectChanges()
    });
  }

  drop(event: CdkDragDrop<Photo[]>) {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
    console.log('drop', event);
  }
}
