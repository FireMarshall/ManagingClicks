import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Advertisement } from '../adcomponent/advertisement.model';
import { GroupByResult } from '../group.by.result.model';

@Component({
  selector: 'app-admincomponent',
  templateUrl: './admincomponent.component.html',
  styleUrls: ['./admincomponent.component.css']
})
export class AdmincomponentComponent implements OnInit {

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getAdvertisementList().subscribe( res => {
      this.adminService.advertisement = res  as Advertisement[];
    });
  }

// for each of the component write in init function
  getAdStatsByNames() {
    this.adminService.getAdStatsByNames().subscribe( res => {
      this.adminService.adGroupByName = res as GroupByResult[];
      console.table(res);
    });
  }

  getAdStatsByCompany() {
    this.adminService.getAdStatsByCompany().subscribe( res => {
      this.adminService.adGroupByCompany = res as GroupByResult[];
      console.table(res);
    });
  }

  getAdStatsByCategory() {
    this.adminService.getAdStatsByCategory().subscribe( res => {
      this.adminService.adGroupByCategory = res as GroupByResult[];
      console.table(res);
    });
  }

}
