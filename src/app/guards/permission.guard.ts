import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserRoles } from '../models/models';
import { AppState } from '../store/products.reducer';
import { selectUserRole } from '../store/products.selectors';

@Injectable({ providedIn: 'root' })
export class PermissionsGuard implements CanActivate {
  constructor(private store: Store<AppState>) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.store.select(selectUserRole).pipe(
      map((userRole) => {
        const pageAvailable = this.hasPermission(userRole, route.data.permission);
        if (!pageAvailable) {
          window.confirm('You do not have permissions to this page!');
        }
        return pageAvailable;
      })
    );
  }

  hasPermission(userRole: UserRoles, permission: UserRoles | UserRoles[]): boolean {
    if (Array.isArray(permission)) {
      return permission.includes(userRole);
    } else {
      return userRole === permission;
    }
  }
}
