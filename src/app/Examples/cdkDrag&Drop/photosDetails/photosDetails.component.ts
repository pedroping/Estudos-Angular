import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CdkDragDropService } from '../services/cdkDragDrop.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NgIf, AsyncPipe } from '@angular/common';

interface PhotoDetails {
  id: string;
  url: string;
  title: string;
}

@Component({
  selector: 'app-photosDetails',
  templateUrl: './photosDetails.component.html',
  styleUrls: ['./photosDetails.component.scss'],
  imports: [NgIf, AsyncPipe],
})
export class PhotosDetailsComponent implements OnInit {
  photo$ = new BehaviorSubject<PhotoDetails>(null as any);

  constructor(
    public cdkDragDropService: CdkDragDropService,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private http: HttpClient,
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.http
        .get<PhotoDetails>(
          `https://jsonplaceholder.typicode.com/photos/${params['id']}`,
        )
        .subscribe((resp) => {
          this.photo$.next(resp);
        });
    });
  }
}
