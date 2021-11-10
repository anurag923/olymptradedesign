import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MasterloginPage } from './masterlogin.page';

const routes: Routes = [
  {
    path: '',
    component: MasterloginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterloginPageRoutingModule {}
