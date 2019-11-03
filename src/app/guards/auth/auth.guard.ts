import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError, first } from 'rxjs/operators';

import { TdbService } from 'src/app/services/tmdb/tdb.service';
import { Configuration } from 'src/app/models/tdb/configuration.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private tdb: TdbService,
    private router: Router
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.tdb.getMainSettings().pipe(
      map((response: Configuration) => {
        if (response) {
          this.tdb.configuration = response;
          return true;
        }
        else {
          this.router.navigate(['/error'], { skipLocationChange: true });
          return false;
        }
      }),
      catchError((err) => {
        this.router.navigate(['/error'], { skipLocationChange: true });
        return of(false);
      })
    );
  }
}
