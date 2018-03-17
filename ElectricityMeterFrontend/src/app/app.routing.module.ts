import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuardService} from './login/services/auth-guard.service';
import {DashboardpageComponent} from './Dashboard/pages/dashboardpage/dashboardpage.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardpageComponent }
  ];

@NgModule({
  exports: [ RouterModule],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class AppRoutingModule { }
