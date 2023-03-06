import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { firstValueFrom, map } from 'rxjs';
import { CofirmeModalComponent } from './cofirme-modal/cofirme-modal.component';
import { User } from './models';
import { TableServiceService } from 'src/app/core/Table_Service/tableService.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface COLUMNS_SCHEMA {
  key: string,
  type: string,
  label: string,
  inputLabel?: string
}

export interface Table_User {
  id: number,
  name: string, 
  email: string,
  age: number,
  isEdit: boolean,
  dateOfBirth: string,
  isSelected: boolean,
  isNew: boolean
}

const COLUMNS_SCHEMA: COLUMNS_SCHEMA[] = [
  {
    key: "isSelected",
    type: "isSelected",
    label: ""
  },
  {
    key: "name",
    type: "text",
    label: "Nome Completo",
    inputLabel: "Insira seu nome"
  },
  {
    key: "email",
    type: "email",
    label: "Email",
    inputLabel: "Insira seu Email"
  },
  {
    key: "age",
    type: "number",
    label: "Idade",
    inputLabel: "Insira sua idade"
  },
  // {
  //   key: "dateOfBirth",
  //   type: "date",
  //   label: "Data de Nascimento",
  //   inputLabel: "Selecione uma data"
  // },
  {
    key: "isEdit",
    type: "isEdit",
    label: "Editar"
  },
  {
    key: "delete",
    type: "delete",
    label: "Excluir"
  }
]

@Component({
  selector: 'app-Table-With-NgModel',
  templateUrl: './Table-With-NgModel.component.html',
  styleUrls: ['./Table-With-NgModel.component.scss']
})
export class TableWithNgModelComponent implements OnInit {

  displayedColumns: string[] = COLUMNS_SCHEMA.map((col) => col.key);
  dataSource = new MatTableDataSource<Table_User>();
  columnsSchema: COLUMNS_SCHEMA[] = COLUMNS_SCHEMA;
  allSelected: boolean = false
  Users$ = this.tableServiceService.getAll().pipe(map((resp: any) => {
    return resp.users
  }))
  
  EditeFormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    age: new FormControl(null as any, Validators.required),
    dateOfBirth: new FormControl(null as any)
  })
  
  constructor(
    public dialog: MatDialog,
    private tableServiceService : TableServiceService
  ) { }

  ngOnInit() {
    this.createTableData()
  }

  isSomeOnEdit(){
    return this.dataSource.data.some(User => User.isEdit)
  }

  setForm(User_Row: Table_User){
    this.EditeFormGroup.patchValue({
      name: User_Row.name,
      email: User_Row.email,
      age: User_Row.age,
      dateOfBirth: new Date(User_Row.dateOfBirth).toLocaleDateString('pt-BR')
    })

    User_Row.isEdit = true
  }

  setUser(User_Row: Table_User){
    const Form = this.EditeFormGroup.value
    User_Row.name = Form.name!
    User_Row.age = Form.age
    User_Row.email = Form.email!
    User_Row.dateOfBirth = Form.dateOfBirth
  }
  
  validRow(User_Row: Table_User){
    if(
      User_Row.name && User_Row.name != "" &&
      User_Row.email && User_Row.email != "" && User_Row.email.includes('@') &&
      User_Row.age &&
      User_Row.dateOfBirth
    )
      return false

    return true
  }

  handleDone(User_Row: Table_User){
    const Form = this.EditeFormGroup.value
    
    if(User_Row.isNew){
      const New_User: User = {
        id: 0,
        firstName: Form.name!,
        email: Form.email!,
        birthDate: Form.dateOfBirth,
        age: Form.age,
      }
      this.tableServiceService.addUser(New_User).subscribe(resp => {
        User_Row.id = resp.id;
        User_Row.isEdit = false;
        User_Row.isNew = false
      })
      this.setUser(User_Row)
      this.EditeFormGroup.reset()
      return
    }

    const put_User: User = {
      id: User_Row.id,
      firstName: Form.name!,
      email: Form.email!,
      birthDate: Form.dateOfBirth,
      age: Form.age,
    }

    this.tableServiceService.editUser(put_User).subscribe(resp => {
      this.setUser(User_Row)
      this.EditeFormGroup.reset()
      User_Row.isEdit = false;
    })
  
  }

  createTableData(){
    this.Users$.subscribe(Users => {
      this.dataSource.data = Users.map((User: User) => {
        return {
          id: User.id,
          name: User.firstName, 
          email: User.email, 
          age: User.age, 
          isEdit: false, 
          dateOfBirth: 
            new Date(User.birthDate!).toLocaleDateString('pr-BR') != 'Invalid Date' 
              ? new Date(User.birthDate!).toLocaleDateString('pr-BR')
              : new Date().toLocaleDateString('pr-BR'),
          isSelected: false,
          isNew: false
        }
      })
    })
  }

  addRow(){
    const New_User = {
      id: null as any,
      name: "", 
      email: "", 
      age: null as any, 
      isEdit: true, 
      dateOfBirth: "",
      isSelected: false,
      isNew: true
    }
    this.dataSource.data = ([New_User, ...this.dataSource.data])
  }

  deleteRow(User_Row: Table_User){
    let users: Table_User[] = this.dataSource.data

    this.dialog.open(CofirmeModalComponent, {
      width: 'auto',
      data: {
        title: "Deletar um usuario",
        user: User_Row,
        type: 'oneUser'
      }
    }).afterClosed().subscribe(resp => {
      if(!resp) return
      
      this.tableServiceService.deleteUser(User_Row.id).subscribe({
        next: (value) => {
          this.dataSource.data = this.dataSource.data.filter(User => User.id != User_Row.id)
        },
        error: (err) => {
          console.log("Error");
        },
      })

    })

    
  }

  setAll(event: MatCheckboxChange){
    let users: Table_User[] = this.dataSource.data
    if(event.checked){
      this.dataSource.data.forEach((x, index) => {
        users[index].isSelected = true
      })
      this.dataSource.data = users
      return
    }

    this.dataSource.data.forEach((x, index) => {
      users[index].isSelected = false
    })
    this.dataSource.data = users
  }

  checkAll(){
    this.allSelected = this.dataSource.data.every((x: Table_User) => x.isSelected)
  }

  anyIsSelected(){
    let disable: boolean = true

    this.dataSource.data.forEach((x: Table_User) => {
      if(x.isSelected) disable = false
    })

    return disable
  }

  getDate(date: string){
    return new Date(date).toLocaleDateString('pt-BR') != 'Invalid Date' ? new Date(date).toLocaleDateString('pt-BR') : "Sem data"
  }

  deleteSelectRow(){

    this.dialog.open(CofirmeModalComponent, {
      width: 'auto',
      data: {
        title: "Deletar usuarios selecionados",
        text: "Você deseja deletar todos os usuarios selecionados ?",
        type: "manyUsers"
      }
    }).afterClosed().subscribe(resp => {
      if(!resp) return

      let ids: number[] = []

      this.dataSource.data.forEach((x: Table_User, index) => {
        if(x.isSelected) ids.push(x.id)
      })

      this.tableServiceService.deleteManyUsers(ids).subscribe({
        next: (value) => {
          this.dataSource.data = this.dataSource.data.filter(User => !User.isSelected)
        },
        error: (err) => {
          console.log("Error");
        },
      })

    })
    
  }

}
