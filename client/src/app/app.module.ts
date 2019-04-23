import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { AdcomponentComponent } from './adcomponent/adcomponent.component';
import { AdmincomponentComponent } from './admincomponent/admincomponent.component';
import { TabsComponent } from './admincomponent/tabs/tabs.component';
import { IndividualComponent } from './admincomponent/individual/individual.component';
import { CompanyComponent } from './admincomponent/company/company.component';
import { CategoryComponent } from './admincomponent/category/category.component';

const appRoutes: Routes = [
  { path: 'ad', component: AdcomponentComponent },
  { path: 'admin', component: AdmincomponentComponent },
  { path: 'admin/individual', component: IndividualComponent },
  { path: 'admin/company', component: CompanyComponent },
  { path: 'admin/category', component: CategoryComponent },
  { path: 'admin/individual/company', redirectTo:'admin/company' },
  { path: 'admin/company/individual', redirectTo:'admin/individual' },
  { path: 'admin/company/category', redirectTo:'admin/category' },
  { path: 'admin/individual/category', redirectTo:'admin/category' },
  { path: 'admin/category/individual', redirectTo:'admin/individual' },
  { path: 'admin/category/company', redirectTo:'admin/company' },
];

@NgModule({

  declarations: [
    AppComponent,
    EmployeeComponent,
    AdcomponentComponent,
    AdmincomponentComponent,
    TabsComponent,
    IndividualComponent,
    CompanyComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
