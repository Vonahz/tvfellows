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
  popularTvShows: Array<any> = [];
  imageMainUrl: string;
  constructor(
    private tmdb: TdbService
  ) { }

  ngOnInit() {
    this.tmdb.page = 1;
    this.popularSub = this.tmdb.getPopularTvShows().subscribe((res: any) => {
      if (res) {
        this.popularTvShows = res.results;
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

  isAlreadyFollowed(id: number): boolean {
    return this.tmdb.isUserFollowingThisTVID(id);
  }

  onScroll() {
    this.tmdb.page++;
    this.popularSub = this.tmdb.getPopularTvShows().subscribe((res: any) => {
      if (res) {
        this.popularTvShows = [...this.popularTvShows, ...res.results];
      }
    },
      error => console.error(error));
  }

  ngOnDestroy(): void {
    this.popularSub.unsubscribe();
  }

}
