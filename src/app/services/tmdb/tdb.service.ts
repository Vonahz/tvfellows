import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API_URL = "https://api.themoviedb.org/3/tv/top_rated?api_key=6917fecb06f478c815ac557c6dbeed65&language=en-US&page=1"
const IMAGES_URL = "https://image.tmdb.org/t/p/w92/" // + 'image url'

@Injectable({
  providedIn: 'root'
})
export class TdbService {

  constructor(
    private http: HttpClient
  ) { }

  getTopTvShows(): any {
    return this.http.get(API_URL);
  }

  getImageMainUrl(): string {
    return IMAGES_URL;
  }
}
