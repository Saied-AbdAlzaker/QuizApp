import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionsRoutingModule } from './questions-routing.module';
import { QuestionsComponent } from './components/questions/questions.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddUpdateQuestionComponent } from './components/add-update-question/add-update-question.component';


@NgModule({
  declarations: [
    QuestionsComponent,
    AddUpdateQuestionComponent,
  ],
  imports: [
    CommonModule,
    QuestionsRoutingModule,
    SharedModule
  ]
})
export class QuestionsModule { }
