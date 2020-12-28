import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyaccountPage } from './myaccount.page';

const routes: Routes = [
  {
    path: '',
    component: MyaccountPage
  },
  {
    path: 'namechange',
    loadChildren: () => import('./namechange/namechange.module').then( m => m.NamechangePageModule)
  },
  {
    path: 'password-change',
    loadChildren: () => import('./password-change/password-change.module').then( m => m.PasswordChangePageModule)
  },
  {
    path: 'email-change',
    loadChildren: () => import('./email-change/email-change.module').then( m => m.EmailChangePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyaccountPageRoutingModule {}
