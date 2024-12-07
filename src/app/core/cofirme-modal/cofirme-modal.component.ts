import { Component, Inject, OnInit } from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { DarkModeService } from '../services/darkMode.service';
import { NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatDialogClose } from '@angular/material/dialog';

@Component({
  selector: 'app-cofirme-modal',
  templateUrl: './cofirme-modal.component.html',
  styleUrls: ['./cofirme-modal.component.scss'],
  imports: [NgIf, MatButton, MatDialogClose],
})
export class CofirmeModalComponent implements OnInit {
  constructor(
    public dialogRef: DialogRef<boolean>,
    @Inject(DIALOG_DATA) public data: any,
    public darkModeService: DarkModeService,
  ) {}

  ngOnInit() {}
}
