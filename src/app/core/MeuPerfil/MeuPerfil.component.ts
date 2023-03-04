import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-MeuPerfil',
  templateUrl: './MeuPerfil.component.html',
  styleUrls: ['./MeuPerfil.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateY(-60%)'}),
        animate('200ms ease-in', style({transform: 'translateY(0%)'}))
      ]),
      transition(':leave', [
        animate('100ms ease-in', style({transform: 'translateY(-60%)'}))
      ])
    ]),
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate(500, style({ opacity: 0 }))
      ])
    ])
  ],
  
})
export class MeuPerfilComponent implements OnInit {

  showCollapse: boolean = true

  constructor(
    public dialogRef: MatDialogRef<MeuPerfilComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
  }

}
