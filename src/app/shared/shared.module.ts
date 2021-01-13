import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './spinner/spinner.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [SpinnerComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, SpinnerComponent],
})
export class SharedModule {}
