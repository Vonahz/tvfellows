import { Component, OnInit, OnDestroy } from '@angular/core';
import { TdbService } from 'src/app/services/tmdb/tdb.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-top-tv',
  templateUrl: './top-tv.component.html',
  styleUrls: ['./top-tv.component.scss']
})
export class TopTvComponent implements OnInit, OnDestroy {
  topTVSub: Subscription = new Subscription();
  topTvShows: Array<any> = [];
  imageMainUrl: string;
  constructor(
    private tmdb: TdbService
  ) { }

  ngOnInit() {
    this.tmdb.page = 1;
    this.topTVSub = this.tmdb.getTopTvShows().subscribe((res: any) => {
      if (res) {
        this.topTvShows = res.results;
      }
    },
      error => console.error(error));
  }

  getImageUrl(imgUrl: string) {
    return this.tmdb.getImageMainUrl(imgUrl);
  }

  follow(id: number) {
    this.tmdb.followTv(id);
  }

  onScroll() {
    this.tmdb.page++;
    this.topTVSub = this.tmdb.getPopularTvShows().subscribe((res: any) => {
      if (res) {
        this.topTvShows = [...this.topTvShows, ...res.results];
      }
    },
      error => console.error(error));
  }

  ngOnDestroy(): void {
    this.topTVSub.unsubscribe();
  }
}
