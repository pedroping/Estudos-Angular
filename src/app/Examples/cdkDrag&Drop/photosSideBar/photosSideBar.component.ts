import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CdkDragDropService, Photo } from '../services/cdkDragDrop.service';
import {
  CdkDragDrop,
  transferArrayItem,
  CdkDropList,
  CdkDrag,
  CdkDragPreview,
} from '@angular/cdk/drag-drop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-photosSideBar',
  templateUrl: './photosSideBar.component.html',
  styleUrls: ['./photosSideBar.component.scss'],
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
export class PhotosSideBarComponent implements OnInit {
  photos$!: Observable<Photo[]>;

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    public cdkDragDropService: CdkDragDropService,
  ) {}

  ngOnInit() {
    this.photos$ = this.http
      .get<Photo[]>(`https://jsonplaceholder.typicode.com/photos?_limit=5`)
      .pipe(
        map((resp) => {
          let Filteres_Resp: Photo[] = [];
          resp.forEach((item) => {
            if (
              !this.cdkDragDropService.selectedUser?.photos.find(
                (photo) => photo.thumbnailUrl == item.thumbnailUrl,
              )
            )
              Filteres_Resp.push(item);
          });
          return Filteres_Resp;
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
