import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AbstractFormGroupDirective, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableServiceService } from 'src/app/core/Table_Service/tableService.service';
import { User } from 'src/app/core/models';
import { ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject, Subscription, Observable, Subject, of, take } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export interface FormValue {
  checked: boolean,
  id: number,
  nome: string
  idade: number,
  email: string
  isNew: boolean,
  onEdit: boolean
}

@Component({
  selector: 'app-Dynamic-Table-With-Inputs',
  templateUrl: './Dynamic-Table-With-Inputs.component.html',
  styleUrls: ['./Dynamic-Table-With-Inputs.component.scss']
})
export class DynamicTableWithInputsComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ["checkBox", "id", "nome", "idade", "email", "editField", "excluir"];
  dataSource = new MatTableDataSource();
  
  checkAll = new FormControl(false)

  TableForm = new FormGroup({
    Array: new FormArray([])
  })

  constructor(
    private readonly tableService : TableServiceService,
    private readonly changeDetectorRef : ChangeDetectorRef
    ) { }

  ngOnInit() {
    this.getAllUser()    
  }

  getAllUser() {
    this.tableService.getAll().subscribe(resp => {    
      resp.users.forEach((item: User) => {
        const FormGrupo = new FormGroup({
          checked: new FormControl(false),
          id: new FormControl(item.id),
          nome: new FormControl(item.firstName, Validators.required),
          idade: new FormControl(item.age, Validators.required),
          email: new FormControl(item.email, [Validators.required, Validators.email]),
          onEdit: new FormControl(false),
          isNew: new FormControl(false)
        })
        this.FormArray.push(FormGrupo)
      })
      this.dataSource.data = this.FormArray.value
    })  
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
  }
  
  getOcuupation(sexo: string){
    return sexo ? ( sexo == "M" ? "Masculino" : "Feminino") : "Não Definido"
  }

  get FormArray(){
    return this.TableForm.get('Array') as FormArray
  }

  addnewStaticrow(){
    this.addRow()
  }

  checkSomeField(){
    const All_Select = this.FormArray.controls.every(control => control.get('checked')?.value)
    if(All_Select){
      this.checkAll.setValue(true)
    }else{
      this.checkAll.setValue(false)
    }
  }

  checkAllFields(){
    this.FormArray.controls.forEach(control => {
      control.get('checked')?.setValue(this.checkAll.value)
    })
  }

  getControl(row: any){
    let Control!: FormGroup
    this.FormArray.controls.forEach((item) => {
      if(item.value.id == row.id) 
        Control = item as FormGroup
    })

    return Control as FormGroup
  }
  
  getIndex(index: number){
    let id!: number

    this.FormArray.controls.forEach((item, index) => {
      if(item.get('id')?.value == index) 
        id = index
    })
    
    return id
  }
  
  addRow(){
    const row = new FormGroup({
      checked: new FormControl(false),
      id: new FormControl(null as any),
      nome: new FormControl('', Validators.required),
      idade: new FormControl(null as any, Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      onEdit: new FormControl(true),
      isNew: new FormControl(true)
    })

    this.FormArray.insert(0, row) 
    this.dataSource.data = this.FormArray.value
  }

  deletRow(row: any, index: number){
    if(!row.id){
      this.FormArray.removeAt(index)
      this.dataSource.data = this.FormArray.value
      return
    }
    
    this.tableService.deleteUser(row.id).subscribe({
      next:(resp) => {
        this.FormArray.removeAt(index)
        this.dataSource.data = this.FormArray.value
      }
    })
  }

  someOnEdit(){
    return this.FormArray.value.some((item: FormValue) => item.onEdit)
  }

  setValueControl(row: FormControl, state: boolean){
    row.setValue(state, { emitEvent: false })
  }
  
  handleSave(row: FormGroup, index: number){
   
    const User = row.value
    if(User.isNew){
      const New_User: User = {
        id: 0,
        firstName: User.name,
        email: User.email,
        age: User.idade,
      }
      this.tableService.addUser(New_User).subscribe({
        next: (resp) => {
          row.get('id')?.setValue(resp.id)
          row.get('isNew')?.setValue(false)
          this.dataSource.data = this.FormArray.value
        },
        error: (err) => {
          this.FormArray.removeAt(0)
        },
      })

      return
    }

    const put_User: User = {
      id: User.id,
      firstName: User.name,
      email: User.email,
      age: User.idade,
    }

    this.tableService.editUser(put_User).subscribe(resp => {
      row.get('onEdit')?.setValue(false)
      this.dataSource.data = this.FormArray.value
    })
  }

  romoveSelectdsRows(){
    let Ids: number[] = []

    this.FormArray.value.forEach((item: any) => {
      if(item.checked)
        Ids.push(item.id)
    })
    
    Ids.forEach((id) => {
      this.tableService.deleteUser(id).subscribe({
        next:(resp) => {
          const index = this.getIndex(id)
          this.FormArray.removeAt(index)
          this.dataSource.data = this.FormArray.value
        },
        error:(err) => {
          
        },
      })
    })
  }

  // getActualIndex(index : number)    {
  //   return index + this.paginator.pageSize * this.paginator.pageIndex;
  // }
}
