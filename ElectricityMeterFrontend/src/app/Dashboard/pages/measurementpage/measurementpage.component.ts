import { Component, OnInit } from '@angular/core';
import {LineChart} from '../../../Shared/ngxCharts/linechart/classes/linechart.class';
import {IBaseChart} from '../../../Shared/ngxCharts/basechart/basechart.interface';
import {Request} from '../../../Shared/requests/classes/request.class';
import moment = require('moment');
import {RequesthelperService} from '../../../Shared/requests/services/requesthelper.service';
import {MultiItem} from '../../../Shared/ngxCharts/basechart/multiitem.class';
import {ChartdataService} from '../../../Shared/ngxCharts/services/chartdata.service';
import {MultiDataSerie} from '../../../Shared/ngxCharts/basechart/multiItemSeries.class';
import {NgxCarousel} from 'ngx-carousel';

@Component({
  selector: 'app-measurementpage',
  templateUrl: './measurementpage.component.html',
  styleUrls: ['./measurementpage.component.scss']
})
export class MeasurementpageComponent implements OnInit {

  carouselOne: NgxCarousel;
  constructor() { }

  ngOnInit() {
    this.carouselOne = <NgxCarousel>({
      grid: {xs: 1, sm: 1, md: 1, lg: 1, all: 0},
      slide: 1,
      speed: 800,
      interval: 4000,
      point: {
        visible: true,
      },
      load: 2,
      loop: false,
      touch: false,
      currentSlide: 3
    });
  }

  public myfunc(event: Event) {
    // carouselLoad will trigger this funnction when your load value reaches
    // it is helps to load the data by parts to increase the performance of the app
    // must use feature to all carousel
  }
}
