import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IQuestions } from '../../../instructor/modules/questions/model/questions';
import { StudentService } from '../../service/student.service';
import { FormControl, FormGroup } from '@angular/forms';
import { SetupEndComponent } from '../../../instructor/modules/quizes/components/setup-end/setup-end.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { IAnswers } from '../../model/student';
import { timer } from 'rxjs/internal/observable/timer';
import { map, takeWhile } from 'rxjs';

@Component({
  selector: 'app-answer-questions',
  templateUrl: './answer-questions.component.html',
  styleUrls: ['./answer-questions.component.scss'],
})
export class AnswerQuestionsComponent implements OnInit {
  @Input() time = 0;
  timeRemaining$: any;
  quizId: string = '';
  questions: IQuestions[] = [];
  options: any;
  answerForm = new FormGroup({
    answer: new FormControl(null),
  });
  answers: IAnswers[] = [];
  submitted:boolean=false;
  constructor(
    private ActivatedRoute: ActivatedRoute,
    private _StudentService: StudentService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private router:Router
  ) {
    this.quizId = ActivatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getQuestionsWithoutAnswer();
  }

  //get questions
  getQuestionsWithoutAnswer() {
    this._StudentService.onGetQuestionsWithoutAnswers(this.quizId).subscribe({
      next: (res) => {
        console.log(res);
        this.questions = res.data?.questions;
        console.log(this.questions);
        this.time = res.data?.duration;
        this.timeRemaining$ = timer(0, 1000).pipe(
          map((n) => (this.time - n) * 1000),
          takeWhile((n) => n >= 0)
        );
      },
      complete: () => {
        this.timeRemaining$.subscribe((n: any) => {
          if (n <= 0 && this.submitted==false) {
            this.submitAllAnswers();        
          }
        });
      },
    });
  }
  // add answer to answers array
  addAnswer(data: FormGroup, question: string) {
    let answer = data.value.answer;
    this.answers.push({ answer, question });
    console.log(this.answers);
  }
  //submit answers
  submitAllAnswers() {
    this._StudentService.onSubmitQuestion(this.answers, this.quizId).subscribe({
      next: (res) => {
        console.log(res);
        this.openSubmitDialog(res.message, res.data?.score);
      },
      error: (err) => {
        this.toastr.error(err.error.message);
      },
      complete: () => {
        this.router.navigate(['/quizwiz/student/results']);
        this.submitted=true;
      },
    });
  }
  //end dialog
  openSubmitDialog(message: string, score: number): void {
    const dialogRef = this.dialog.open(SetupEndComponent, {
      data: { message, score },
      width: '30%',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
  }
}
