import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { MeuPerfilComponent } from './core/MeuPerfil/MeuPerfil.component';
import { SendDataService } from './core/services/sendData.service';
import { ACCORDIONS } from './helpers/accordions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{

  @ViewChild('sidenav') sidenav!: MatSidenav
  
  title = 'Estudo_Angular';
  Accordions = ACCORDIONS

  constructor(
    public dialog: MatDialog,
    readonly sendData : SendDataService
  ) {}

  ngOnInit() {
    this.sendData.closeSideNav$.subscribe((val) => {
      this.sidenav.close()
    })
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
