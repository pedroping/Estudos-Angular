import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Home/Home.component';

const routes: Routes = [
  {
    path: '',
    title: 'Home',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'Examples',
    loadChildren: async () => await import('./Examples/Examples.routing'),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
