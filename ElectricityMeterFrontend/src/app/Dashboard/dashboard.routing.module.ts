import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {UserpageComponent} from './pages/userpage/userpage.component';
import {MeasurementpageComponent} from './pages/measurementpage/measurementpage.component';
import {HomepageComponent} from './pages/homepage/homepage.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' , data: {icon: 'fa fa-home', title: 'Home'}},
  { path: 'home', component: HomepageComponent, data: {icon: 'fa fa-home', title: 'Home'}},
  { path: 'dashboard', component: MeasurementpageComponent, data: { icon: 'fa fa-line-chart', title: 'Measurements'}},
  { path: 'user', component: UserpageComponent, data: {icon: 'fa fa-user', title: 'User Profile'}}
  ];

@NgModule({
  exports: [ RouterModule],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class DashboardRoutingModule { }
