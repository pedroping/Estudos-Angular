import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';

import { DataBindingComponent } from './Examples/components/Data-binding/Data-binding.component';
import { StyleClassBidingComponent } from './Examples/components/StyleClassBiding/StyleClassBiding.component';
import { EventBidingComponent } from './Examples/components/EventBiding/EventBiding.component';
import { TwoWayDataBidingComponent } from './Examples/components/TwoWayDataBiding/TwoWayDataBiding.component';
import { MeuPerfilComponent } from './core/MeuPerfil/MeuPerfil.component';
import { HomeComponent } from './Home/Home.component';
import { DynamicTableWithInputsComponent } from './Examples/Dynamic-Table-With-Inputs/Dynamic-Table-With-Inputs.component';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [	
    AppComponent,
    DataBindingComponent,
    StyleClassBidingComponent,
    EventBidingComponent,
    TwoWayDataBidingComponent,
    MeuPerfilComponent,
    HomeComponent,
    DynamicTableWithInputsComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule, 
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    BsDropdownModule.forRoot(),
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatDialogModule,
    MatTableModule,
    HttpClientModule,
    MatInputModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
