import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  darkMode = false;
  constructor(@Inject(DOCUMENT) private document: Document) {
    const isDarkMode = sessionStorage.getItem('darkMode');
    this.darkMode = !!isDarkMode;
    if (isDarkMode) this.document.body.classList.add('darkMode');
  }
}
