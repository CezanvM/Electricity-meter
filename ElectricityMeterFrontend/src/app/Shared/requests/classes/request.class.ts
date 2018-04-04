import {HttpParams} from '@angular/common/http';
import {Moment} from 'moment';
import moment = require('moment');

export class Request<T> {
  public url: string;
  public item: T;
  public filter: any;
  public select: any;
  public beginDate: Moment;
  public endDate: Moment;

  getParams(): HttpParams {
    const params = new HttpParams()
      .set('filter', JSON.stringify(this.filter) || JSON.stringify({}))
      .set('select', this.select || '')
      .set('beginDate', this.beginDate.format('DD-MM-YYYY') || moment().subtract('100', 'years').format('DD-MM-YYYY'))
      .set('endDate', this.endDate.format('DD-MM-YYYY') || moment().add('100', 'years').format('DD-MM-YYYY'));

    return params;
  }

  constructor() {
  }
}
