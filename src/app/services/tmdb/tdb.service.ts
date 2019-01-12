import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

const topTVUrl = `${environment.apiUrl}/top_rated`;
const tvDetailsUrl = `${environment.apiUrl}`;
const popularTVUrl = `${environment.apiUrl}/popular`;


const IMAGES_URL_W92 = "https://image.tmdb.org/t/p/w92/" // + 'image url'
const IMAGES_URL_W200 = "https://image.tmdb.org/t/p/w200/" // + 'image url'


@Injectable({
  providedIn: 'root'
})
export class TdbService {

  language: string = 'en-US';
  page: number = 1;

  userTVIDs: number[] = [];

  userTVDetailsSubj: BehaviorSubject<any[]> = new BehaviorSubject([]);
  userTVDetailsData: any[] = [];

  constructor(
    private http: HttpClient
  ) {
    if (localStorage.getItem('tvs')) {
      this.userTVIDs = JSON.parse(localStorage.getItem('tvs'));
    }
  }

  getTopTvShows(): any {
    return this.http.get(`${topTVUrl}?api_key=${environment.apiKey}&&language=${this.language}&&page=${this.page}`);
  }

  getPopularTvShows(): any {
    return this.http.get(`${popularTVUrl}?api_key=${environment.apiKey}&&language=${this.language}&&page=${this.page}`);
  }

  getTVDetails(id: number): any {
    return this.http.get(`${tvDetailsUrl}/${id}?api_key=${environment.apiKey}&&language=${this.language}`);
  }

  getImageMainUrl(imgUrl: string): string {
    return IMAGES_URL_W200 + imgUrl;
  }

  followTv(tvID: number) {
    if (this.userTVIDs.indexOf(tvID) === -1) {
      this.userTVIDs.push(tvID);
      localStorage.setItem('tvs', JSON.stringify(this.userTVIDs));
    }
  }

  removeTv(tvID: number) {
    if (this.userTVIDs.indexOf(tvID) > -1) {
      this.userTVIDs.splice(this.userTVIDs.indexOf(tvID), 1);
    }
    localStorage.setItem('tvs', JSON.stringify(this.userTVIDs))
  }

  hasTVs() {
    if (this.userTVIDs.length > 0) {
      return true;
    }

    return false;
  }

  getMyTVDetails(): Observable<any[]> {
    this.userTVDetailsData = [];
    this.userTVDetailsSubj.next(this.userTVDetailsData);
    this.userTVIDs.forEach((tvID: number) => {
      this.getTVDetails(tvID).subscribe(
        (tvDetails: any) => {
          this.userTVDetailsData.push(tvDetails);
          this.userTVDetailsSubj.next(this.userTVDetailsData);
        }
      )
    });

    return this.userTVDetailsSubj.asObservable();
  }

  clearMyTVs() {
    localStorage.removeItem('tvs');
    this.userTVIDs = [];
  }
}
