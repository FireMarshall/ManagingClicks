import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Advertisement } from './advertisement.model';
import { AdvertisementService } from './../advertisement.service';



@Component({
  selector: 'app-ad-component',
  templateUrl: './adcomponent.component.html',
  styleUrls: ['./adcomponent.component.css'],
  providers: [AdvertisementService],
})
export class AdcomponentComponent implements OnInit {

  ads: Advertisement[];

  constructor(private advertismentService: AdvertisementService) {}

  ngOnInit() {
    this.advertismentService.getAdvertisementList().subscribe( res => {
      this.advertismentService.advertisement = res as Advertisement[];
      console.table(this.advertismentService.advertisement );
    });
  }

  registerClick(company: string, productName: string, productCategory: string) {
    this.advertismentService.registerClick(company, productName, productCategory).subscribe( res => {
      console.table(res);
    });
  }
}
