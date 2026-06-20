import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizesRoutingModule } from './quizes-routing.module';
import { QuizzesComponent } from './components/quizzes/quizzes.component';
import { SetupComponent } from './components/setup/setup.component';
import { QuizDetailsComponent } from './components/quiz-details/quiz-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SetupEndComponent } from './components/setup-end/setup-end.component';

@NgModule({
  declarations: [
    QuizzesComponent,
    SetupComponent,
    QuizDetailsComponent,
    SetupEndComponent,
  ],
  imports: [
    CommonModule,
    QuizesRoutingModule,
    SharedModule
  ]
})
export class QuizesModule { }
