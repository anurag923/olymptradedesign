import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FooterhelpPageRoutingModule } from './footerhelp-routing.module';

import { FooterhelpPage } from './footerhelp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FooterhelpPageRoutingModule
  ],
  declarations: [FooterhelpPage]
})
export class FooterhelpPageModule {}
