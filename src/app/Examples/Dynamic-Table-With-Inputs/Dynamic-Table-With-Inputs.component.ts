import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnChanges,
} from '@angular/core';
import {
  AbstractFormGroupDirective,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableServiceService } from 'src/app/core/services/tableService.service';
import { FormValue, User } from 'src/app/core/models';
import { ChangeDetectorRef } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-Dynamic-Table-With-Inputs',
  templateUrl: './Dynamic-Table-With-Inputs.component.html',
  styleUrls: ['./Dynamic-Table-With-Inputs.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*', dysplay: 'none' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class DynamicTableWithInputsComponent implements OnInit, OnChanges {
  @ViewChild(MatSort) sort?: MatSort;
  displayedColumns: string[] = [
    'checkBox',
    'id',
    'nome',
    'idade',
    'email',
    'editField',
    'excluir',
  ];
  dataSource = new MatTableDataSource([]);
  ElementsSelecteds: any[] = [];

  checkAll = new FormControl(false);

  TableForm = new FormGroup({
    Array: new FormArray([]),
  });

  lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nec dui ut dui varius accumsan nec congue nisi. Cras vel ligula eleifend, consequat massa vitae, bibendum nulla. Vivamus feugiat sem purus, vel mollis sem consectetur ac. Fusce maximus purus ut tellus blandit, a faucibus neque suscipit. In vel rutrum tellus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec maximus mattis nibh. Suspendisse cursus orci sed fermentum efficitur. Nam et justo id mi dictum ullamcorper.';
  constructor(
    private readonly tableService: TableServiceService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getAllUser();
    this.activeRoute.queryParams.subscribe(paramns => {
      console.log("paramns", paramns);
    })
  }

  ngOnChanges() {
    this.dataSource.sort = this.sort!;
  }

  getAllUser() {
    this.tableService.getAll().subscribe((resp) => {
      resp.users.forEach((item: User) => {
        const FormGrupo = new FormGroup({
          checked: new FormControl(false),
          id: new FormControl(item.id),
          nome: new FormControl(item.firstName, [Validators.required, Validators.maxLength(10)]),
          idade: new FormControl(item.age, [Validators.required, Validators.min(100)]),
          email: new FormControl(item.email, [
            Validators.required,
            Validators.email,
          ]),
          onEdit: new FormControl(false),
          isNew: new FormControl(false),
          canEdit: new FormControl(true),
        });
        this.FormArray.push(FormGrupo);
      });
      this.dataSource.data = this.FormArray.value;
      this.ngOnChanges();
    });
  }

  getOcuupation(sexo: string) {
    return sexo ? (sexo == 'M' ? 'Masculino' : 'Feminino') : 'Não Definido';
  }

  get FormArray() {
    return this.TableForm.get('Array') as FormArray;
  }

  addnewStaticrow() {
    this.addRow();
  }

  checkSomeField() {
    const All_Select = this.FormArray.controls.every(
      (control) => control.get('checked')?.value
    );
    if (All_Select) {
      this.checkAll.setValue(true);
    } else {
      this.checkAll.setValue(false);
    }
  }

  checkAllFields() {
    this.FormArray.controls.forEach((control) => {
      control.get('checked')?.setValue(this.checkAll.value);
    });
  }

  getFormControl(id: number, key: string) {
    const Control = this.FormArray.controls.find((item) => item.value.id == id);
    return Control!.get(key) as FormControl;
  }

  getControl(row: any) {
    const Control = this.FormArray.controls.find(
      (item) => item.value.id == row.id
    );
    return Control as FormGroup;
  }

  getIndex(itemIndex: number) {
    let id!: number;

    this.FormArray.controls.forEach((item, index) => {
      if (item.get('id')?.value == itemIndex) id = index;
    });

    return id;
  }

  addRow() {
    const row = new FormGroup({
      checked: new FormControl(false),
      id: new FormControl(null as any),
      nome: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      idade: new FormControl(null as any, Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      onEdit: new FormControl(true),
      isNew: new FormControl(true),
      canEdit: new FormControl(false),
    });

    this.FormArray.insert(0, row);
    this.dataSource.data = this.FormArray.value;
  }

  deletRow(row: any, index: number) {
    this.setElement(row);
    if (!row.id) {
      this.FormArray.removeAt(index);
      this.dataSource.data = this.FormArray.value;
      return;
    }

    this.tableService.deleteUser(row.id).subscribe({
      next: (resp) => {
        this.FormArray.removeAt(index);
        this.dataSource.data = this.FormArray.value;
      },
    });
  }

  someOnEdit() {
    return this.FormArray.value.some((item: FormValue) => item.onEdit);
  }

  setValueControl(
    row: FormControl,
    state: boolean,
    element?: any,
    event?: Event
  ) {
    event?.preventDefault();
    this.ElementsSelecteds = this.ElementsSelecteds.filter(
      (item) => item != element
    );
    row.setValue(state, { emitEvent: false });
  }

  handleSave(row: FormGroup, index: number) {
    const User = row.value;
    if (User.isNew) {
      const New_User: User = {
        id: 0,
        firstName: User.name,
        email: User.email,
        age: User.idade,
      };
      this.tableService.addUser(New_User).subscribe({
        next: (resp) => {
          row.get('id')?.setValue(resp.id);
          row.get('isNew')?.setValue(false);
          this.dataSource.data = this.FormArray.value;
        },
        error: (err) => {
          this.FormArray.removeAt(0);
        },
      });

      return;
    }

    const put_User: User = {
      id: User.id,
      firstName: User.name,
      email: User.email,
      age: User.idade,
    };

    this.tableService.editUser(put_User).subscribe((resp) => {
      row.get('onEdit')?.setValue(false);
      this.dataSource.data = this.FormArray.value;
    });
  }

  romoveSelectdsRows() {
    let Ids: number[] = [];

    this.FormArray.value.forEach((item: any) => {
      if (item.checked && item.canEdit) Ids.push(item.id);
    });

    Ids.forEach((id) => {
      this.tableService.deleteUser(id).subscribe({
        next: (resp) => {
          const index = this.getIndex(id);
          this.FormArray.removeAt(index);
          this.dataSource.data = this.FormArray.value;
        },
        error: (err) => {},
      });
    });
    this.checkAll.setValue(false);
  }

  setElement(element: any) {
    if (this.getFormControl(element.id, 'onEdit').value) {
      this.ElementsSelecteds = this.ElementsSelecteds.filter(
        (item) => item != element
      );
      return;
    }

    if (!this.ElementsSelecteds.includes(element)) {
      this.ElementsSelecteds.push(element);
      return;
    }
    this.ElementsSelecteds = this.ElementsSelecteds.filter(
      (item) => item != element
    );
  }

  // getActualIndex(index : number)    {
  //   return index + this.paginator.pageSize * this.paginator.pageIndex;
  // }
}
