import { NgModule } from '@angular/core';
import { ListComponent } from './list/list.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ListPaginationComponent } from './list-pagination/list-pagination.component';

@NgModule({
  declarations: [ListComponent, ListPaginationComponent],
  imports: [SharedModule, RouterModule.forChild([{ path: '', component: ListComponent }])],
})
export class ListModule {}
