import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs';
import { CofirmeModalComponent } from '../../core/cofirme-modal/cofirme-modal.component';
import { User } from 'src/app/core/models';
import { TableServiceService } from 'src/app/core/services/tableService.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';

export interface COLUMNS_SCHEMA {
  key: string;
  type: string;
  label: string;
  inputLabel?: string;
  cantEdit?: boolean;
  cell?: any;
  hasSort?: boolean;
  hasControl?: boolean;
}

export interface Table_User {
  id: number;
  name: string;
  email: string;
  age: number;
  isEdit: boolean;
  isSelected: boolean;
  isNew: boolean;
}

export interface UserForm {
  id: number;
  name: string;
  age: number;
  email: string;
  isSelected: boolean;
}

const COLUMNS_SCHEMA: COLUMNS_SCHEMA[] = [
  {
    key: 'isSelected',
    type: 'isSelected',
    label: '',
    hasControl: true,
  },
  {
    key: 'id',
    type: 'id',
    label: 'Id',
    cantEdit: true,
    cell: (element: Table_User) => `${element.id}`,
    hasSort: true,
    hasControl: true,
  },
  {
    key: 'name',
    type: 'text',
    label: 'Nome Completo',
    inputLabel: 'Insira seu nome',
    cell: (element: Table_User) => `${element.name}`,
    hasSort: true,
    hasControl: true,
  },
  {
    key: 'email',
    type: 'email',
    label: 'Email',
    inputLabel: 'Insira seu Email',
    cell: (element: Table_User) => `${element.email}`,
    hasControl: true,
  },
  {
    key: 'age',
    type: 'number',
    label: 'Idade',
    inputLabel: 'Insira sua idade',
    cell: (element: Table_User) => `${element.age}`,
    hasControl: true,
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: 'Editar',
  },
  {
    key: 'delete',
    type: 'delete',
    label: 'Excluir',
  },
];

@Component({
  selector: 'app-Table-With-NgModel',
  templateUrl: './Table-With-NgModel.component.html',
  styleUrls: ['./Table-With-NgModel.component.scss'],
})
export class TableWithNgModelComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = COLUMNS_SCHEMA.map((col) => col.key);
  dataSource = new MatTableDataSource<Table_User>([]);
  columnsSchema: COLUMNS_SCHEMA[] = COLUMNS_SCHEMA;
  allSelected = new FormControl(false);
  Users$ = this.tableServiceService.getAll().pipe(
    map((resp: any) => {
      return resp.users;
    })
  );

  @ViewChild(MatSort) sort!: MatSort;

  TableForm = new FormGroup({
    TableFromArray: new FormArray([]),
  });
  get TableArray() {
    return this.TableForm.get('TableFromArray') as FormArray;
  }
  filter = new FormControl('')
  constructor(
    public dialog: MatDialog,
    private tableServiceService: TableServiceService
  ) {}

  ngOnInit() {
    this.createTableData();
    this.allSelected.valueChanges.subscribe((val) => {this.setAll(val!)})
    this.filter.valueChanges.subscribe(x => {
      this.setAll(false)
      this.dataSource.data = this.TableArray.value
      this.dataSource.filter = x ? x.trim().toLocaleLowerCase() : '' 
    })
  }

  isSomeOnEdit() {
    return this.dataSource.data.some((User) => User.isEdit);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  setForm(User_Row: Table_User) {
    User_Row.isEdit = true;
  }

  getFormControl(id: number, key: string) {
    const Control = this.TableArray.controls.find(
      (item) => item.value.id == id
    );
    return Control!.get(key) as FormControl;
  }

  getFormGroup(id: number) {
    const Control = this.TableArray.controls.find(
      (item) => item.value.id == id
    );
    return Control! as FormGroup;
  }

  findIndex(id: number) {
    var Formindex!: number;
    this.TableArray.controls.find((item, index) => {
      if (item.value.id == id) Formindex = index;
    });

    return Formindex;
  }

  handleDone(User_Row: Table_User) {
    if (User_Row.isNew) {
      const Form = this.getFormGroup(-1).value;
      const New_User: User = {
        id: 0,
        firstName: Form.name!,
        email: Form.email!,
        age: Form.age,
      };
      this.tableServiceService.addUser(New_User).subscribe((resp) => {
        User_Row.id = resp.id;
        User_Row.isEdit = false;
        User_Row.isNew = false;
        User_Row.name = resp.firstName,
        User_Row.id = resp.id,
        User_Row.email = resp.email,
        User_Row.age = resp.age;
        this.getFormGroup(-1).patchValue({
          name: resp.firstName,
          id: resp.id,
          email: resp.email,
          age: resp.age,
        });
      });
      return;
    }

    const Form = this.getFormGroup(User_Row.id).value;

    const put_User: User = {
      id: User_Row.id,
      firstName: Form.name!,
      email: Form.email!,
      age: Form.age,
    };

    this.tableServiceService.editUser(put_User).subscribe((resp) => {
      User_Row.isEdit = false;
      User_Row.name = resp.firstName,
      User_Row.id = resp.id,
      User_Row.email = resp.email,
      User_Row.age = resp.age;
    });
  }

  createTableData() {
    this.Users$.subscribe((Users) => {
      this.dataSource.data = Users.map((User: User) => {
        return {
          id: User.id,
          name: User.firstName,
          email: User.email,
          age: User.age,
          isEdit: false,
          isSelected: false,
          isNew: false,
        };
      });
      this.dataSource.data.forEach((User) => {
        const newForm = new FormGroup({});
        this.columnsSchema.forEach((schema) => {
          if (schema.hasControl) {
            const Value = User[schema.key as keyof typeof User];
            newForm.addControl(
              schema.key,
              new FormControl(Value, Validators.required)
            );
            if (schema.key == 'email')
              newForm.get(schema.key)?.addValidators(Validators.email);
            if (schema.key == 'id')
              newForm.get(schema.key)?.removeValidators(Validators.required);
          }
        });
        this.TableArray.push(newForm);
      });
    });
  }

  addRow() {
    const New_User = {
      id: -1,
      name: '',
      email: '',
      age: null as any,
      isEdit: true,
      isSelected: false,
      isNew: true,
    };

    const newForm = new FormGroup({
      id: new FormControl(-1),
      name: new FormControl('', Validators.required),
      age: new FormControl(null as any, Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      isSelected: new FormControl(false),
    });

    this.TableArray.push(newForm);

    this.dataSource.data = [New_User, ...this.dataSource.data];
  }

  deleteRow(User_Row: Table_User) {
    this.dialog
      .open(CofirmeModalComponent, {
        width: 'auto',
        data: {
          title: 'Deletar um usuario',
          user: User_Row,
          type: 'oneUser',
        },
      })
      .afterClosed()
      .subscribe((resp) => {
        if (!resp) return;

        this.tableServiceService.deleteUser(User_Row.id).subscribe({
          next: (value) => {
            this.TableArray.removeAt(this.findIndex(User_Row.id));
            this.dataSource.data = this.dataSource.data.filter(
              (User) => User.id != User_Row.id
            );
          },
          error: (err) => {
            console.log('Error');
          },
        });
      });
  }

  setAll(val: boolean) {
    this.TableArray.controls.forEach((control) => {
      control.get('isSelected')?.setValue(val);
    });
  }

  checkAll() {
    this.allSelected.setValue(this.TableArray.value.every((User:UserForm) => User.isSelected), {emitEvent: false});
  }

  anyIsSelected() {
    return !this.TableArray.value.some((User:UserForm) => User.isSelected)
  }

  getDate(date: string) {
    return new Date(date).toLocaleDateString('pt-BR') != 'Invalid Date'
      ? new Date(date).toLocaleDateString('pt-BR')
      : 'Sem data';
  }

  deleteSelectRow() {
    this.dialog
      .open(CofirmeModalComponent, {
        width: 'auto',
        data: {
          title: 'Deletar usuarios selecionados',
          text: 'Você deseja deletar todos os usuarios selecionados ?',
          type: 'manyUsers',
        },
      })
      .afterClosed()
      .subscribe((resp) => {
        if (!resp) return;

        let ids: number[] = [];

        this.TableArray.value.forEach((x: Table_User) => {
          if (x.isSelected) ids.push(x.id);
        });

        this.tableServiceService.deleteManyUsers(ids).subscribe({
          next: (value) => {
            this.dataSource.data = this.dataSource.data.filter(
              (User) => !this.getFormControl(User.id, 'isSelected').value
              );
            ids.forEach((id) => this.TableArray.removeAt(this.findIndex(id)));
            this.allSelected.setValue(false);
          },
          error: (err) => {
            console.log('Error');
          },
        });
      });
  }

  getErrorMessage(key: string, id: number) {
    if (this.getFormControl(id, key).hasError('required')) {
      return 'Por favor insira um valor!';
    }

    return this.getFormControl(id, key).hasError('email')
      ? 'Email Invalido'
      : '';
  }
}
