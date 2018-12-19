import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxMasonryModule } from 'ngx-masonry';

import { ComponentsModule } from './../components/components.module';

import { HomePage } from './home.page';

import { environment } from '../../environments/environment';

@NgModule({
  imports: [
    NgxMasonryModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ]),
    ComponentsModule
  ],
  declarations: [
    HomePage
  ]
})
export class HomePageModule {}
