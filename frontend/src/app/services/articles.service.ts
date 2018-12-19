import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private api: ApiService) { }

  articles(perPage?: number, pageNumber?: number, selector?: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      // set default data if selector is not
      this.api.graphql(`
        query ($pageNumber: Int){
          articles(pageNumber: $pageNumber) {
            url content title subtitle coverImageUrl description
          }
        }
      `, { pageNumber: pageNumber }, {}).subscribe(response => {
        resolve(response.data.articles);
      }, error => {
        reject(error);
      });
    });
  }

  article(url): Promise<any> {
    return new Promise(async (resolve, reject) => {
      // set default data if selector is not
      this.api.graphql(`
        query ($url: String!){
          article(url: $url) {
            url content title subtitle coverImageUrl description
          }
        }
      `, { url: url }, {}).subscribe(response => {
        resolve(response.data.article);
      }, error => {
        reject(error);
      });
    });
  }

  articleImage(url): Promise<any> {
    return new Promise(async (resolve, reject) => {
      // set default data if selector is not
      this.api.graphql(`
        query ($url: String!){
          article(url: $url) {
            url coverImageUrl
          }
        }
      `, { url: url }, {}).subscribe(response => {
        resolve(response.data.article.coverImageUrl);
      }, error => {
        reject(error);
      });
    });
  }

}
