// import { Injectable } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';

// import 'rsjx/add/operator/toPromise';
// import 'rxjs/Rx';
import { Advertisement } from './adcomponent/advertisement.model';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {
  advertisement: Advertisement[];
  readonly baseURL = 'http://127.0.0.1:3000/ads';

  constructor(private http: HttpClient) { }

  getAdvertisementList() {
    return this.http.get(this.baseURL);
  }

  registerClick(company: string, productName: string, productCategory: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    return this.http.post(this.baseURL + '/click', {
        company,
        product_name: productName,
        product_category: productCategory,
        click_ts: new Date(),
      }, httpOptions);
  }

}
