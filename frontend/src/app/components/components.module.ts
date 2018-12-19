import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopicCardComponent } from './topic-card/topic-card.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    TopicCardComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
  ],
  exports: [
    TopicCardComponent,
  ]
})
export class ComponentsModule {}
