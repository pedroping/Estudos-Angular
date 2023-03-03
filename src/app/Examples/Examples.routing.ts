import { Routes, RouterModule } from '@angular/router';
import { DataBindingComponent } from './components/Data-binding/Data-binding.component';
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
      }
    ]
  },
];

export const Example_routes = RouterModule.forChild(routes);