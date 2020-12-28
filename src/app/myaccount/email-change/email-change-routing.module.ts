import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmailChangePage } from './email-change.page';

const routes: Routes = [
  {
    path: '',
    component: EmailChangePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmailChangePageRoutingModule {}
