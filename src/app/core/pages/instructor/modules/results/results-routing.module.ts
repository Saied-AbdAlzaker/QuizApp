import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultsComponent } from './components/results/results.component';
import { ViewResultInstructorComponent } from './components/view-result-instructor/view-result-instructor.component';

const routes: Routes = [
  {path:'',component:ResultsComponent},
  {path:'view-result/:id', component: ViewResultInstructorComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultsRoutingModule { }
