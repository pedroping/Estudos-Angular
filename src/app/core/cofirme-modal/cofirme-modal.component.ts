import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DarkModeService } from '../services/darkMode.service';

@Component({
  selector: 'app-cofirme-modal',
  templateUrl: './cofirme-modal.component.html',
  styleUrls: ['./cofirme-modal.component.scss']
})
export class CofirmeModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CofirmeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public darkModeService: DarkModeService
  ) { }

  ngOnInit() {
  }

}
