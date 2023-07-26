import { Injectable } from '@angular/core';
import { DARK_COLORS } from 'src/app/helpers/colors';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  darkMode = false;
  constructor() {
    const isDarkMode = sessionStorage.getItem('darkMode');
    this.darkMode = !!isDarkMode;
    if (isDarkMode) {
      document
        .querySelector('meta[name="theme-color"]')!
        .setAttribute('content', DARK_COLORS);
      document.body.classList.add('darkMode');
    }
  }
}
