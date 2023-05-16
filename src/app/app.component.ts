import {
  Component,
  HostBinding,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { MeuPerfilComponent } from './core/MeuPerfil/MeuPerfil.component';
import { SendDataService } from './core/services/sendData.service';
import { ACCORDIONS } from './helpers/accordions';
import { DOCUMENT } from '@angular/common';
import { DarkModeService } from './core/services/darkMode.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  darkMode = false;

  @ViewChild('sidenav') sidenav!: MatSidenav;

  title = 'Estudo_Angular';
  Accordions = ACCORDIONS;

  constructor(
    public dialog: MatDialog,
    readonly sendData: SendDataService,
    readonly darkModeService: DarkModeService
  ) {}

  ngOnInit() {
    this.sendData.closeSideNav$.subscribe((val) => {
      this.sidenav.close();
    });
  }

  toggleDarkMode(): void {
    this.darkModeService.darkMode = !this.darkModeService.darkMode;
    if (this.darkModeService.darkMode) {
      sessionStorage.setItem('darkMode', 'isDarkMode');
      return document.body.classList.add('darkMode');
    }
    sessionStorage.removeItem('darkMode');
    document.body.classList.remove('darkMode');
  }

  openPerfil() {
    this.dialog
      .open(MeuPerfilComponent, {
        width: '350px',
        height: 'auto',
        enterAnimationDuration: '0.5s',
        exitAnimationDuration: '0.5s',
      })
      .afterClosed()
      .subscribe((x) => {});
  }
}
