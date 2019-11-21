import { Component, OnInit, OnDestroy } from '@angular/core';
import { TdbService } from 'src/app/services/tmdb/tdb.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-tv',
  templateUrl: './my-tv.component.html',
  styleUrls: ['./my-tv.component.scss']
})
export class MyTvComponent implements OnInit, OnDestroy {
  tvDetailsSub : Subscription = new Subscription();
  userHasTVs: boolean = false;
  tvs: any[] = [];

  constructor(
    private tmdb: TdbService
  ) { }

  ngOnInit() {
    this.userHasTVs = this.tmdb.hasTVs();
    if (this.userHasTVs) {
      this.tvDetailsSub = this.tmdb.getMyTVDetails().subscribe((tvWithDetails: any) => {
        this.tvs = tvWithDetails;
      });
    }
  }

  deleteAllTVs() {
    this.tmdb.clearMyTVs();
    this.userHasTVs = this.tmdb.hasTVs();
  }

  getImageUrl(imgUrl: string) {
    return this.tmdb.getImageMainUrl(imgUrl);
  }

  unfollow(id : number) : void {
    this.tmdb.removeTv(id);
    this.userHasTVs = this.tmdb.hasTVs();
  }

  ngOnDestroy(): void {
    this.tvDetailsSub.unsubscribe();
  }
}
