import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MeuPerfilComponent } from './core/MeuPerfil/MeuPerfil.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Estudo_Loiane';
  items = [
    {
      icon: 'home',
      label: 'Home'
    },
    {
      icon: 'table_chart',
      label: 'Tabela 1'
    },
    {
      icon: 'table_chart',
      label: 'Tabela 2'
    },
    {
      icon: 'lock',
      label: 'Lugar Secreto'
    },
  ]
  expandedIndex = 0;

  constructor(public dialog: MatDialog){

  }
  openPerfil(){
    this.dialog.open(MeuPerfilComponent, {
      width: '350px',
      height: 'auto',
      enterAnimationDuration: '0.5s',
      exitAnimationDuration: '0.5s'
      
    }).afterClosed().subscribe(x => {})
  }

}
