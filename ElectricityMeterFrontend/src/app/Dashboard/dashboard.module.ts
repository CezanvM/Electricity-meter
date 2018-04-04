import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DashboardpageComponent } from './pages/dashboardpage/dashboardpage.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SharedModule } from '../Shared/shared.module';
import { NgHttpLoaderModule } from 'ng-http-loader/ng-http-loader.module';
import {ChartsModule} from '../Shared/ngxCharts/charts.module';
import { UserpageComponent } from './pages/userpage/userpage.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ChartsModule,
    NgHttpLoaderModule
  ],
  declarations: [DashboardpageComponent, TopbarComponent, SidebarComponent, UserpageComponent],
  exports: [ DashboardpageComponent, TopbarComponent, SidebarComponent ],

})
export class DashboardModule { }
