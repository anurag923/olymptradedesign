import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FootermarketPage } from './footermarket.page';

const routes: Routes = [
  {
    path: '',
    component: FootermarketPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FootermarketPageRoutingModule {}
