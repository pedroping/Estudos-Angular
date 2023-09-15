import {
  Component,
  OnChanges,
  OnInit,
  ViewChild,
  TemplateRef,
  ViewContainerRef,
  AfterViewInit,
  Inject,
} from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, map } from 'rxjs';
import { CofirmeModalComponent } from '../../core/cofirme-modal/cofirme-modal.component';
import {
  COLUMNS_SCHEMA,
  Table_User,
  User,
  UserForm,
  COLUMNS,
} from 'src/app/core/models';
import { TableServiceService } from 'src/app/core/services/tableService.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { DarkModeService } from 'src/app/core/services/darkMode.service';
import { IToken, TABLESERVICE } from 'src/app/core/tokens/tokens';
@Component({
  selector: 'app-Table-With-NgModel',
  templateUrl: './Table-With-NgModel.component.html',
  styleUrls: ['./Table-With-NgModel.component.scss'],
  providers: [{ provide: TABLESERVICE, useClass: TableServiceService }],
})
export class TableWithNgModelComponent
  implements OnInit, OnChanges, AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild('ColunmsTemplate') dialogTemplate!: TemplateRef<any>;

  private overlayRef: OverlayRef[] = [];
  private portal!: TemplatePortal;

  Portals = 2;

  isHighScreen = false;

  dragPosition = { x: 50, y: 50 };

  colunmsCheckbox = new BehaviorSubject<
    {
      formName: string;
      label: string;
    }[]
  >([
    {
      formName: 'id',
      label: 'Id',
    },
    {
      formName: 'name',
      label: 'Nome Completo',
    },
    {
      formName: 'email',
      label: 'Email',
    },
    {
      formName: 'age',
      label: 'Idade',
    },
  ]);

  displayedColumns: string[] = COLUMNS.filter((col) => col.key != 'isEdit').map(
    (col) => col.key
  );
  columnsSchema: COLUMNS_SCHEMA[] = COLUMNS;
  filteredDisplayedColumns = this.displayedColumns;
  filteredColumnsSchema = this.columnsSchema;

  dataSource = new MatTableDataSource<Table_User>([]);
  allSelected = new FormControl(false);
  selectedRow!: Table_User;
  Users$ = this.tableServiceService.getAll().pipe(
    map((resp: any) => {
      return resp.users;
    })
  );

  Colunms = new FormGroup({
    id: new FormControl(true),
    name: new FormControl(true),
    email: new FormControl(true),
    age: new FormControl(true),
  });

  TableForm = new FormGroup({
    TableFromArray: new FormArray([]),
  });
  get TableArray() {
    return this.TableForm.get('TableFromArray') as FormArray;
  }
  filter = new FormControl('');

  constructor(
    public dialog: Dialog,
    @Inject(TABLESERVICE) private readonly tableServiceService: IToken,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    readonly darkModeService: DarkModeService
  ) { }

  ngOnInit() {
    this.createTableData();
    this.allSelected.valueChanges.subscribe((val) => {
      this.setAll(val!);
    });
    this.filter.valueChanges.subscribe((x) => {
      this.dataSource.filter = x ? x.trim().toLocaleLowerCase() : '';
    });

    this.Colunms.valueChanges.subscribe(() => {
      const Form = this.Colunms.value;
      this.filteredDisplayedColumns = this.displayedColumns;

      Object.keys(this.Colunms.value).forEach((key) => {
        if (!Form[key as keyof typeof Form]) {
          this.filteredDisplayedColumns = this.filteredDisplayedColumns.filter(
            (item) => item != key
          );
        }
      });
    });
  }

  setCliente(element: HTMLDivElement) {
    this.isHighScreen = true
    console.log(element.parentElement);
    // element.parentElement!.style.transform = '';
    // element.parentElement!.style.position = 'absolute';
    // element.parentElement!.style.top = '0';
    for (let i = 20; i < 101; i++) {
      element.style.width = `${i}vw`;
      element.style.height = `${i > 98 ? 98 : i}vh`;
    }
    this.fixMoving(element)
  }

  fixMoving(element: HTMLDivElement) {
    if (!this.isHighScreen) return;
    const modalHeight = window.innerHeight * 0.98
    const newY = (window.innerHeight - modalHeight).toFixed(0)
    this.dragPosition = { x: 0, y: -(+newY / 2) - 1 }
    console.log(modalHeight, window.innerHeight, this.dragPosition);
    // element.parentElement!.style.transform = `translate3d(0px, ${-(+newY / 2) - 1}px, 0px)`
    // element.parentElement!.style.position = 'static';
    // element.parentElement!.style.top = '';
  }

  onMove(element: HTMLDivElement) {
    console.log(element.parentElement!.style.transform);

    // element.parentElement!.style.transform = ``
  }

  ngAfterViewInit() {
    for (let i = 0; i < this.Portals; i++) {
      this.overlayRef.push(
        this.overlay.create({
          positionStrategy: this.overlay
            .position()
            .global()
            .centerHorizontally()
            .centerVertically(),
          hasBackdrop: false,
        })
      );
    }
  }

  selectTemplate(Template: TemplateRef<any>, id: number) {
    this.portal = new TemplatePortal(Template, this.viewContainerRef);
    this.overlayRef[id].attach(this.portal);
  }

  handleOrder(order: string[]) {
    if (this.isSomeOnEdit()) {
      this.filteredDisplayedColumns = [
        'isSelected',
        ...order,
        'isEdit',
        'delete',
      ];
      return;
    }
    this.filteredDisplayedColumns = ['isSelected', ...order, 'delete'];
  }

  closeElement(id: number) {
    this.overlayRef[id].detach();
  }

  ngOnChanges() {
    this.dataSource.sort = this.sort!;
  }

  isSomeOnEdit() {
    return this.dataSource.data.some((User) => User.isEdit);
  }

  setForm(User_Row: Table_User) {
    this.filteredDisplayedColumns = COLUMNS.map((col) => col.key);
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
    this.filteredDisplayedColumns = COLUMNS.filter(
      (col) => col.key != 'isEdit'
    ).map((col) => col.key);
    if (User_Row.isNew) {
      const Form = this.getFormGroup(0).value;
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
        (User_Row.name = resp.firstName),
          (User_Row.id = resp.id),
          (User_Row.email = resp.email),
          (User_Row.age = resp.age);
        this.getFormGroup(0).patchValue({
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
      (User_Row.name = resp.firstName),
        (User_Row.id = resp.id),
        (User_Row.email = resp.email),
        (User_Row.age = resp.age);
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
    this.filteredDisplayedColumns = COLUMNS.map((col) => col.key);
    this.filter.setValue('');
    const New_User = {
      id: 0,
      name: '',
      email: '',
      age: null as any,
      isEdit: true,
      isSelected: false,
      isNew: true,
    };

    const newForm = new FormGroup({
      id: new FormControl(0),
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
      .closed.subscribe((resp) => {
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
    this.allSelected.setValue(
      this.TableArray.value.every((User: UserForm) => User.isSelected),
      { emitEvent: false }
    );
  }

  anyIsSelected() {
    return !this.TableArray.value.some((User: UserForm) => User.isSelected);
  }

  getDate(date: string) {
    return new Date(date).toLocaleDateString('pt-BR') != 'Invalid Date'
      ? new Date(date).toLocaleDateString('pt-BR')
      : 'Sem data';
  }

  deleteSelectRow() {
    this.dialog
      .open(CofirmeModalComponent, {
        width: '410px',
        data: {
          title: 'Deletar usuarios selecionados',
          text: 'Você deseja deletar todos os usuarios selecionados ?',
          type: 'manyUsers',
        },
      })
      .closed.subscribe((resp) => {
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
}
