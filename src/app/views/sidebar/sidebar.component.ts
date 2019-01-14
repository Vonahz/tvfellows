import { Component, OnInit, OnDestroy } from '@angular/core';
import { TdbService } from 'src/app/services/tmdb/tdb.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  myTvCounter: number;
  myTvCounterSub: Subscription = new Subscription();
  constructor(
    private tmdb: TdbService
  ) { }

  ngOnInit() {
    this.myTvCounterSub = this.tmdb.numberOfMyTvsObs().subscribe((counter: number) => {
      this.myTvCounter = this.tmdb.userTvIds.length;
    });
  }

  ngOnDestroy() {
    this.myTvCounterSub.unsubscribe();
  }

}
