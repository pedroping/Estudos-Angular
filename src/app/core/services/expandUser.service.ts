import { Injectable } from '@angular/core';
import { TableServiceService } from './tableService.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ExpandUserService {

  Users$$ = new BehaviorSubject<any[]>([])

  constructor(private readonly tableServiceService: TableServiceService) {}

  changeUser(id: number){
    const FindUser = this.Users$$.value.find((element) => element.id == id)
    if(FindUser) return;
    
    this.tableServiceService.getUser(id).subscribe(user => {
        this.Users$$.value.push(user)
        this.Users$$.next(this.Users$$.value)
    })
  }
}
