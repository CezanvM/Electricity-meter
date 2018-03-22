import {Component, OnInit, ViewChild} from '@angular/core';
import {LineChart} from '../../../Shared/charts/linechart/classes/linechart.class';
import {CustomLineChartComponent} from '../../../Shared/charts/linechart/linechart.component';
import {RequesthelperService} from '../../../Shared/requests/services/requesthelper.service';
import { Request} from '../../../Shared/requests/classes/request.class';
import moment = require('moment');
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/finally';

@Component({
  selector: 'app-dashboardpage',
  templateUrl: './dashboardpage.component.html',
  styleUrls: ['./dashboardpage.component.scss']
})

export class DashboardpageComponent implements OnInit {

  @ViewChild(CustomLineChartComponent)
  chartComponent: CustomLineChartComponent;

  protected chart: LineChart;
  loading = true;

  constructor(private http: RequesthelperService) {

    this.chart = new LineChart();

    const request = new Request<any>();
    request.url = 'api/measurement';
    request.beginDate =  moment('17-03-2018 00:00:00', 'DD-MM-YYYY hh:mm:ss');
    request.endDate = moment('18-03-2018 00:00:00', 'DD-MM-YYYY hh:mm:ss');
    request.filter = { sensorId: '5C:CF:7F:3A:9E:ED'};
    request.select = '';

    this.http.get<any>(request)
      .map((e) => {
         return e.map((el: any) => {
           return {
             name: moment(el.timestamp).format('DD-MM-YY hh:mm'),
             value: el.electricityTo1
           };
         });
      })
      .finally(() => setTimeout(() => { this.loading = false; }, 1000))
      .subscribe((e) => {
          this.chart.data = [{
            name: 'electriciteits verbruik',
            series: e
          }];
      });
  }

  ngOnInit() {
    // console.log(JSON.stringify(new Filter()));
  }
}
