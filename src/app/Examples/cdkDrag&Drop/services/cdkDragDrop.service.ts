import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

export interface Photo {
  id: string;
  albumId: string;
  thumbnailUrl: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  photos: Photo[];
}

@Injectable({
  providedIn: 'root',
})
export class CdkDragDropService {
  users$ = new BehaviorSubject<User[]>([]);
  selectedUser!: User;

  constructor(private http: HttpClient) {
    this.http
      .get<User[]>(`https://jsonplaceholder.typicode.com/users`)
      .pipe(
        map((resp) => {
          return resp.map((item) => {
            return {
              id: item.id,
              name: item.name,
              email: item.email,
              photos: [],
            };
          });
        }),
      )
      .subscribe((resp) => this.users$.next(resp));
  }
}
