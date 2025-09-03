import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { UserSetupComponent } from './user-setup/user-setup.component';

const routes: Routes = [
  {
    path: 'profile-component',
    component: ProfileComponent
  },
   {
    path: 'user-setup-component',
    component: UserSetupComponent
  },
  {
    path: '',
    redirectTo: '/user-setup-component',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

