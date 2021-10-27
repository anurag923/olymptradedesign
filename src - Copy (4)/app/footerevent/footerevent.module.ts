import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FootereventPageRoutingModule } from './footerevent-routing.module';

import { FootereventPage } from './footerevent.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FootereventPageRoutingModule
  ],
  declarations: [FootereventPage]
})
export class FootereventPageModule {}
