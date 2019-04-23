import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';

// import 'rsjx/add/operator/toPromise';
// import 'rxjs/Rx';
import { Advertisement } from './adcomponent/advertisement.model';
import { HttpHeaders } from '@angular/common/http';
import { GroupByResult } from './group.by.result.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  advertisement: Advertisement[];
  adGroupByName: GroupByResult[];
  adGroupByCompany: GroupByResult[];
  adGroupByCategory: GroupByResult[];

  readonly baseURL = 'http://127.0.0.1:3000/ads/admin';
  constructor(private http: HttpClient) { }

  getAdvertisementList() {
    return this.http.get('http://127.0.0.1:3000/ads');
  }

  getAdStatsByNames() {
    return this.http.get(`${this.baseURL}/group_by_name`);
  }

  getAdStatsByCompany() {
    return this.http.get(`${this.baseURL}/group_by_company`);
  }

  getAdStatsByCategory() {
    return this.http.get(`${this.baseURL}/group_by_category`);
  }

}
