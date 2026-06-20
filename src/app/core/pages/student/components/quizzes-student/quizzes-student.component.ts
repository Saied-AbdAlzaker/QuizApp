import { Component, OnInit } from '@angular/core';
import { JoinQuizComponent } from '../join-quiz/join-quiz.component';
import { MatDialog } from '@angular/material/dialog';
import { QuizzesService } from '../../../instructor/modules/quizes/services/quizzes.service';
import { IQuizzes } from '../../../instructor/modules/quizes/model/quizzes';
import { StudentService } from '../../service/student.service';

@Component({
  selector: 'app-quizzes-student',
  templateUrl: './quizzes-student.component.html',
  styleUrls: ['./quizzes-student.component.scss']
})
export class QuizzesStudentComponent implements OnInit {
  upcommingQuizzes: IQuizzes[]=[];

  constructor(
    private dialog: MatDialog,
    private _QuizzesService:QuizzesService,
    private _StudentService:StudentService
  ){}
  ngOnInit(): void {
    this.getUpcommingQuizzes()
  }
//join quiz dialog
openJoinDialog(
  enterAnimationDuration: string,
  exitAnimationDuration: string,
): void {
  this.dialog.open(JoinQuizComponent, {
    width: '40%',
    enterAnimationDuration,
    exitAnimationDuration,
  });
}

//get quizzes 
getUpcommingQuizzes() {
  this._QuizzesService.onGetFiveUpcommingQuizzes().subscribe({
    next: (res) => {
      console.log(res);
      this.upcommingQuizzes = res;
    },
  });
}


}
