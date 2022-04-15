import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Route, Router, CanActivateChild, CanLoad } from '@angular/router';
import { SIDE_MENU_LIST } from 'src/app/core/constants/app-constants';
import { AppData } from '../services/app-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(public router: Router) { }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // console.log(state);
    if (state.url === '/' && !AppData.isAuthenticated) {
      this.router.navigate(['/login']);
      return false;
    }
    SIDE_MENU_LIST.forEach((menu, index) => {
      if (state.url.indexOf(menu.url) >= 0) {
        if (menu.subMenu) {

          let index = menu.subMenu.findIndex(i => {
            return state.url == i.url;
          })
          AppData.selectedSubIndexSub$.next(index);
        }
        AppData.selectedIndexSub$.next(index);
      }
    });
    return true;
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    try {
      // console.log(state);
      if (state.url === '/' && !AppData.isAuthenticated) {
        this.router.navigate(['/login']);
        return false;
      }
      SIDE_MENU_LIST.forEach((menu, index) => {
        if (state.url.indexOf(menu.url) >= 0) {
          AppData.selectedIndexSub$.next(index);
        }
      });
      return true;
    } catch (error) {
      // console.log(error);
    }
    return true;
  }

  canLoad(route: Route) {
    // console.log('route can load');
    // console.log(AppData.isAuthenticated);
    if (AppData.isAuthenticated) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
