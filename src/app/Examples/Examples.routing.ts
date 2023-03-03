import { Routes, RouterModule } from '@angular/router';
import { DataBindingComponent } from './components/Data-binding/Data-binding.component';
import { EventBidingComponent } from './components/EventBiding/EventBiding.component';
import { StyleClassBidingComponent } from './components/StyleClassBiding/StyleClassBiding.component';
import { ExamplesComponent } from './Examples.component';

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
      }
    ]
  },
];

export const Example_routes = RouterModule.forChild(routes);