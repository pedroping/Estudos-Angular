import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import {
  Component,
  OnInit,
  Inject,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DarkModeService } from '../../services/darkMode.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-colunas',
  templateUrl: './colunas.component.html',
  styleUrls: ['./colunas.component.scss'],
})
export class ColunasComponent implements OnInit {

  Form!: FormGroup;

  @Output() Close = new EventEmitter<boolean>();
  @Output() ChangeOrder = new EventEmitter<string[]>();
  @Input() Checkboxs!: BehaviorSubject<
  {
    formName: string;
    label: string;
  }[]
>

  constructor(
    private ControlContainer: ControlContainer,
    readonly darkModeService: DarkModeService
  ) {}

  ngOnInit() {
    this.Form = this.ControlContainer.control as FormGroup;
    this.Form.valueChanges.subscribe((val) => {
      this.ChangeOrder.emit(
        this.Checkboxs.value
          .filter((item) => this.Form.get(item.formName)?.value)
          .map((item) => item.formName)
      );
      let Count: number = 0;

      Object.keys(val).forEach((key) => {
        if (val[key] && Object.keys(val).length == 4) {
          Count++;
        }
      });

      Object.keys(this.Form.controls).forEach((key) => {
        this.Form.get(key)?.enable({ emitEvent: false });
        if (this.Form.get(key)?.value && Count == 1) {
          this.Form.get(key)?.disable({ emitEvent: false });
        }
      });
    });
  }

  drop(
    event: CdkDragDrop<
      {
        formName: string;
        label: string;
      }[]
    >
  ) {
    moveItemInArray(this.Checkboxs.value, event.previousIndex, event.currentIndex);

    this.ChangeOrder.emit(
      this.Checkboxs.value
        .filter((item) => this.Form.get(item.formName)?.value)
        .map((item) => item.formName)
    );
  }
}
