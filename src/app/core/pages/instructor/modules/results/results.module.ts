import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultsRoutingModule } from './results-routing.module';
import { ResultsComponent } from './components/results/results.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewResultInstructorComponent } from './components/view-result-instructor/view-result-instructor.component';


@NgModule({
  declarations: [
    ResultsComponent,
    ViewResultInstructorComponent
  ],
  imports: [
    CommonModule,
    ResultsRoutingModule,
    SharedModule
  ]
})
export class ResultsModule { }
