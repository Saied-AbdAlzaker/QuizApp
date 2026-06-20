import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../service/student.service';
import { ViewResultsComponent } from '../view-results/view-results.component';
import { MatDialog } from '@angular/material/dialog';
import { IAllResults } from '../../model/student';
import { GroupsService } from '../../../instructor/modules/groupes/sevice/groups.service';
import { IGroup } from '../../../instructor/modules/groupes/model/groups';

@Component({
  selector: 'app-results-student',
  templateUrl: './results-student.component.html',
  styleUrls: ['./results-student.component.scss']
})
export class ResultsStudentComponent implements OnInit {

  resultsData: IAllResults | any;
  quizData: IAllResults | any
  groups: IGroup[] = [];

  groupName: string = '';
  studentList: IGroup[] | any;




  constructor(private _StudentService: StudentService, private dialog: MatDialog,
    private _GroupsService: GroupsService, 
  ) { }

  ngOnInit(): void {
    this.allResults();
    // this.getAllGroups();
  }

  allResults() {
    this._StudentService.getAllResults().subscribe({
      next: (res) => {
        console.log(res);

        this.resultsData = res;

      }
    })
  }

  getGroupById(id: string) {
    this._GroupsService.onGetGroupById(id).subscribe({
      next: (res) => {
        console.log(res);
        this.groupName = res.name;
        // this.groupId=res._id;
        this.studentList = res.students;
        // this.studentsWithoutGroup=null
      },
    });
  }

  // View
  openViewDialog(enterAnimationDuration: string, exitAnimationDuration: string, data: any, view: boolean): void {
    this.dialog.open(ViewResultsComponent, {
      width: '60%',
      data: { data, view },
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

}
