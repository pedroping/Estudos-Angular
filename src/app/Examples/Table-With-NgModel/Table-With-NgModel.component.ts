import { Overlay } from '@angular/cdk/overlay';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  OnChanges,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import {
  MatTableDataSource,
  MatTable,
  MatColumnDef,
  MatHeaderCellDef,
  MatHeaderCell,
  MatCellDef,
  MatCell,
  MatHeaderRowDef,
  MatHeaderRow,
  MatRowDef,
  MatRow,
  MatNoDataRow,
} from '@angular/material/table';
import { BehaviorSubject, fromEvent, map } from 'rxjs';
import {
  COLUMNS,
  COLUMNS_SCHEMA,
  Table_User,
  User,
  UserForm,
} from 'src/app/core/models';
import { DarkModeService } from 'src/app/core/services/darkMode.service';
import { OpenedDialogsService } from 'src/app/core/services/opened-dialogs.service';
import { TableServiceService } from 'src/app/core/services/tableService.service';
import { IToken, TABLESERVICE } from 'src/app/core/tokens/tokens';
import { CofirmeModalComponent } from '../../core/cofirme-modal/cofirme-modal.component';
import {
  MatButton,
  MatIconButton,
  MatMiniFabButton,
} from '@angular/material/button';
import {
  NgIf,
  NgFor,
  NgSwitch,
  NgSwitchCase,
  NgSwitchDefault,
  NgClass,
  NgStyle,
  AsyncPipe,
} from '@angular/common';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormErrorDirective } from '../../core/directives/FormError.directive';
import { CdkContextMenuTrigger, CdkMenu, CdkMenuItem } from '@angular/cdk/menu';
import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { OnResizeDirective } from '../../core/directives/on-resize.directive';
import { NewFolderComponent } from '../../core/componenets/new-folder/new-folder.component';
@Component({
  selector: 'app-Table-With-NgModel',
  templateUrl: './Table-With-NgModel.component.html',
  styleUrls: ['./Table-With-NgModel.component.scss'],
  providers: [{ provide: TABLESERVICE, useClass: TableServiceService }],
  imports: [
    MatButton,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    MatTable,
    MatSort,
    NgFor,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatSortHeader,
    MatCheckbox,
    MatCellDef,
    MatCell,
    NgSwitch,
    NgSwitchCase,
    MatIconButton,
    MatIcon,
    NgSwitchDefault,
    MatFormField,
    MatLabel,
    MatInput,
    MatError,
    FormErrorDirective,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    CdkContextMenuTrigger,
    MatNoDataRow,
    CdkMenu,
    NgClass,
    CdkMenuItem,
    CdkDrag,
    OnResizeDirective,
    CdkDragHandle,
    NewFolderComponent,
    NgStyle,
    MatMiniFabButton,
    AsyncPipe,
  ],
})
export class TableWithNgModelComponent
  implements OnInit, OnChanges, AfterViewInit
{
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('ColunmsTemplate') dialogTemplate!: TemplateRef<any>;
  @ViewChild('element') element?: TemplateRef<unknown>;

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
    (col) => col.key,
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
    }),
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
  lastPosition?: { x: number; y: number };

  constructor(
    @Inject(TABLESERVICE) private readonly tableServiceService: IToken,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    readonly darkModeService: DarkModeService,
    readonly openedDialogsService: OpenedDialogsService,
    private readonly cdr: ChangeDetectorRef,
    private readonly dialog: MatDialog,
  ) {}

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
            (item) => item != key,
          );
        }
      });
    });
  }

  ngAfterViewInit() {
    this.openedDialogsService.setCreators(
      this.overlay,
      this.viewContainerRef,
      this.cdr,
    );
    this.openedDialogsService.openedOverlays$.subscribe(() =>
      this.cdr.detectChanges(),
    );

    this.selectTemplate(this.dialogTemplate, 0);
  }

  setCliente(element: HTMLDivElement, id: number) {
    fromEvent(window, 'resize').subscribe(() => {
      element.style.width = `100vw`;
      element.style.height = `${window.innerHeight - 50}px`;
      console.log('Resize');

      this.fixMoving(id);
    });

    // const config = { attributes: true, childList: true, subtree: true };
    // new MutationObserver((a) => {
    //   console.log(element.style.width, element.style.height);
    // }).observe(element, config);

    if (this.isHighScreen) {
      element.style.width = `auto`;
      element.style.height = `auto`;
      this.isHighScreen = !this.isHighScreen;
      return;
    }

    // element.parentElement!.style.transition = 'all 0.5s ease 0.5s';
    this.isHighScreen = !this.isHighScreen;
    this.fixMoving(id);
    element.style.width = `100vw`;
    element.style.height = `${window.innerHeight - 50}px`;
  }

  fixMoving(id: number) {
    const pane =
      this.openedDialogsService.overlayRef[id]['_pane'].firstChild.style;

    const width = +pane.width.replace('px', '');
    const height = +pane.height.replace('px', '');

    const cantMove =
      width >= window.innerWidth && height >= window.innerHeight - 60;

    if (!this.isHighScreen && !cantMove) return;
    this.openedDialogsService.openedOverlays$.value[id].lastPosition = {
      x: 0,
      y: 0,
    };
    this.openedDialogsService.openedOverlays$.value[id].lastPosition = {
      x: 0,
      y: -29,
    };
    // this.openedDialogsService.openedOverlays$.next(openedOverlays)
  }

  setMoving(event: { position: { x: number; y: number }; id: number }) {
    const openedOverlays = this.openedDialogsService.openedOverlays$.value;
    openedOverlays[event.id].lastPosition = event.position;
    this.openedDialogsService.openedOverlays$.next(openedOverlays);
  }

  onMove(element: HTMLDivElement) {
    // console.log('moved');
  }

  log(label: string) {
    console.log('Esse evento aqui rolou:', label);
  }

  selectTemplate(Template: TemplateRef<any>, id: number) {
    this.openedDialogsService.openOverlay(Template, id);
    const pane = this.openedDialogsService.overlayRef[id]['_pane'];
    this.isHighScreen = false;
  }

  closeElement(id: number) {
    this.openedDialogsService.closeOverlay(id, false);
  }

  minimazeElement(id: number) {
    this.openedDialogsService.closeOverlay(id, true);
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
      (item) => item.value.id == id,
    );
    return Control!.get(key) as FormControl;
  }

  getFormGroup(id: number) {
    const Control = this.TableArray.controls.find(
      (item) => item.value.id == id,
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
      (col) => col.key != 'isEdit',
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
              new FormControl(Value, Validators.required),
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
      .afterClosed()
      .subscribe((resp) => {
        if (!resp) return;

        this.tableServiceService.deleteUser(User_Row.id).subscribe({
          next: (value) => {
            this.TableArray.removeAt(this.findIndex(User_Row.id));
            this.dataSource.data = this.dataSource.data.filter(
              (User) => User.id != User_Row.id,
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
      { emitEvent: false },
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
              (User) => !this.getFormControl(User.id, 'isSelected').value,
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
