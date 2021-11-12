import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistationPage } from './registation.page';

const routes: Routes = [
  {
    path: '',
    component: RegistationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistationPageRoutingModule {}
