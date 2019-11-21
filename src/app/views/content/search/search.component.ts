import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TdbService } from 'src/app/services/tmdb/tdb.service';
import { first } from 'rxjs/operators';
import { SearchResponse } from 'src/app/models/tdb/search-response.model';
import { TVShow } from 'src/app/models/tdb/tv-show.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  dataIsAvailable: boolean = false;
  tvs: TVShow[];
  query: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private tbdService: TdbService
  ) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        routeParams => {
          this.query = routeParams['query'];
          this.search();
        }
      );
  }


  search(): void {
    this.dataIsAvailable = false;

    this.tbdService.search(this.query)
      .pipe(first())
      .subscribe(
        (response: SearchResponse) => {
          this.tvs = response.results;
          this.dataIsAvailable = true;
        },
        error => {
          this.dataIsAvailable = true;
        }
      );
  }

  getImageUrl(imgUrl: string) {
    return this.tbdService.getImageMainUrl(imgUrl, '1');
  }

  follow(id: number) {
    this.tbdService.followTv(id);
  }

  isAlreadyFollowed(id: number): boolean {
    return this.tbdService.isUserFollowingThisTVID(id);
  }

}
