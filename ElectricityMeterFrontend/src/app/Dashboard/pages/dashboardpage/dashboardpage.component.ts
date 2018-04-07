import {Component, OnInit, ViewChild} from '@angular/core';
import {CustomLineChartComponent} from '../../../Shared/ngxCharts/linechart/linechart.component';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/finally';
import {animate, style, query, group, transition, trigger, keyframes, stagger} from '@angular/animations';
import {AuthService} from '../../../login/services/auth.service';
import {HttpClient} from '@angular/common/http';
import {User} from '../../../data/user/user.class';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-dashboardpage',
  templateUrl: './dashboardpage.component.html',
  styleUrls: ['./dashboardpage.component.scss'],
  animations: [
    trigger('ngIfInAnimation', [
      transition('void => *', [
        query('*', style({ opacity: 0}), {optional: true}),
        query('*', stagger('100ms', [
          animate('0.8s ease-in', keyframes([
            style({opacity: 0}),
            style({opacity: .5}),
            style({opacity: 1}),
          ]))]), {optional: true}),
      ])
    ])
  ]
})

export class DashboardpageComponent implements OnInit {

  @ViewChild(CustomLineChartComponent)
  chartComponent: CustomLineChartComponent;

  constructor(public httpService: HttpClient, public authService: AuthService) {
  }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.httpService.get<User>('api/user/' + localStorage.getItem('userId'))
      .subscribe((user) => {
      this.authService.user = user as User;
    });
  }
}
