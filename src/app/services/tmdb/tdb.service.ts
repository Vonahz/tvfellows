import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

const apiUrl = environment.apiUrl;
const topTVUrl = `${apiUrl}/top_rated`;
const popularTVUrl = `${apiUrl}/popular`;

const postersUrl = environment.postersUrl;
const IMAGES_URL_W92 = `${environment.postersUrl}/w92/`
const IMAGES_URL_W200 = `${environment.postersUrl}/w200/`;

@Injectable({
  providedIn: 'root'
})
export class TdbService {

  language: string = 'en-US';
  page: number = 1;

  userTvIds: number[] = [];

  userTVDetailsSubj: BehaviorSubject<any[]> = new BehaviorSubject([]);
  userTVDetailsData: any[] = [];

  constructor(
    private http: HttpClient
  ) {
    if (localStorage.getItem('tvs')) {
      this.userTvIds = JSON.parse(localStorage.getItem('tvs'));
    }
  }

  getTopTvShows(): any {
    return this.http.get(`${topTVUrl}?api_key=${environment.apiKey}&&language=${this.language}&&page=${this.page}`);
  }

  getPopularTvShows(): any {
    return this.http.get(`${popularTVUrl}?api_key=${environment.apiKey}&&language=${this.language}&&page=${this.page}`);
  }

  getTVDetails(id: number): any {
    return this.http.get(`${apiUrl}/${id}?api_key=${environment.apiKey}&&language=${this.language}`);
  }

  getImageMainUrl(imgUrl: string): string {
    return IMAGES_URL_W200 + imgUrl;
  }

  followTv(tvID: number) {
    if (this.userTvIds.indexOf(tvID) === -1) {
      this.userTvIds.push(tvID);
      localStorage.setItem('tvs', JSON.stringify(this.userTvIds));
    }
  }

  removeTv(tvID: number) {
    if (this.userTvIds.indexOf(tvID) > -1) {
      this.userTvIds.splice(this.userTvIds.indexOf(tvID), 1);
    }
    localStorage.setItem('tvs', JSON.stringify(this.userTvIds))
  }

  hasTVs() {
    if (this.userTvIds.length > 0) {
      return true;
    }

    return false;
  }

  isUserFollowingThisTVID(id: number) {
    if (this.userTvIds.indexOf(id) > -1) {
      return true;
    }

    return false;
  }

  getMyTVDetails(): Observable<any[]> {
    console.log(this.userTvIds);
    this.userTVDetailsData = [];
    this.userTVDetailsSubj.next(this.userTVDetailsData);
    this.userTvIds.forEach((tvID: number) => {
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
    this.userTvIds = [];
  }
}
