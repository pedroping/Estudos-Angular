import { Injectable } from '@angular/core';
import { TableServiceService } from './tableService.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ExpandUserService {

  Users$$ = new BehaviorSubject<any[]>([])
  Users$: Observable<any[]> = this.Users$$.asObservable()

  constructor(private readonly tableServiceService: TableServiceService) {}

  changeUser(id: number){
    this.tableServiceService.getUser(id).subscribe(user => {
      const FindUser = this.Users$$.value.find((element) => element == user)

      if(!FindUser){
        this.Users$$.value.push(user)
        this.Users$$.next(this.Users$$.value)
        this.Users$ = this.Users$$.asObservable()
      }
    })
  }
}
