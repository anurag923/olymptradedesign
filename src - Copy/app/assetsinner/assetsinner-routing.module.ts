import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssetsinnerPage } from './assetsinner.page';

const routes: Routes = [
  {
    path: '',
    component: AssetsinnerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssetsinnerPageRoutingModule {}
