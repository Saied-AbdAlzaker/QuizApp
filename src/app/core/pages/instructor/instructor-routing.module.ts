import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardInstructComponent } from './components/dashboard-instruct/dashboard-instruct.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardInstructComponent },
  {
    path: 'groups',
    loadChildren: () =>
      import('../instructor/modules/groupes/groupes.module').then(
        (m) => m.GroupesModule
      ),
  },
  {
    path: 'questions',
    loadChildren: () =>
      import('../instructor/modules/questions/questions.module').then(
        (m) => m.QuestionsModule
      ),
  },
  {
    path: 'quizzes',
    loadChildren: () =>
      import('../instructor/modules/quizes/quizes.module').then(
        (m) => m.QuizesModule
      ),
  },
  {
    path: 'results',
    loadChildren: () =>
      import('../instructor/modules/results/results.module').then(
        (m) => m.ResultsModule
      ),
  },
  {
    path: 'students',
    loadChildren: () =>
      import('../instructor/modules/students/students.module').then(
        (m) => m.StudentsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstructorRoutingModule {}
