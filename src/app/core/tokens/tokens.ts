import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models';

export interface IToken {
  getAll: () => Observable<any>;
  addUser: (user: User) => Observable<User>;
  editUser: (user: User) => Observable<User>;
  deleteUser: (id: number) => Observable<User>;
  getUser: (id: number) => Observable<User>;
  deleteManyUsers: (Ids: number[]) => Observable<User[]>;
}

export const TABLESERVICE = new InjectionToken<IToken>('TABLESERVICE');
