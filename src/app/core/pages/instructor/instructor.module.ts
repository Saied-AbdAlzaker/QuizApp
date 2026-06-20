import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructorRoutingModule } from './instructor-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardInstructComponent } from './components/dashboard-instruct/dashboard-instruct.component';


@NgModule({
  declarations: [
    DashboardInstructComponent
  ],
  imports: [
    CommonModule,
    InstructorRoutingModule,
    SharedModule
  ],
  exports:[DashboardInstructComponent]
})
export class InstructorModule { }
