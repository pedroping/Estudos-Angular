import { Routes, RouterModule } from '@angular/router';
import { DataBindingComponent } from './components/Data-binding/Data-binding.component';
import { EventBidingComponent } from './components/EventBiding/EventBiding.component';
import { StyleClassBidingComponent } from './components/StyleClassBiding/StyleClassBiding.component';
import { TwoWayDataBidingComponent } from './components/TwoWayDataBiding/TwoWayDataBiding.component';
import { DynamicTableWithInputsComponent } from './Dynamic-Table-With-Inputs/Dynamic-Table-With-Inputs.component';
import { ExamplesComponent } from './Examples.component';
import { TableWithNgModelComponent } from './Table-With-NgModel/Table-With-NgModel.component';

const routes: Routes = [
  { 
    path: '',
    component: ExamplesComponent,
    children: [
      {
        path: 'Data-binding',
        component: DataBindingComponent,
        pathMatch: 'full'
      },
      {
        path: 'StyleClass-binding',
        component: StyleClassBidingComponent,
        pathMatch: 'full'
      },
      {
        path: 'Event-binding',
        component: EventBidingComponent,
        pathMatch: 'full'
      },
      {
        path: 'TwoWayData-binding',
        component: TwoWayDataBidingComponent,
        pathMatch: 'full'
      },
      {
        path: 'TableWithFormControls',
        component: DynamicTableWithInputsComponent,
        pathMatch: 'full'
      },
      {
        path: 'TableWithNgModel',
        component: TableWithNgModelComponent,
        pathMatch: 'full'
      }
    ]
  },
];

export const Example_routes = RouterModule.forChild(routes);