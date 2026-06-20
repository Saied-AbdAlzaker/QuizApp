import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { instructorGuard } from '../../guards/instructor.guard';
import { studentGuard } from '../../guards/student.guard';
import { QuizwizComponent } from './components/quizwiz/quizwiz.component';
import { UserProfileComponent } from 'src/app/shared/components/user-profile/user-profile.component';

const routes: Routes = [
  {path:'',component:QuizwizComponent,children:[
    {
      path: '', redirectTo:'instructor', pathMatch:'full'},
    {
      path: 'instructor',
      title:'Quizwiz | Instructor',
      canActivate:[instructorGuard],
      loadChildren: () => import('../../pages/instructor/instructor.module').then(m => m.InstructorModule)
    },
    {
      path: 'student',
      title:'Quizwiz | Student',
      canActivate:[studentGuard],
      loadChildren: () => import('../../pages/student/student.module').then(m => m.StudentModule)
    }, 
    {path:'profile/:id',component:UserProfileComponent}
  ]},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
