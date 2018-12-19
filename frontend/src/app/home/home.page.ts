import { Platform, MenuController, AlertController } from '@ionic/angular';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ArticlesService } from '../services/articles.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: [
    'home.page.scss'
  ],
  animations: [
    trigger(
      'opacityAnimation',
      [
        transition(':enter', [
          style({ opacity: 0 }),
          animate('200ms', style({ 'opacity': 1 }))
        ]),
        transition(':leave', [
          style({ 'opacity': 1 }),
          animate('100ms', style({ 'opacity': 0 })),
        ])
      ]
    )
  ],
  providers: [ArticlesService]
})
export class HomePage implements OnInit {
  @ViewChild('topicMasonry') topicMasonry: any;
  @ViewChild('scrollCheckPoint') scrollCheckPoint: any;
  @ViewChild('content') content: any;
  loading = false;
  currentUser: any;
  topicPerPage = 30;
  topicPage = 1;
  articles: Array<any> = [];

  isSearch = false;
  searchStr: string;
  searchResults: Array<any> = [];
  canLoadMore = true;

  constructor(
    public platform: Platform,
    private menuCtrl: MenuController,
    private router: Router,
    private alertCtrl: AlertController,
    private zone: NgZone,
    private articlesService: ArticlesService) {
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.resetPaging();
    this.getTopics();
  }

  getTopics() {
    if (!this.loading) {
      this.loading = true;
      this.articlesService.articles(this.topicPerPage, this.topicPage).then(articles => {
        this.loading = false;
        if (articles && this.articles.length === 0) {
          this.articles = articles;
        } else {
          this.articles.push(...articles);
        }
        this.topicPage += 1;
        if (articles.length < this.topicPerPage) {
          this.canLoadMore = false;
        }
      });
    }
  }

  resetPaging() {
    this.loading = false;
    this.canLoadMore = true;
    this.topicPage = 1;
    this.articles = [];
  }

  loadMore() {
    if (!this.canLoadMore) { return; }

    const rect = this.scrollCheckPoint.nativeElement.getBoundingClientRect();
    if (rect.top >= 0 && (rect.bottom <= this.platform.height())) {
      this.getTopics();
    }
  }

  setUser(userInfo) {
    this.currentUser = userInfo;
  }


}
