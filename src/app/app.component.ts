import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { MeuPerfilComponent } from './core/MeuPerfil/MeuPerfil.component';
import { SendDataService } from './core/services/sendData.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{

  @ViewChild('sidenav') sidenav!: MatSidenav
  
  title = 'Estudo_Loiane';


  RotasBinding = [
    {
      rota: '/Examples/Data-binding',
      label: 'Data binding',
    },
    {
      rota: '/Examples/StyleClass-binding',
      label: 'Style & Class binding',
    },
    {
      rota: '/Examples/Event-binding',
      label: 'Event binding',
    },
    {
      rota: '/Examples/TwoWayData-binding',
      label: 'Two Way Data binding',
    },
  ];

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
