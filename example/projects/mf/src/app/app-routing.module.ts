import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowmfComponent } from './showmf/showmf.component';

const routes: Routes = [
  {
    path:'',
    component: ShowmfComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
