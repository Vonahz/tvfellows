import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Configuration } from 'src/app/models/tdb/configuration.model';

const apiUrl = environment.apiUrl;
const topTVUrl = `${apiUrl}/tv/top_rated`;
const popularTVUrl = `${apiUrl}/tv/popular`;
const configurationUrl = `${apiUrl}/configuration`;
const postersUrl = environment.postersUrl;

@Injectable({
  providedIn: 'root'
})
export class TdbService {

  configuration: Configuration;
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

  getMainSettings() {
    return this.http.get(`${configurationUrl}?api_key=${environment.apiKey}`);
  }

  getTopTvShows(): any {
    return this.http.get(`${topTVUrl}?api_key=${environment.apiKey}&&language=${this.language}&&page=${this.page}`);
  }

  getPopularTvShows(): any {
    return this.http.get(`${popularTVUrl}?api_key=${environment.apiKey}&&language=${this.language}&&page=${this.page}`);
  }

  getTVDetails(id: number): any {
    return this.http.get(`${apiUrl}/tv/${id}?api_key=${environment.apiKey}&&language=${this.language}`);
  }

  getImageMainUrl(imgUrl: string, size?: string): string {
    return `${postersUrl}/${this.configuration.images.poster_sizes[size || 0]}/${imgUrl}`;
  }

  followTv(tvID: number) : void {
    if (this.userTvIds.indexOf(tvID) === -1) {
      this.userTvIds.push(tvID);
      localStorage.setItem('tvs', JSON.stringify(this.userTvIds));
      this.getMyTVDetails();
    }
  }

  removeTv(tvID: number) {
    if (this.userTvIds.indexOf(tvID) > -1) {
      this.userTvIds.splice(this.userTvIds.indexOf(tvID), 1);
      localStorage.setItem('tvs', JSON.stringify(this.userTvIds));
      this.getMyTVDetails();
    }
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

    this.numberOfMyTvsObs();
    return this.userTVDetailsSubj.asObservable();
  }

  myTvsCounter: BehaviorSubject<number> = new BehaviorSubject(null);
  numberOfMyTvsObs(): Observable<number> {
    this.myTvsCounter.next(this.userTvIds.length);
    return this.myTvsCounter.asObservable();
  }

  clearMyTVs() {
    localStorage.removeItem('tvs');
    this.userTvIds = [];
    this.myTvsCounter.next(0);
  }
}
