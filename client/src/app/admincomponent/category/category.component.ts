import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { AdminService } from 'src/app/admin.service';
import { GroupByResult } from 'src/app/group.by.result.model';
import { Advertisement } from 'src/app/adcomponent/advertisement.model';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

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
          label: 'Number of clicks on each category',
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


  async getAdStatsByCategory() {
    await this.adminService.getAdStatsByCategory().subscribe( res => {
      this.adminService.adGroupByCategory = res as GroupByResult[];
      // console.table(res);
    });
  }

  async getAdList() {
    await this.getAdStatsByCategory();
    await this.adminService.getAdvertisementList().subscribe( async res => {
      this.adminService.advertisement = res  as Advertisement[];
      await this.adminService.advertisement.forEach(ad => {
        if ((ad.product_category in this.labels) === false) {
          this.labels.push(ad.product_category);
        }
      });
      console.table(this.labels);
      await this.labels.forEach(label => {
        // tslint:disable-next-line:prefer-const
        let p = this.adminService.adGroupByCategory.find(e => e._id === label);
        if (p === undefined) {
          this.counts.push(0);
        } else {
          this.counts.push(p.count);
        }
      });
    });
  }

}
