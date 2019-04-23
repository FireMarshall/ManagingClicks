import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js';
import { AdminService } from 'src/app/admin.service';
import { GroupByResult } from 'src/app/group.by.result.model';
import { Advertisement } from 'src/app/adcomponent/advertisement.model';
import { count } from 'rxjs/operators';


@Component({
  selector: 'app-individual',
  templateUrl: './individual.component.html',
  styleUrls: ['./individual.component.css']
})
export class IndividualComponent implements OnInit {
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
          label: 'Number of clicks on advertisements',
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


  async getAdStatsByNames() {
    await this.adminService.getAdStatsByNames().subscribe( res => {
      this.adminService.adGroupByName = res as GroupByResult[];
      // console.table(res);
    });
  }

  async getAdList() {
    await this.getAdStatsByNames();
    await this.adminService.getAdvertisementList().subscribe( async res => {
      this.adminService.advertisement = res  as Advertisement[];
      await this.adminService.advertisement.forEach(ad => {
        if ((ad.product_name in this.labels) === false) {
          this.labels.push(ad.product_name);
        }
      });
      console.table(this.labels);
      await this.labels.forEach(label => {
        // tslint:disable-next-line:prefer-const
        let p = this.adminService.adGroupByName.find(e => e._id === label);
        if (p === undefined) {
          this.counts.push(0);
        } else {
          this.counts.push(p.count);
        }
      });
    });
  }

}
