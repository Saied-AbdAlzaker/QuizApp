import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizzesComponent } from './components/quizzes/quizzes.component';
import { SetupComponent } from './components/setup/setup.component';
import { QuizDetailsComponent } from './components/quiz-details/quiz-details.component';

const routes: Routes = [
  {path:'', title:'Quizzes', component:QuizzesComponent},
  {path:'setup',component:SetupComponent},
  {path:'quizDetails/:_id', component:QuizDetailsComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizesRoutingModule { }
