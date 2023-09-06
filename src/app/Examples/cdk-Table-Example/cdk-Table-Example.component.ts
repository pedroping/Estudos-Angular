import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Injectable,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import {
  BehaviorSubject,
  Observable,
  pairwise,
  pipe,
  startWith,
  tap,
} from 'rxjs';
import { COLORS, NAMES } from 'src/app/core/models';
import { TableInlineComponent } from './table-inline/table-inline.component';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
  valor: string;
}

@Component({
  selector: 'app-cdk-Table-Example',
  templateUrl: './cdk-Table-Example.component.html',
  styleUrls: ['./cdk-Table-Example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CdkTableExampleComponent implements OnInit, AfterViewInit {
  @ViewChildren('row', { read: ViewContainerRef })
  containers!: QueryList<ViewContainerRef>;

  @ViewChild('paginator') paginator?: MatPaginator;

  displayedColumns = [
    'userId',
    'userName',
    'progress',
    'color',
    'valor',
    'excluir',
  ];
  exampleDatabase = inject(ExampleDatabase);
  expandedRow: number[] = [];
  constValue = 0;
  DataSource = new MatTableDataSource<AbstractControl>([]);
  controls: { [key: string]: (AbstractControl | FormControl)[] } = {
    name: [],
    progress: [],
    color: [],
    valor: [],
    newIncrementor: []
  }

  constructor(
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.DataSource.data = this.exampleDatabase.TableFromArray.controls;
  }

  ngOnInit() {
    this.setCount();
  }

  ngAfterViewInit() {
    this.DataSource.paginator = this.paginator!;
  }

  handlePageEvent(e: PageEvent) {
    console.log(e);
  }

  getActualIndex(index: number) {
    return index + this.paginator!.pageSize * this.paginator!.pageIndex;
  }

  expandRow(index: number) {
    const controlIndex = this.getActualIndex(index);
    if (this.expandedRow.indexOf(index) > -1) {
      this.containers.toArray()[index]?.clear();
      this.expandedRow = this.expandedRow.filter((x) => x != index);
      return;
    }
    this.expandedRow.push(index);
    const messageComponent = this.containers
      .toArray()
    [index]?.createComponent(TableInlineComponent);

    const Control = this.exampleDatabase.dataChange.value;

    messageComponent.instance.userForm = Control[controlIndex] as FormGroup;
    messageComponent.instance.sideEffectFunction =
      this.sideEffectFunction.bind(this);
    messageComponent.instance.controls = this.controls
  }

  removeElement(index: number) {
    if (this.containers.toArray()[index]) {
      this.containers.toArray()[index]?.clear();
      this.expandedRow = this.expandedRow.filter((x) => x != index);
    }
    const nome =
      this.exampleDatabase.TableFromArray.controls[this.getActualIndex(index)]
        .value.name;
    this.exampleDatabase.TableFromArray.removeAt(this.getActualIndex(index));
    this.exampleDatabase.dataChange.next(
      this.exampleDatabase.TableFromArray.controls
    );
    this.DataSource.data = this.exampleDatabase.TableFromArray.controls;

    this.alerts
      .open(`Usuario <strong>${nome}</strong> removido com sucesso!`, {
        status: TuiNotification.Success,
        hasCloseButton: true,
      })
      .subscribe();
  }

  sideEffectFunction(
    formValueChanges$: Observable<unknown>,
    key: string,
    element: unknown & { id: number }
  ) {
    return formValueChanges$.pipe(
      startWith(element[key as keyof typeof element]),
      tap(() => {
        console.log(key + ' Form Has Changed', this.getControl(element.id, key));
      }),
      this.changeCount(key, element.id)
    );
  }

  changeCount(key: string, id: number) {
    if (key != 'newIncrementor') return pipe(tap());

    return pipe(
      pairwise(),
      tap(([prev, curr]) => {
        if (
          (typeof prev == 'number' || typeof prev == 'string') &&
          typeof curr == 'number'
        ) {
          this.DataSource.data[+id - 1]
            .get('valor')
            ?.setValue(+curr, { emitEvent: false });
          this.constValue = this.constValue + curr - +prev;
          this.cdr.detectChanges();
        }
      })
    );
  }

  setCount() {
    this.constValue = this.DataSource.data.reduce((a, b) => {
      return a + Number(b.value.valor);
    }, 0);
  }

  getControl(id: number, key: string) {
    return this.controls[key] ? this.controls[key][id] : null
  }
}

@Injectable({
  providedIn: 'root',
})
export class ExampleDatabase {
  TableForm = new FormGroup({
    TableFromArray: new FormArray([]),
  });

  get TableFromArray() {
    return this.TableForm.get('TableFromArray') as FormArray;
  }
  dataChange: BehaviorSubject<AbstractControl[]> = new BehaviorSubject<
    AbstractControl[]
  >([]);
  DefaultData: AbstractControl[] = [];

  get data(): AbstractControl[] {
    return this.dataChange.value ?? [];
  }

  constructor() {
    for (let i = 0; i < 100; i++) {
      this.addUser();
    }
  }

  addUser() {
    const newUser = this.createNewUser();
    const newForm = new FormGroup({
      id: new FormControl(newUser.id),
      name: new FormControl(newUser.name),
      progress: new FormControl(newUser.progress),
      color: new FormControl(newUser.color),
      valor: new FormControl(newUser.id),
    });
    this.TableFromArray.push(newForm);
    this.DefaultData = this.TableFromArray.controls;
    this.dataChange.next(this.TableFromArray.controls);
  }

  public createNewUser() {
    const name =
      NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
      ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
      '.';

    return {
      id: (this.data.length + 1).toString(),
      name: name,
      progress: Math.round(Math.random() * 100).toString(),
      color: COLORS[Math.round(Math.random() * (COLORS.length - 1))],
    };
  }
}
