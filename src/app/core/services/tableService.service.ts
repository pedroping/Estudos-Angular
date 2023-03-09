import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { User } from '../models';
@Injectable({
  providedIn: 'root'
})
export class TableServiceService {

  baseUrl = 'https://dummyjson.com/users'

  constructor(
    private readonly http : HttpClient
  ) { }

  getAll(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}`)
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/add`, user);
  }

  editUser(user: User): Observable<User> {
    return this.http.patch<User>(`${this.baseUrl}/${user.id}`, user);
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.baseUrl}/${id}`);
  }

  deleteManyUsers(Ids: number[]): Observable<User[]> {
    return forkJoin(
      Ids.map(id => {
        return this.deleteUser(id)
      })
    )
  }

}
