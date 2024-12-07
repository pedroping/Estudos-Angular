import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatSidenav,
  MatDrawerContainer,
  MatDrawer,
  MatDrawerContent,
} from '@angular/material/sidenav';
import { SendDataService } from './core/services/sendData.service';
import { ACCORDIONS } from './helpers/accordions';
import { DarkModeService } from './core/services/darkMode.service';
import { DARK_COLORS, LIGHT_COLORS } from './helpers/colors';
import { OpenedDialogsService } from './core/services/opened-dialogs.service';
import { filter } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { LoaderComponent } from './core/componenets/loader/loader.component';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { CdkAccordion } from '@angular/cdk/accordion';
import { NgFor, NgIf, AsyncPipe } from '@angular/common';
import { AccordionComponent } from './core/componenets/accordion/accordion.component';
import { ClosedSidenavComponent } from './core/componenets/closed-sidenav/closed-sidenav.component';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    LoaderComponent,
    MatDrawerContainer,
    MatDrawer,
    MatToolbar,
    MatIcon,
    CdkAccordion,
    NgFor,
    AccordionComponent,
    MatDrawerContent,
    ClosedSidenavComponent,
    NgIf,
    RouterOutlet,
    AsyncPipe,
  ],
})
export class AppComponent implements OnInit {
  darkMode = false;

  @ViewChild('drawer') sidenav!: MatSidenav;

  title = 'Estudo_Angular';
  Accordions = ACCORDIONS;

  openedOverlays$ = this.openedDialogsService.openedOverlays$.pipe(
    filter((item) => !!item),
  );
  constructor(
    public dialog: MatDialog,
    readonly sendData: SendDataService,
    readonly darkModeService: DarkModeService,
    readonly openedDialogsService: OpenedDialogsService,
  ) {}

  ngOnInit() {
    this.sendData.closeSideNav$.subscribe(() => {
      this.sidenav.close();
    });
  }

  toggleDarkMode(): void {
    this.darkModeService.darkMode = !this.darkModeService.darkMode;

    const method = this.darkModeService.darkMode ? 'add' : 'remove';
    const color = this.darkModeService.darkMode ? DARK_COLORS : LIGHT_COLORS;
    const storageMethod = this.darkModeService.darkMode
      ? 'setItem'
      : 'removeItem';

    document
      .querySelector('meta[name="theme-color"]')!
      .setAttribute('content', color);
    sessionStorage[storageMethod]('darkMode', 'isDarkMode');
    document.body.classList[method]('darkMode');
  }
}
