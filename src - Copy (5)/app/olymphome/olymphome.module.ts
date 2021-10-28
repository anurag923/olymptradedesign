import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OlymphomePageRoutingModule } from './olymphome-routing.module';

import { OlymphomePage } from './olymphome.page';

import { AssetsPageModule } from '../assets/assets.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OlymphomePageRoutingModule,
    AssetsPageModule
  ],
  declarations: [OlymphomePage]
})
export class OlymphomePageModule {}
