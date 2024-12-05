import { CdkAccordionModule } from '@angular/cdk/accordion';
import { DialogModule } from '@angular/cdk/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkMenuModule } from '@angular/cdk/menu';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkTableModule } from '@angular/cdk/table';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { NgModule, isDevMode } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TuiActiveZone } from '@taiga-ui/cdk/directives/active-zone';
import { TuiHovered } from '@taiga-ui/cdk/directives/hovered';
import { TuiObscured } from '@taiga-ui/cdk/directives/obscured';
import {
  TuiAlert,
  TuiButton,
  TuiCalendar,
  TuiDialog,
  TuiError,
  TuiFlagPipe,
  TuiFormatDatePipe,
  TuiFormatNumberPipe,
  TuiGroup,
  TuiIcon,
  TuiLabel,
  TuiLink,
  TuiLoader,
  TuiMonthPipe,
  TuiNotification,
  TuiRoot,
  TuiScrollbar,
  TuiSurface
} from '@taiga-ui/core';
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CofirmeModalComponent } from './core/cofirme-modal/cofirme-modal.component';
import { AccordionComponent } from './core/componenets/accordion/accordion.component';
import { ClosedSidenavComponent } from './core/componenets/closed-sidenav/closed-sidenav.component';
import { ColunasComponent } from './core/componenets/colunas/colunas.component';
import { IncrementorComponent } from './core/componenets/incrementor/incrementor.component';
import { LoaderComponent } from './core/componenets/loader/loader.component';
import { NewFolderComponent } from './core/componenets/new-folder/new-folder.component';
import { ExpandedRowDirective } from './core/directives/expand-row.directive';
import { FormErrorDirective } from './core/directives/FormError.directive';
import { OnResizeDirective } from './core/directives/on-resize.directive';
import { OnRouteDirective } from './core/directives/onRoute.directive';
import { PasswordDirective } from './core/directives/password.directive';
import { TableFormBuilderDirective } from './core/directives/table-form-builder.directive';
import { DFormsModule } from './core/dynamic-forms/dForms.module';
import { AlreadyLoggedGuardService } from './core/guards/alreadyLoggedGuard.service';
import { AuthGuardService } from './core/guards/secretGuard.service';
import { LoaderInterceptor } from './core/interceptors/loader.interceptor';
import { CdkTableExampleComponent } from './Examples/cdk-Table-Example/cdk-Table-Example.component';
import { TableInlineComponent } from './Examples/cdk-Table-Example/table-inline/table-inline.component';
import { CdkDragdropComponent } from './Examples/cdkDrag&Drop/cdkDrag&drop.component';
import { CdkDragdropModule } from './Examples/cdkDrag&Drop/cdkDrag&drop.module';
import { PhotosDetailsComponent } from './Examples/cdkDrag&Drop/photosDetails/photosDetails.component';
import { PhotosSideBarComponent } from './Examples/cdkDrag&Drop/photosSideBar/photosSideBar.component';
import { UserDetailsComponent } from './Examples/cdkDrag&Drop/userDetails/userDetails.component';
import { UserSideBarComponent } from './Examples/cdkDrag&Drop/userSideBar/userSideBar.component';
import { DataBindingComponent } from './Examples/components/Data-binding/Data-binding.component';
import { EventBidingComponent } from './Examples/components/EventBiding/EventBiding.component';
import { StyleClassBidingComponent } from './Examples/components/StyleClassBiding/StyleClassBiding.component';
import { TwoWayDataBidingComponent } from './Examples/components/TwoWayDataBiding/TwoWayDataBiding.component';
import { DynamicTableWithInputsComponent } from './Examples/Dynamic-Table-With-Inputs/Dynamic-Table-With-Inputs.component';
import { FormExampleComponent } from './Examples/formExample/formExample.component';
import { LoginPageComponent } from './Examples/loginPage/loginPage.component';
import { TableWithNgModelComponent } from './Examples/Table-With-NgModel/Table-With-NgModel.component';
import { HomeComponent } from './Home/Home.component';
@NgModule({
  declarations: [
    AppComponent,
    DataBindingComponent,
    StyleClassBidingComponent,
    EventBidingComponent,
    TwoWayDataBidingComponent,
    HomeComponent,
    DynamicTableWithInputsComponent,
    TableWithNgModelComponent,
    CofirmeModalComponent,
    LoginPageComponent,
    PasswordDirective,
    LoaderComponent,
    ClosedSidenavComponent,
    AccordionComponent,
    ColunasComponent,
    FormErrorDirective,
    CdkTableExampleComponent,
    TableInlineComponent,
    CdkDragdropComponent,
    UserSideBarComponent,
    PhotosDetailsComponent,
    PhotosSideBarComponent,
    UserDetailsComponent,
    ExpandedRowDirective,
    IncrementorComponent,
    FormExampleComponent,
    OnRouteDirective,
    TableFormBuilderDirective,
    NewFolderComponent,
    OnResizeDirective,
  ],
  imports: [
    MatToolbarModule,
    CdkAccordionModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule,
    RouterModule.forRoot([]),
    TuiActiveZone,
    TuiHovered,
    TuiObscured,
    TuiAlert,
    TuiButton,
    TuiCalendar,
    TuiDialog,
    TuiError,
    TuiFlagPipe,
    TuiFormatDatePipe,
    TuiFormatNumberPipe,
    TuiGroup,
    TuiLabel,
    TuiLink,
    TuiLoader,
    TuiMonthPipe,
    TuiNotification,
    TuiRoot,
    TuiScrollbar,
    TuiIcon,
    TuiSurface,
    TuiLabel,
    TuiLabel,
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatTableModule,
    MatInputModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSortModule,
    MatTooltipModule,
    MatPaginatorModule,
    DragDropModule,
    CdkTableModule,
    CdkDragdropModule,
    DFormsModule,
    DialogModule,
    TuiRoot,
    TuiAlert,
    CdkMenuModule,
    MatProgressSpinnerModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [
    provideHttpClient(),
    AuthGuardService,
    AlreadyLoggedGuardService,
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
  ],
  exports: [IncrementorComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
