import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
// import { DashboardComponent } from './components/dashboard/dashboard.component';
import { QuizwizComponent } from './components/quizwiz/quizwiz.component';


@NgModule({
  declarations: [
    // DashboardComponent,
    QuizwizComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
