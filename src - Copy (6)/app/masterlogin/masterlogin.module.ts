import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MasterloginPageRoutingModule } from './masterlogin-routing.module';

import { MasterloginPage } from './masterlogin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MasterloginPageRoutingModule
  ],
  declarations: [MasterloginPage]
})
export class MasterloginPageModule {}
