import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserRoles } from '../models/models';
import { setUserRole } from '../store/products.actions';
import { AppState } from '../store/products.reducer';
import { selectProducts } from '../store/products.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userRole: UserRoles = UserRoles.admin;
  userRoleArray = Object.values(UserRoles);

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.setUserRole();
  }

  onChangeRole(): void {
    this.setUserRole();
  }

  setUserRole(): void {
    this.store.dispatch(setUserRole({ role: this.userRole }));
  }
}
