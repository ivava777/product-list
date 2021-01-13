import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { productsReducer } from './store/products.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from './store/products.effects';
import { SharedModule } from './shared/shared.module';
import { PermissionsGuard } from './guards/permission.guard';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    StoreModule.forRoot({ products: productsReducer }),
    EffectsModule.forRoot([ProductsEffects]),
  ],
  providers: [PermissionsGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
