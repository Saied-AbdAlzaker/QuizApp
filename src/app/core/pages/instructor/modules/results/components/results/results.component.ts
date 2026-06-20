import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewResultsComponent } from 'src/app/core/pages/student/components/view-results/view-results.component';
import { IAllResults } from 'src/app/core/pages/student/model/student';
import { StudentService } from 'src/app/core/pages/student/service/student.service';
import { GroupsService } from '../../../groupes/sevice/groups.service';
import { QuizzesService } from '../../../quizes/services/quizzes.service';
import { IQuizzes } from '../../../quizes/model/quizzes';
import { IcompletedQuiz } from '../../model/result';
import { Group } from '../../../groupes/model/groups';
import { ViewResultInstructorComponent } from '../view-result-instructor/view-result-instructor.component';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  completedQuizzes:IcompletedQuiz[]=[]
  groupName:string='';
  studentList:number|undefined=0;
  group?:Group;

  constructor(private dialog: MatDialog, private _quizzesService: QuizzesService, private _StudentService: StudentService,
    private _GroupsService: GroupsService, private _ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCompletedQuizzes()
  }
  getCompletedQuizzes() {
    this._quizzesService.onGetlastFiveCompeletedQuizzes().subscribe({
      next: (res) => {
        console.log(res);

        this.completedQuizzes = res
        for (let Q of this.completedQuizzes) {
          this.getGroupById(Q.group)
        }

      }
    })
  }

  getGroupById(id: string) {
    this._GroupsService.onGetGroupById(id).subscribe({
      next: (res) => {
        console.log(res);
        // this.group = res;
        this.groupName = res.name
        this.studentList = res.students.length
      }
    })
  }

  // // View
  // openViewDialog(enterAnimationDuration: string, exitAnimationDuration: string, data: any, view: boolean): void {
  //   this.dialog.open(ViewResultInstructorComponent, {
  //     width: '60%',
  //     data: { data, view },
  //     enterAnimationDuration,
  //     exitAnimationDuration,
  //   });
  // }


}
