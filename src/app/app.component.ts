import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { SendDataService } from './core/services/sendData.service';
import { ACCORDIONS } from './helpers/accordions';
import { DarkModeService } from './core/services/darkMode.service';
import { DARK_COLORS, LIGHT_COLORS } from './helpers/colors';
import { OpenedDialogsService } from './core/services/opened-dialogs.service';
import { filter } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  darkMode = false;

  @ViewChild('drawer') sidenav!: MatSidenav;

  title = 'Estudo_Angular';
  Accordions = ACCORDIONS;

  openedOverlays$ = this.openedDialogsService.openedOverlays$.pipe(
    filter((item) => !!item)
  );
  constructor(
    public dialog: MatDialog,
    readonly sendData: SendDataService,
    readonly darkModeService: DarkModeService,
    readonly openedDialogsService: OpenedDialogsService
  ) { }

  ngOnInit() {
    this.sendData.closeSideNav$.subscribe(() => {
      this.sidenav.close();
    });
  }

  toggleDarkMode(): void {
    this.darkModeService.darkMode = !this.darkModeService.darkMode;

    const method = this.darkModeService.darkMode ? 'add' : 'remove';
    const color = this.darkModeService.darkMode ? DARK_COLORS : LIGHT_COLORS;
    const storageMethod = this.darkModeService.darkMode ? 'setItem' : 'removeItem'
    
    document
      .querySelector('meta[name="theme-color"]')!
      .setAttribute('content', color);
    sessionStorage[storageMethod]('darkMode', 'isDarkMode');
    document.body.classList[method]('darkMode');
  }
}
