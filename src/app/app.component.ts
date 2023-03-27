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
  items = ['Home', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
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
