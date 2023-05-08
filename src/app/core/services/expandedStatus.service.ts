import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExpandedStatusService<T> {
  activedExapandedRow: T[] = [];
  constructor() {}
}
