import { NgModule } from '@angular/core';
import { EditComponent } from './edit/edit.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [EditComponent],
  imports: [SharedModule, RouterModule.forChild([{ path: '', component: EditComponent }])],
})
export class EditModule {}
