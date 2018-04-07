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
import {DashboardRoutingModule} from './dashboard.routing.module';
import { MeasurementpageComponent } from '../Dashboard/pages/measurementpage/measurementpage.component';
import { HomepageComponent } from '../Dashboard/pages/homepage/homepage.component';
import { PaginationbarComponent } from '../Dashboard/components/paginationbar/paginationbar.component';
import { EnergyusagecardComponent } from '../Dashboard/components/energyusagecard/energyusagecard.component';
import { ElectricitytocardComponent } from '../Dashboard/components/electricitytocard/electricitytocard.component';
import {NgxCarouselModule} from 'ngx-carousel';
import {HttpClientModule} from '@angular/common/http';
import {Daterangepicker} from 'ng2-daterangepicker';
import { DatepickerComponent } from '../Shared/datepicker/datepicker.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    HttpClientModule,
    SharedModule,
    ChartsModule,
    NgxCarouselModule,
    NgHttpLoaderModule
  ],
  declarations: [DashboardpageComponent, TopbarComponent, SidebarComponent,
                UserpageComponent, MeasurementpageComponent, HomepageComponent,
                PaginationbarComponent, EnergyusagecardComponent, ElectricitytocardComponent],
  exports: [DashboardpageComponent, TopbarComponent, SidebarComponent,
    UserpageComponent, MeasurementpageComponent, HomepageComponent,
    PaginationbarComponent, EnergyusagecardComponent, ElectricitytocardComponent],

})
export class DashboardModule { }
