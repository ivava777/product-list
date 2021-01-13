import { NgModule } from '@angular/core';
import { CreateComponent } from './create/create.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CreateComponent],
  imports: [SharedModule, RouterModule.forChild([{ path: '', component: CreateComponent }])],
})
export class CreateModule {}
