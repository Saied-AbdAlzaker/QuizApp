import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { QuizzesService } from '../../services/quizzes.service';
import { IQuizzes } from '../../model/quizzes';
import { ActivatedRoute } from '@angular/router';
import { SetupComponent } from '../setup/setup.component';

@Component({
  selector: 'app-quiz-details',
  templateUrl: './quiz-details.component.html',
  styleUrls: ['./quiz-details.component.scss']
})
export class QuizDetailsComponent implements OnInit {

  quizze: IQuizzes|any;
  quizzeList: IQuizzes | any;
  quizzeId: any;

  constructor(private dialog: MatDialog, private _quizzesService: QuizzesService, private _ActivatedRoute: ActivatedRoute) {
    this.quizzeId = _ActivatedRoute.snapshot.params['_id'];
  }


  ngOnInit(): void {
    this.quizzeById(this.quizzeId);
  }

  quizzeById(id: string) {
    this._quizzesService.getQuizzeById(id).subscribe({
      next: (res) => {
        console.log(res);
        this.quizze = res;
        // this.quizzeList = this.quizze.data;


      }
    })
  }

  // Update
  openUpdateDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    data: any
  ): void {
    this.dialog.open(SetupComponent, {
      width: '60%',
      data: data,
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

}
