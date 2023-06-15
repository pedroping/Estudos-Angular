import { DataSource } from '@angular/cdk/collections';
import {
  Component,
  Injectable,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, Observable, startWith } from 'rxjs';
import { COLORS, NAMES } from 'src/app/core/models';
import { TableInlineComponent } from './table-inline/table-inline.component';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';

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
})
export class CdkTableExampleComponent implements OnInit {
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
  tablelength: number;
  actualPaginator: PageEvent = { pageIndex: 0, pageSize: 10, length: 100 };
  expandedRow: number[] = [];

  constValue = 0;

  DataSource = new BehaviorSubject<AbstractControl[]>([]);

  constructor() {
    this.DataSource.next(this.exampleDatabase.TableFromArray.controls);
    this.tablelength = this.exampleDatabase.data.length;
  }

  ngOnInit() {
    this.handlePageEvent(this.actualPaginator);
    this.exampleDatabase.TableFromArray.valueChanges
      .pipe(startWith(this.exampleDatabase.TableFromArray.value))
      .subscribe((controlsValue: UserData[]) => {
        this.constValue = controlsValue.reduce((a, b) => {
          return a + Number(b.valor);
        }, 0);
      });
  }

  handlePageEvent(e: PageEvent) {
    this.tablelength = this.exampleDatabase.TableFromArray.length;
    this.actualPaginator = e;
    this.containers?.toArray().forEach((element) => element.clear());
    this.expandedRow = [];
    const CopiedData = this.exampleDatabase.DefaultData;
    const index = e.pageIndex * e.pageSize;

    if(this.paginator){
      this.paginator!.pageIndex = this.actualPaginator.pageIndex
    }
    
    this.DataSource.next(CopiedData.slice(index, index + e.pageSize));
  }

  getActualIndex(index: number) {
    return (
      index + this.actualPaginator.pageSize * this.actualPaginator.pageIndex
    );
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
  }

  removeElement(index: number) {
    if (this.containers.toArray()[index]) {
      this.containers.toArray()[index]?.clear();
      this.expandedRow = this.expandedRow.filter((x) => x != index);
    }

    this.exampleDatabase.TableFromArray.removeAt(this.getActualIndex(index));
    this.exampleDatabase.dataChange.next(
      this.exampleDatabase.TableFromArray.controls
    );
    this.tablelength = this.exampleDatabase.data.length;
    console.log(this.actualPaginator);

    this.actualPaginator.pageIndex = 0;
    this.actualPaginator.previousPageIndex = null as any;

    console.log(this.paginator);
    
    this.handlePageEvent(this.actualPaginator);
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
