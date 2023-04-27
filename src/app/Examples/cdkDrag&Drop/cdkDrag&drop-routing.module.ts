import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CdkDragdropComponent } from './cdkDrag&drop.component';
import { UserSideBarComponent } from './userSideBar/userSideBar.component';
import { UserDetailsComponent } from './userDetails/userDetails.component';
import { PhotosDetailsComponent } from './photosDetails/photosDetails.component';
import { PhotosSideBarComponent } from './photosSideBar/photosSideBar.component';

const routes: Routes = [
  {
    path: 'users',
    component: UserSideBarComponent,
  },
  {
    path: 'user/:id',
    component: UserDetailsComponent,
    outlet: 'details',
  },
  {
    path: 'photos',
    component: PhotosSideBarComponent,
  },
  {
    path: 'photo/:id',
    component: PhotosDetailsComponent,
    outlet: 'details',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CdkDragDropRoutingModule {}
