import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  isLoggedin = new BehaviorSubject<boolean>(false);

  constructor() {}
}
