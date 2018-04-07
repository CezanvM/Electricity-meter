import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-paginationbar',
  templateUrl: './paginationbar.component.html',
  styleUrls: ['./paginationbar.component.scss']
})
export class PaginationbarComponent implements OnInit {

  public title = '';
  public icon = '';
  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.subscribeToRouter();
  }

  private subscribeToRouter() {
    this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map((route) => {
        while (route.firstChild) { route = route.firstChild; }
        return route;
      })
      .filter((route) => route.outlet === 'primary')
      .mergeMap((route) => route.data)
      .subscribe((event) => {
        this.title = event.title;
        this.icon = event.icon;
      });
  }

}
