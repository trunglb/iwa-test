import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgxMasonryModule } from 'ngx-masonry';

import { IonicModule } from '@ionic/angular';

import { TopicPage } from './topic.page';

import { ComponentsModule } from './../components/components.module';

const routes: Routes = [
  {
    path: '',
    component: TopicPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgxMasonryModule,
    ComponentsModule,
  ],
  declarations: [
    TopicPage,
  ]
})
export class TopicPageModule {}
