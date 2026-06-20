import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../service/student.service';
import { IQuizzes } from '../../../instructor/modules/quizes/model/quizzes';
import { GroupsService } from '../../../instructor/modules/groupes/sevice/groups.service';
import { IGroup } from '../../../instructor/modules/groupes/model/groups';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  completedQuizzes:IQuizzes[]=[];
  groupsId: string[]=[];
  groupName:string|null=localStorage.getItem('groupName')

  constructor(
    private _StudentService:StudentService,
    private _GroupsService:GroupsService
    ){}

  ngOnInit(): void {
    this.getCompletedQuiz()
    // this.getGroupById(this.groupId)
  }

  getCompletedQuiz(){
    this._StudentService.onGetCompletedQuiz().subscribe({
      next:(res)=>{
        console.log(res);
        this.completedQuizzes=res
        // this.completedQuizzes.forEach((quiz:IQuizzes) => {
        //   this.groupsId.push(quiz.group)
        // });
      }
    })
  }
  // getGroupById(id:string){
  //   this._GroupsService.onGetGroupById(id).subscribe({
  //     next:(res)=>{
  //       this.groupName=res.name
        
  //     }
  //   })
  // }
}
