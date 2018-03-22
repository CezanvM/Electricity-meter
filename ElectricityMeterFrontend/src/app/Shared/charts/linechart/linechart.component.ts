import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {LineChartComponent} from '@swimlane/ngx-charts';
import { LineChart } from './classes/linechart.class';
import {Singledata} from '../basechart/singledata.class';

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.scss']
})
export class CustomLineChartComponent implements OnInit, AfterViewInit {

  @Input() chart: LineChart;

  @ViewChild(LineChartComponent)
  chartComponent: LineChartComponent;

  colorScheme = {
    name: 'fire',
    selectable: true,
    group: 'Ordinal',
    domain: [
      '#ff3d00', '#bf360c', '#ff8f00', '#ff6f00', '#ff5722', '#e65100', '#ffca28', '#ffab00'
    ]
  };

  constructor() {
  }

  ngAfterViewInit(): void {
    this.init();
  }

  ngOnInit() {
  }

  private init() {
    this.chartComponent.showXAxisLabel = this.chart.showXAxisLabel;
    this.chartComponent.showYAxisLabel = this.chart.showYAxisLabel;
    this.chartComponent.xAxis = this.chart.xAxis;
    this.chartComponent.yAxis = this.chart.yAxis;
    this.chartComponent.legend = this.chart.legend;
    this.chartComponent.xAxisLabel = this.chart.xAxisLabel;
    this.chartComponent.yAxisLabel = this.chart.yAxisLabel;
    this.update();
  }

  public update() {
    this.chart.data = [...this.chart.data];
  }
}
