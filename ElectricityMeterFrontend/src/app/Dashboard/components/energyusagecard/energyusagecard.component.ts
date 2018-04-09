import {Component, OnInit, ViewChild} from '@angular/core';
import {ChartdataService} from '../../../Shared/ngxCharts/services/chartdata.service';
import {LineChart} from '../../../Shared/ngxCharts/linechart/classes/linechart.class';
import {Request} from '../../../Shared/requests/classes/request.class';
import {IBaseChart} from '../../../Shared/ngxCharts/basechart/basechart.interface';
import {MultiDataSerie} from '../../../Shared/ngxCharts/basechart/multiItemSeries.class';
import * as moment from 'moment';
import {LinechartcardComponent} from '../../../Shared/ngxCharts/linechart/linechartcard/linechartcard.component';

@Component({
  selector: 'app-energyusagecard',
  templateUrl: './energyusagecard.component.html',
  styleUrls: ['./energyusagecard.component.scss']
})
export class EnergyusagecardComponent implements OnInit {

  public chart: LineChart;
  public dataSource: MultiDataSerie[];

  constructor(private dataService: ChartdataService) { }

  @ViewChild(LinechartcardComponent)
  lineChart: LinechartcardComponent;

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

    this.dataSource = [];
  }

  OnDateSelected($event) {
    this.dataSource = [];
    const request = new Request<any>();
    request.url = 'api/measurement';
    request.beginDate = $event.start;
    request.endDate = $event.end;
    request.filter = {sensorId: localStorage.getItem('sensorId')};

    this.dataService.getMultiDataSourceWithDate<number>('activePowerPlus', 'timestamp', request)
      .subscribe((dataSource) => {
        this.dataSource.push(new MultiDataSerie('Active Power Plus', dataSource));
        this.chart.data = this.dataSource;
        this.chart.update();
      });
  }
}
