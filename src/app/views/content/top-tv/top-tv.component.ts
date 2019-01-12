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
    this.topTVSub = this.tmdb.getTopTvShows().subscribe((res: any) => {
      if (res) {
        this.topTvShows = res.results;
        console.log(this.topTvShows);
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

  ngOnDestroy(): void {
    this.topTVSub.unsubscribe();
  }
}
