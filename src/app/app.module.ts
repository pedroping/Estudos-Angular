import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, isDevMode } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { CookieService } from 'ngx-cookie-service';
import { DynamicTableWithInputsComponent } from './Examples/Dynamic-Table-With-Inputs/Dynamic-Table-With-Inputs.component';
import { TableWithNgModelComponent } from './Examples/Table-With-NgModel/Table-With-NgModel.component';
import { CdkTableExampleComponent } from './Examples/cdk-Table-Example/cdk-Table-Example.component';
import { TableInlineComponent } from './Examples/cdk-Table-Example/table-inline/table-inline.component';
import { CdkDragdropComponent } from './Examples/cdkDrag&Drop/cdkDrag&drop.component';
import { PhotosDetailsComponent } from './Examples/cdkDrag&Drop/photosDetails/photosDetails.component';
import { PhotosSideBarComponent } from './Examples/cdkDrag&Drop/photosSideBar/photosSideBar.component';
import { UserDetailsComponent } from './Examples/cdkDrag&Drop/userDetails/userDetails.component';
import { UserSideBarComponent } from './Examples/cdkDrag&Drop/userSideBar/userSideBar.component';
import { DataBindingComponent } from './Examples/components/Data-binding/Data-binding.component';
import { EventBidingComponent } from './Examples/components/EventBiding/EventBiding.component';
import { StyleClassBidingComponent } from './Examples/components/StyleClassBiding/StyleClassBiding.component';
import { TwoWayDataBidingComponent } from './Examples/components/TwoWayDataBiding/TwoWayDataBiding.component';
import { FormExampleComponent } from './Examples/formExample/formExample.component';
import { LoginPageComponent } from './Examples/loginPage/loginPage.component';
import { ZoomImageLensComponent } from './Examples/zoom-image/zoom-image-lens/zoom-image-lens.component';
import { ZoomImageComponent } from './Examples/zoom-image/zoom-image.component';
import { HomeComponent } from './Home/Home.component';
import { AppComponent } from './app.component';
import { CofirmeModalComponent } from './core/cofirme-modal/cofirme-modal.component';
import { AccordionComponent } from './core/componenets/accordion/accordion.component';
import { ClosedSidenavComponent } from './core/componenets/closed-sidenav/closed-sidenav.component';
import { ColunasComponent } from './core/componenets/colunas/colunas.component';
import { IncrementorComponent } from './core/componenets/incrementor/incrementor.component';
import { LoaderComponent } from './core/componenets/loader/loader.component';
import { NewFolderComponent } from './core/componenets/new-folder/new-folder.component';
import { FormErrorDirective } from './core/directives/FormError.directive';
import { ExpandedRowDirective } from './core/directives/expand-row.directive';
import { OnResizeDirective } from './core/directives/on-resize.directive';
import { OnRouteDirective } from './core/directives/onRoute.directive';
import { PasswordDirective } from './core/directives/password.directive';
import { TableFormBuilderDirective } from './core/directives/table-form-builder.directive';
import { ZoomImageHoverDirective } from './core/directives/zoom-image-hover.directive';
import { AlreadyLoggedGuardService } from './core/guards/alreadyLoggedGuard.service';
import { AuthGuardService } from './core/guards/secretGuard.service';
import { LoaderInterceptor } from './core/interceptors/loader.interceptor';
import { ALL_MODULES } from './helpers/all-module-imports';
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
    ZoomImageHoverDirective,
    ZoomImageComponent,
    ZoomImageLensComponent,
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
export class AppModule {}
