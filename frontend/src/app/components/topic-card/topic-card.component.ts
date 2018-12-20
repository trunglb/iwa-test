import { ArticlesService } from './../../services/articles.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-topic-card',
  templateUrl: './topic-card.component.html',
  styleUrls: ['./topic-card.component.scss']
})
export class TopicCardComponent implements OnInit {
  @Input() topic: any = {};

  @Input() activity: any;
  @Input() reviewer: any;

  currentAsset: any;
  coverImageUrl: string;
  assetIndex = 0;
  slideOptions: any = {
    pagination: {
      el: '.pagination-placeholder',
      clickable: true,
      bulletElement: 'div'
    }
  };

  constructor(
    private router: Router,
    private articlesService: ArticlesService
  ) {
  }

  ngOnInit() {
    this.getCoverImageUrl();
  }

  getCoverImageUrl() {
    if (this.topic && this.topic.coverImageUrl != null) {
      this.currentAsset = {
        url: this.topic.coverImageUrl
      };
    } else {
      this.currentAsset = {
        url: 'assets/images/loading.svg',
        loading: true
      };
      this.articlesService.articleImage(this.topic.url).then(url => {
        this.currentAsset = {
          url: url || 'assets/images/null-image.png',
          loading: url ? false : true
        };
      }, error => {
          this.currentAsset = {
            url: 'assets/images/null-image.png',
            loading: true
          };
      });
    }
  }


  dotsAction(e, select) {
    if (select.value === 'edit') {
      this.router.navigateByUrl(`/topics/${this.topic.id}/edit`);
    } else if (select.value === 'share') {
    }
    setTimeout(() => {
      select.value = null;
    }, 200);
  }
}
