import { NgModule, isDevMode } from '@angular/core';
import { DataBindingComponent } from './Examples/components/Data-binding/Data-binding.component';
import { StyleClassBidingComponent } from './Examples/components/StyleClassBiding/StyleClassBiding.component';
import { EventBidingComponent } from './Examples/components/EventBiding/EventBiding.component';
import { TwoWayDataBidingComponent } from './Examples/components/TwoWayDataBiding/TwoWayDataBiding.component';
import { HomeComponent } from './Home/Home.component';
import { DynamicTableWithInputsComponent } from './Examples/Dynamic-Table-With-Inputs/Dynamic-Table-With-Inputs.component';
import { TableWithNgModelComponent } from './Examples/Table-With-NgModel/Table-With-NgModel.component';
import { CofirmeModalComponent } from './core/cofirme-modal/cofirme-modal.component';
import { LoginPageComponent } from './Examples/loginPage/loginPage.component';
import { PasswordDirective } from './core/directives/password.directive';
import { AuthGuardService } from './core/guards/secretGuard.service';
import { AlreadyLoggedGuardService } from './core/guards/alreadyLoggedGuard.service';
import { CookieService } from 'ngx-cookie-service';
import { LoaderComponent } from './core/componenets/loader/loader.component';
import { LoaderInterceptor } from './core/interceptors/loader.interceptor';
import { ClosedSidenavComponent } from './core/componenets/closed-sidenav/closed-sidenav.component';
import { AccordionComponent } from './core/componenets/accordion/accordion.component';
import { ColunasComponent } from './core/componenets/colunas/colunas.component';
import { FormErrorDirective } from './core/directives/FormError.directive';
import { CdkTableExampleComponent } from './Examples/cdk-Table-Example/cdk-Table-Example.component';
import { TableInlineComponent } from './Examples/cdk-Table-Example/table-inline/table-inline.component';
import { CdkDragdropComponent } from './Examples/cdkDrag&Drop/cdkDrag&drop.component';
import { UserSideBarComponent } from './Examples/cdkDrag&Drop/userSideBar/userSideBar.component';
import { PhotosDetailsComponent } from './Examples/cdkDrag&Drop/photosDetails/photosDetails.component';
import { PhotosSideBarComponent } from './Examples/cdkDrag&Drop/photosSideBar/photosSideBar.component';
import { UserDetailsComponent } from './Examples/cdkDrag&Drop/userDetails/userDetails.component';
import { ExpandedRowDirective } from './core/directives/expand-row.directive';
import { IncrementorComponent } from './core/componenets/incrementor/incrementor.component';
import { FormExampleComponent } from './Examples/formExample/formExample.component';
import { ALL_MODULES } from './helpers/all-module-imports';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TableFormBuilderDirective } from './core/directives/table-form-builder.directive';
import { OnRouteDirective } from './core/directives/onRoute.directive';
import { NewFolderComponent } from './core/componenets/new-folder/new-folder.component';
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
    NewFolderComponent
  ],
  imports: [
    ...ALL_MODULES,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [
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
export class AppModule { }
