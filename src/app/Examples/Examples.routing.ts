import { RouterModule, Routes } from '@angular/router';
import { AlreadyLoggedGuardService as AlreadyLogged } from '../core/guards/alreadyLoggedGuard.service';
import { canActivate } from '../core/guards/secretGuard.service';
import { DynamicTableWithInputsComponent } from './Dynamic-Table-With-Inputs/Dynamic-Table-With-Inputs.component';
import { ExamplesComponent } from './Examples.component';
import { TableWithNgModelComponent } from './Table-With-NgModel/Table-With-NgModel.component';
import { CdkTableExampleComponent } from './cdk-Table-Example/cdk-Table-Example.component';
import { CdkDragdropComponent } from './cdkDrag&Drop/cdkDrag&drop.component';
import { DataBindingComponent } from './components/Data-binding/Data-binding.component';
import { EventBidingComponent } from './components/EventBiding/EventBiding.component';
import { StyleClassBidingComponent } from './components/StyleClassBiding/StyleClassBiding.component';
import { TwoWayDataBidingComponent } from './components/TwoWayDataBiding/TwoWayDataBiding.component';
import { FormExampleComponent } from './formExample/formExample.component';
import { LoginPageComponent } from './loginPage/loginPage.component';
import { PaginaProtegidaComponent } from './paginaProtegida/paginaProtegida.component';
import { ZoomImageComponent } from './zoom-image/zoom-image.component';
const routes: Routes = [
  {
    path: '',
    component: ExamplesComponent,
    children: [
      {
        path: 'Data-binding',
        title: 'Data Biding',
        component: DataBindingComponent,
        pathMatch: 'full',
      },
      {
        path: 'StyleClass-binding',
        title: 'StyleClass Cinding',
        component: StyleClassBidingComponent,
        pathMatch: 'full',
      },
      {
        path: 'Event-binding',
        title: 'Event Binding',
        component: EventBidingComponent,
        pathMatch: 'full',
      },
      {
        path: 'TwoWayData-binding',
        title: 'Two Way Data Binding',
        component: TwoWayDataBidingComponent,
        pathMatch: 'full',
      },
      {
        path: 'TableWithFormControls',
        title: 'Table With Form Controls',
        component: DynamicTableWithInputsComponent,
        pathMatch: 'full',
      },
      {
        path: 'TableWithNgModel',
        title: 'Table With Ng Model',
        component: TableWithNgModelComponent,
        pathMatch: 'full',
      },
      {
        path: 'login',
        title: 'Login',
        component: LoginPageComponent,
        pathMatch: 'full',
        canActivate: [AlreadyLogged],
      },
      {
        path: 'LugarSecreto',
        title: 'Lugar Secreto',
        component: PaginaProtegidaComponent,
        pathMatch: 'full',
        canActivate: [canActivate],
      },
      {
        path: 'CdkTable',
        title: 'Cdk Table',
        component: CdkTableExampleComponent,
        pathMatch: 'full',
      },
      {
        path: 'CdkDragDrop',
        title: 'Cdk Drag Drop',
        loadChildren: () =>
          import('../Examples/cdkDrag&Drop/cdkDrag&drop.module').then(
            (m) => m.CdkDragdropModule
          ),
        component: CdkDragdropComponent,
      },
      {
        path: 'formExamples',
        title: 'Form Examples',
        component: FormExampleComponent,
        pathMatch: 'full',
      },
      {
        path: 'zoomImage',
        title: 'Zoom Imagens',
        component: ZoomImageComponent,
      },
    ],
  },
];

export const Example_routes = RouterModule.forChild(routes);
