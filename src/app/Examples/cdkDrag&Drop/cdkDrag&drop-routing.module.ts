import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CdkDragdropComponent } from './cdkDrag&drop.component';
import { UserSideBarComponent } from './userSideBar/userSideBar.component';

const routes: Routes = [
  {
    path: '',
    component: CdkDragdropComponent,
    children: [
      {
        path: 'users',
        component: UserSideBarComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CdkDragDropRoutingModule { }
