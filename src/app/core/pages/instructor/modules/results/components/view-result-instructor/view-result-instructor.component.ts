import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizzesService } from '../../../quizes/services/quizzes.service';
import { ResultService } from '../../services/result.service';
import { IQuiz } from 'src/app/core/pages/student/model/student';
import { IResults, Participant } from '../../model/result';

@Component({
  selector: 'app-view-result-instructor',
  templateUrl: './view-result-instructor.component.html',
  styleUrls: ['./view-result-instructor.component.scss']
})
export class ViewResultInstructorComponent implements OnInit {

  quizId: string = '';
  quizTitle: IQuiz|any;
  participants: Participant[] = [];
  results: IResults[] = [];
  constructor(private _ActivatedRoute: ActivatedRoute, private _QuizesService: QuizzesService,
    private _ResultsService: ResultService) {
    this.quizId = _ActivatedRoute.snapshot.paramMap.get('id')!;

  }

  ngOnInit(): void {
    this.getQuizbyId()
    this.getAllResults()
  }

  getQuizbyId() {
    this._QuizesService.getQuizzeById(this.quizId).subscribe({
      next: (res) => {
        console.log(res);
        this.quizTitle = res

      }
    })
  }
  getAllResults() {
    this._ResultsService.allResult().subscribe({
      next: (res) => {
        console.log(res);
        this.results = res
        for (let res of this.results)
          this.participants = res.participants
      }
    })
  }

}
