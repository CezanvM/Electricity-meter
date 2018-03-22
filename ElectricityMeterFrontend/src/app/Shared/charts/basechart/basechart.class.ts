import { IBaseChart } from './basechart.interface';

export class Basechart implements IBaseChart {
  public xAxisLabel: string;
  public yAxisLabel: string;
  public showXAxisLabel: boolean;
  public showYAxisLabel: boolean;
  public xAxis: boolean;
  public yAxis: boolean;
  public legend: boolean;
  public data: any;

  constructor(json?: any) {
    const defaults = this.getDefaults();

    for (const prop in json) defaults[prop] = json[prop];

    for (const prop in defaults) this[prop] = defaults[prop];
  }

  private getDefaults() {
      return {
        data:  [],
        xAxisLabel: '',
        yAxisLabel: '',
        showXAxisLabel: true,
        showYAxisLabel: true,
        xAxis: true,
        yAxis: true,
        legend: true
      };
  }
}
