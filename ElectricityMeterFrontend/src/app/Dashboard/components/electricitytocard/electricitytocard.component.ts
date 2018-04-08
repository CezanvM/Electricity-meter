import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ChartdataService} from '../../../Shared/ngxCharts/services/chartdata.service';
import {LineChart} from '../../../Shared/ngxCharts/linechart/classes/linechart.class';
import {Request} from '../../../Shared/requests/classes/request.class';
import {IBaseChart} from '../../../Shared/ngxCharts/basechart/basechart.interface';
import {MultiDataSerie} from '../../../Shared/ngxCharts/basechart/multiItemSeries.class';
import {AuthService} from '../../../login/services/auth.service';
import {LinechartcardComponent} from '../../../Shared/ngxCharts/linechart/linechartcard/linechartcard.component';

@Component({
  selector: 'app-electricitytocard',
  templateUrl: './electricitytocard.component.html',
  styleUrls: ['./electricitytocard.component.scss']
})
export class ElectricitytocardComponent implements OnInit, AfterViewInit {

  public chart: LineChart;
  public dataSource: MultiDataSerie[];

  constructor(private dataService: ChartdataService, private authService: AuthService) { }

  @ViewChild(LinechartcardComponent)
  lineChart: LinechartcardComponent;

  ngAfterViewInit(): void {
  }

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
    const request = new Request<any>();
    request.url = 'api/measurement';
    request.beginDate = $event.start;
    request.endDate = $event.end;
    request.filter = {sensorId: localStorage.getItem('sensorId')};

    this.dataService.getMultiDataSourceWithDate<number>('electricityTo1', 'timestamp', request)
      .subscribe((dataSource) => {
        this.dataSource.push(new MultiDataSerie('Electricity usage tariff 1', dataSource));
        this.chart.data = this.dataSource;
        this.chart.update();
      });
  }
}
