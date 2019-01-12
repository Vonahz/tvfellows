import { Component, OnInit, OnDestroy } from '@angular/core';
import { TdbService } from 'src/app/services/tmdb/tdb.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-popular-tv',
  templateUrl: './popular-tv.component.html',
  styleUrls: ['./popular-tv.component.scss']
})
export class PopularTvComponent implements OnInit, OnDestroy {
  popularSub: Subscription = new Subscription();
  topTvShows: Array<any> = [];
  imageMainUrl: string;
  constructor(
    private tmdb: TdbService
  ) { }

  ngOnInit() {
    this.popularSub = this.tmdb.getPopularTvShows().subscribe((res: any) => {
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
    this.popularSub.unsubscribe();
  }

}
