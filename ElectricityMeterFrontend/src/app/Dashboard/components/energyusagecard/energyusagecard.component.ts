import { Component, OnInit } from '@angular/core';
import {ChartdataService} from '../../../Shared/ngxCharts/services/chartdata.service';
import {LineChart} from '../../../Shared/ngxCharts/linechart/classes/linechart.class';
import {Request} from '../../../Shared/requests/classes/request.class';
import {IBaseChart} from '../../../Shared/ngxCharts/basechart/basechart.interface';
import {MultiDataSerie} from '../../../Shared/ngxCharts/basechart/multiItemSeries.class';
import * as moment from 'moment';

@Component({
  selector: 'app-energyusagecard',
  templateUrl: './energyusagecard.component.html',
  styleUrls: ['./energyusagecard.component.scss']
})
export class EnergyusagecardComponent implements OnInit {

  public chart: LineChart;

  constructor(private dataService: ChartdataService) { }

  ngOnInit() {
    this.chart = new LineChart(<IBaseChart>{
      data:  [],
      xAxisLabel: 'tijd',
      yAxisLabel: 'energie verbruik',
      showXAxisLabel: true,
      showYAxisLabel: true,
      xAxis: true,
      yAxis: true,
      legend: true,
      timeline: true,
      disableTooltip: true,
      autoScale: true
    });

    const request = new Request<any>();
    request.url = 'api/measurement';
    request.beginDate =  moment().subtract(1, 'days');
    request.endDate = moment();
    request.filter = { sensorId: '5C:CF:7F:3A:9E:ED'};

    this.dataService.getMultiDataSourceWithDate<number>('activePowerPlus', 'timestamp', request)
      .subscribe((dataSource) => {
        this.chart.data = [new MultiDataSerie('Energie verbruik', dataSource)];
      });
  }
}
