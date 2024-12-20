import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  CdkDragDropService,
  Photo,
  User,
} from '../services/cdkDragDrop.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, map, of } from 'rxjs';
import {
  CdkDragDrop,
  transferArrayItem,
  CdkDropList,
  CdkDrag,
  CdkDragPreview,
} from '@angular/cdk/drag-drop';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-userDetails',
  templateUrl: './userDetails.component.html',
  styleUrls: ['./userDetails.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    CdkDropList,
    NgFor,
    CdkDrag,
    RouterLink,
    CdkDragPreview,
    AsyncPipe,
  ],
})
export class UserDetailsComponent implements OnInit {
  user$!: Observable<User>;
  isSmallSize$!: Observable<boolean>;

  constructor(
    public cdkDragDropService: CdkDragDropService,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private breakpointObserver: BreakpointObserver,
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((id) => {
      this.cdkDragDropService.users$.subscribe((val) => {
        this.user$ = of(val.find((item) => item.id == id['id'])!);
        this.cdr.detectChanges();
      });
    });

    this.isSmallSize$ = this.breakpointObserver
      .observe(['(max-width: 500px)'])
      .pipe(
        map((result) => {
          return result.matches;
        }),
      );
  }

  drop(event: CdkDragDrop<Photo[]>) {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );
  }
}
