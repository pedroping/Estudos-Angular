import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  darkMode = false;
  constructor() {
    const isDarkMode = sessionStorage.getItem('darkMode');
    this.darkMode = !!isDarkMode;
    if (isDarkMode) document.body.classList.add('darkMode');
  }
}
