import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionsGuard } from './guards/permission.guard';
import { UserRoles } from './models/models';

const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', loadChildren: () => import('./list/list.module').then((m) => m.ListModule) },
  {
    path: 'create',
    canActivate: [PermissionsGuard],
    data: { permission: UserRoles.admin },
    loadChildren: () => import('./create/create.module').then((m) => m.CreateModule),
  },
  {
    path: 'edit',
    canActivate: [PermissionsGuard],
    data: { permission: [UserRoles.admin, UserRoles.owner] },
    children: [
      {
        path: ':id',
        loadChildren: () => import('./edit/edit.module').then((m) => m.EditModule),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
