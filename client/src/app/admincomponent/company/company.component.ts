import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js';
import { AdminService } from 'src/app/admin.service';
import { GroupByResult } from 'src/app/group.by.result.model';
import { Advertisement } from 'src/app/adcomponent/advertisement.model';
import { count } from 'rxjs/operators';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  BarChart = [];
  labels = [];
  counts = [];
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.getAdList();

    console.table(this.labels);
    this.BarChart = new Chart('barChart', {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [{
          label: 'Number of clicks on Company',
          data: this.counts,
        }]
      },
      options: {
        title: {
          text: 'Bar Chart',
          display: true
        },

      }

    });
  }


  async getAdStatsByCompany() {
    await this.adminService.getAdStatsByCompany().subscribe( res => {
      this.adminService.adGroupByCompany = res as GroupByResult[];
      // console.table(res);
    });
  }

  async getAdList() {
    await this.getAdStatsByCompany();
    await this.adminService.getAdvertisementList().subscribe( async res => {
      this.adminService.advertisement = res  as Advertisement[];
      await this.adminService.advertisement.forEach(ad => {
        if ((ad.company in this.labels) === false) {
          this.labels.push(ad.company);
        }
      });
      console.table(this.labels);
      await this.labels.forEach(label => {
        // tslint:disable-next-line:prefer-const
        let p = this.adminService.adGroupByCompany.find(e => e._id === label);
        if (p === undefined) {
          this.counts.push(0);
        } else {
          this.counts.push(p.count);
        }
      });
    });
  }

}
