import {Component, Input, OnInit} from '@angular/core';
import {LineChart} from '../classes/linechart.class';
import {Line} from 'tslint/lib/verify/lines';

@Component({
  selector: 'app-linechartcard',
  templateUrl: './linechartcard.component.html',
  styleUrls: ['./linechartcard.component.scss']
})
export class LinechartcardComponent implements OnInit {

  @Input()
  chart: LineChart;

  @Input()
  title = '';
  constructor() {
    this.chart = new LineChart();
  }

  ngOnInit() {
  }

}
