import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, URLSearchParams, Headers } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ToastController } from '@ionic/angular';

@Injectable()
export class ApiService {
  constructor(
    private http: Http,
    private toastCtrl: ToastController,
  ) { }

  buildHeaders(headerParams?: any) {
    headerParams = headerParams || {};
    const headers = new Headers();

    Object.entries(headerParams).forEach(([key, value]) => {
      headers.set(key, <string>value);
    });

    return headers;
  }

  graphql(query, params: any, headers?: any): Observable<any> {
    const data = {
      query: query,
      variables: params
    };
    const requestOptions = new RequestOptions();
    requestOptions.headers = this.buildHeaders(headers);
    return this.http.post(`${environment.apiUrl}/graphql`, data, requestOptions)
    .pipe(
      map( res => {
      return this.extractData(res.json());
      })
    )
    .pipe(
      catchError(this.handleError)
    );
  }

  private extractData(res: Response) {
    const body: any = Object.assign({}, res);
    if (body.errors) {
      console.error(body.errors);
      this.toastCtrl.create({
        message: 'Something went wrong',
        duration: 1000
      }).then(toastObj => {
        toastObj.present();
      });
      const messages = body.errors.map(function(item) {
        return item.message;
      }).join(',');
      throw new Error(messages);
    } else {
      return body || {};
    }
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.message || body.error || body.errors || JSON.stringify(body);
      errMsg = `${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return throwError({message: errMsg});
  }

}
