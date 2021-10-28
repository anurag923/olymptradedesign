import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssetsinnerPageRoutingModule } from './assetsinner-routing.module';

import { AssetsinnerPage } from './assetsinner.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssetsinnerPageRoutingModule
  ],
  declarations: [AssetsinnerPage]
})
export class AssetsinnerPageModule {}
