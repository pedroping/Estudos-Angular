import { DataSource } from '@angular/cdk/collections';
import {
  Component,
  OnInit,
  QueryList,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, Observable } from 'rxjs';
import { COLORS, NAMES } from 'src/app/core/models';
import { TableInlineComponent } from './table-inline/table-inline.component';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

@Component({
  selector: 'app-cdk-Table-Example',
  templateUrl: './cdk-Table-Example.component.html',
  styleUrls: ['./cdk-Table-Example.component.scss'],
})
export class CdkTableExampleComponent implements OnInit {
  @ViewChildren('row', { read: ViewContainerRef })
  containers!: QueryList<ViewContainerRef>;

  displayedColumns = ['userId', 'userName', 'progress', 'color'];
  exampleDatabase = new ExampleDatabase();
  dataSource!: ExampleDataSource | null;
  tablelength: number;
  expandedRow: number[] = [];

  constructor() {
    this.dataSource = new ExampleDataSource(this.exampleDatabase);
    this.tablelength = this.exampleDatabase.data.length;
  }

  ngOnInit() {
    this.handlePageEvent({ pageIndex: 0, pageSize: 10, length: 100 });
  }

  handlePageEvent(e: PageEvent) {
    this.containers?.toArray().forEach((element) => element.clear());
    this.expandedRow = [];
    const CopiedData = this.exampleDatabase.DefaultData;
    const index = e.pageIndex * e.pageSize;
    this.exampleDatabase.dataChange.next(
      CopiedData.slice(index, index + e.pageSize)
    );
  }

  expandRow(index: number) {
    if (this.expandedRow.indexOf(index) > -1) {
      this.containers.toArray()[index]?.clear();
      this.expandedRow = this.expandedRow.filter((x) => x != index);
      return;
    }
    this.expandedRow.push(index);
    const messageComponent = this.containers
      .toArray()
      [index]?.createComponent(TableInlineComponent);
    messageComponent.instance.user = this.exampleDatabase.data[index].name;
  }
}

export class ExampleDatabase {
  dataChange: BehaviorSubject<UserData[]> = new BehaviorSubject<UserData[]>([]);
  DefaultData: UserData[] = [];
  get data(): UserData[] {
    return this.dataChange.value;
  }

  constructor() {
    for (let i = 0; i < 100; i++) {
      this.addUser();
    }
  }

  addUser() {
    const copiedData = this.data.slice();
    copiedData.push(this.createNewUser());
    this.DefaultData = copiedData;
    this.dataChange.next(copiedData);
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

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class ExampleDataSource extends DataSource<any> {
  constructor(private _exampleDatabase: ExampleDatabase) {
    super();
  }
  connect(): Observable<UserData[]> {
    return this._exampleDatabase.dataChange;
  }
  disconnect() {}
}
