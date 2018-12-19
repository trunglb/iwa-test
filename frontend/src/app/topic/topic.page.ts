import { Component, OnInit, ViewChild } from '@angular/core';
import { ArticlesService } from '../services/articles.service';
import { Platform, Content } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-topic',
  templateUrl: './topic.page.html',
  styleUrls: ['./topic.page.scss'],
  animations: [
    trigger(
      'opacityAnimation',
      [
        transition(':enter', [
          style({opacity: 0}),
          animate('200ms', style({'opacity': 1}))
        ]),
        transition(':leave', [
          style({'opacity': 1}),
          animate('100ms', style({'opacity': 0})),
        ])
      ]
    )
  ],
  providers: [ArticlesService]
})
export class TopicPage implements OnInit {
  @ViewChild('scrollCheckPoint') scrollCheckPoint: any;
  @ViewChild('content') content: Content;
  topic: any;
  loading = true;

  constructor(
    private topicsService: ArticlesService,
    private platform: Platform,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
    ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.getTopic(this.route.snapshot.queryParams.url);
  }

  ionViewDidLeave() {
    this.topic = null;
  }

  getTopic(topicId) {
    this.loading = true;
    this.topicsService.article(topicId).then(topic => {
      this.loading = false;
      this.topic = topic;
      this.topic.content = this.sanitizer.bypassSecurityTrustHtml(this.topic.content);
    });
  }


}
