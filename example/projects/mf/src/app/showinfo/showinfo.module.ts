import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowinfoRoutingModule } from './showinfo-routing.module';
import { ShowinfoComponent } from './showinfo.component';


@NgModule({
  declarations: [
    ShowinfoComponent
  ],
  imports: [
    CommonModule,
    ShowinfoRoutingModule
  ]
})
export class ShowinfoModule { }
