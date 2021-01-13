import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { PageSizes } from 'src/app/models/models';
import { setProductsViewParams } from 'src/app/store/products.actions';
import { AppState } from 'src/app/store/products.reducer';
import { selectProducts, selectProductsViewTable } from 'src/app/store/products.selectors';

@Component({
  selector: 'app-list-pagination',
  templateUrl: './list-pagination.component.html',
  styleUrls: ['./list-pagination.component.scss'],
})
export class ListPaginationComponent implements OnInit {
  @Input()
  pageNum!: number;
  @Input()
  pageSize!: number;
  pageSizesArray = Object.values(PageSizes);
  nextPageAvailable$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.nextPageAvailable$ = this.store.select(selectProductsViewTable).pipe(
      withLatestFrom(this.store.select(selectProducts)),
      map(([action, products]) => products.length >= this.pageSize * this.pageNum)
    );
  }

  ngOnInit(): void {}

  onPreviousPage(): void {
    this.pageNum--;
    this.store.dispatch(setProductsViewParams({ pageNum: this.pageNum, pageSize: this.pageSize }));
  }

  onNextPage(): void {
    this.pageNum++;
    this.store.dispatch(setProductsViewParams({ pageNum: this.pageNum, pageSize: this.pageSize }));
  }

  onChangePageSize(): void {
    this.store.dispatch(setProductsViewParams({ pageNum: this.pageNum, pageSize: this.pageSize }));
  }
}
