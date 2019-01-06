import { Component, OnInit } from '@angular/core';
import { TdbService } from '../../services/tmdb/tdb.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  topTvShows : Array<any> = [];
  imageMainUrl : string;
  constructor(
    private tmdb : TdbService
  ) { }

  ngOnInit() {
    this.imageMainUrl = this.tmdb.getImageMainUrl();
    this.tmdb.getTopTvShows().subscribe((res : any) => {
      if(res) {
        console.log( res.results)
        this.topTvShows = res.results.slice(0, 5);
      }

    })
  }

}
