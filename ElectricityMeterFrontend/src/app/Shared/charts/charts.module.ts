import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule} from '@swimlane/ngx-charts';
import { CustomLineChartComponent } from './linechart/linechart.component';

@NgModule({
  imports: [
    CommonModule,
    NgxChartsModule
  ],
  declarations: [CustomLineChartComponent],
  exports: [CustomLineChartComponent]
})
export class ChartsModule { }
