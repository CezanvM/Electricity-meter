import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule} from '@swimlane/ngx-charts';
import { CustomLineChartComponent } from './linechart/linechart.component';
import {LoadingModule} from 'ngx-loading';
import { LinechartcardComponent } from './linechart/linechartcard/linechartcard.component';

@NgModule({
  imports: [
    CommonModule,
    NgxChartsModule,
    LoadingModule
  ],
  declarations: [CustomLineChartComponent, LinechartcardComponent],
  exports: [CustomLineChartComponent, LinechartcardComponent]
})
export class ChartsModule { }
