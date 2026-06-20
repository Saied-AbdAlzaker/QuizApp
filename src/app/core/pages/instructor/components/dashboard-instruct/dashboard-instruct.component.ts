import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../modules/students/services/students.service';
import { IStudents } from '../../modules/students/model/students';
import { QuizzesService } from '../../modules/quizes/services/quizzes.service';
import { IQuizzes } from '../../modules/quizes/model/quizzes';

@Component({
  selector: 'app-dashboard-instruct',
  templateUrl: './dashboard-instruct.component.html',
  styleUrls: ['./dashboard-instruct.component.scss'],
})
export class DashboardInstructComponent implements OnInit {
  students: IStudents[] = [];
  quizzes: IQuizzes[]=[];
  constructor(
    private _StudentsService: StudentsService,
    private _QuizzesService: QuizzesService
  ) {}
  ngOnInit(): void {
    this.getUpcommingQuizzes();
    this.getTopFiveStudents();
  }
  getUpcommingQuizzes() {
    this._QuizzesService.onGetFiveUpcommingQuizzes().subscribe({
      next: (res) => {
        this.quizzes = res;
      },
    });
  }
  getTopFiveStudents() {
    this._StudentsService.onGetTopFiveStudents().subscribe({
      next: (res) => {
        this.students = res;
      },
    });
  }
}
