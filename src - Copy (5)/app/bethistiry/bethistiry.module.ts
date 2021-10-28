import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BethistiryPageRoutingModule } from './bethistiry-routing.module';

import { BethistiryPage } from './bethistiry.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BethistiryPageRoutingModule
  ],
  declarations: [BethistiryPage]
})
export class BethistiryPageModule {}
