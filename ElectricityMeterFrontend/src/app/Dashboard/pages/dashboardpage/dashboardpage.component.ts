import {Component, OnInit, ViewChild} from '@angular/core';
import {CustomLineChartComponent} from '../../../Shared/ngxCharts/linechart/linechart.component';
import {RequesthelperService} from '../../../Shared/requests/services/requesthelper.service';
import { Request} from '../../../Shared/requests/classes/request.class';
import moment = require('moment');
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/finally';
import {LineChart} from '../../../Shared/ngxCharts/linechart/classes/linechart.class';
import {IBaseChart} from '../../../Shared/ngxCharts/basechart/basechart.interface';

@Component({
  selector: 'app-dashboardpage',
  templateUrl: './dashboardpage.component.html',
  styleUrls: ['./dashboardpage.component.scss']
})

export class DashboardpageComponent implements OnInit {

  @ViewChild(CustomLineChartComponent)
  chartComponent: CustomLineChartComponent;

  protected dayChart: LineChart;
  protected weekChart: LineChart;
  protected chart: any;

  loading = true;

  constructor(private http: RequesthelperService, ) {

    this.dayChart = new LineChart(<IBaseChart>{
      legend: true,
      showXAxisLabel: true,
      showYAxisLabel: true,
      yAxisLabel: 'energie verbruik',
      xAxisLabel: 'tijd',
      xAxis: true,
      yAxis: true,
      timeline: true,
      data: [],
      disableTooltip: true
    });

    const request = new Request<any>();
    request.url = 'api/measurement';
    request.beginDate =  moment().subtract(21, 'days');
    request.endDate = moment();
    request.filter = { sensorId: '5C:CF:7F:3A:9E:ED'};
    request.select = 'timestamp activePowerPlus';

    this.http.get<any>(request)
      .map((fullData) => {
        return fullData.map((mapData: any) => {
          return {
            value: mapData.activePowerPlus,
            name: moment(mapData.timestamp).format('DD-MM-YY HH:mm')
          };
        })
          .filter(filterData => !isNaN(filterData.value));
      })
      .finally(() => setTimeout(() => { this.loading = false; }, 1000))
      .subscribe((e) => {
        this.dayChart.data = [{
              'name': 'Energie verbruik',
              'series': e
            }
        ];
    });
  }

  ngOnInit() {
    // console.log(JSON.stringify(new Filter()));
  }
}
