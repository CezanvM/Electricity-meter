import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DashboardpageComponent } from './pages/dashboardpage/dashboardpage.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SharedModule } from '../Shared/shared.module';
import { LoadingModule } from 'ngx-loading';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    LoadingModule
  ],
  declarations: [DashboardpageComponent, TopbarComponent, SidebarComponent],
  exports: [ DashboardpageComponent, TopbarComponent, SidebarComponent ]
})
export class DashboardModule { }
