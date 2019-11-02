import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { TdbService } from 'src/app/services/tmdb/tdb.service';

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
      map(e => {
        if (e) {
          return true;
        }
      }),
      catchError((err) => {
        this.router.navigate(['/error']);
        return of(false);
      })
    );
  }
}
