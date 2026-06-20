import { AddUpdateQuestionComponent } from '../add-update-question/add-update-question.component';
import { QuestionsService } from './../../services/questions.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { IQuestions } from '../../model/questions';
import { DeleteComponent } from 'src/app/shared/components/delete/delete.component';
import { ToastrService } from 'ngx-toastr';
import { TypeEnum, DifficultyEnum } from '../../model/difficulty.enum';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})

export class QuestionsComponent implements OnInit {

  questions: IQuestions | any;
  type: TypeEnum[] = [TypeEnum.FE, TypeEnum.BE, TypeEnum.DO]
  difficulty: DifficultyEnum[] = [DifficultyEnum.easy, DifficultyEnum.medium, DifficultyEnum.hard]
  constructor(private _questionService: QuestionsService, private dialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.allQuestions();
  }

  allQuestions() {
    this._questionService.getAllQuestions().subscribe({
      next: (res) => {
        console.log(res);
        this.questions = res;

      }
    })
  }

  //add 
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AddUpdateQuestionComponent, {
      width: '60%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  // update 
  openEditDialog(enterAnimationDuration: string, exitAnimationDuration: string, data: any): void {
    this.dialog.open(AddUpdateQuestionComponent,
      {
        width: '60%',
        data: {data},
        enterAnimationDuration,
        exitAnimationDuration,
      }
    );
    // call questions after closed
  }
  // View
  openViewDialog(enterAnimationDuration: string, exitAnimationDuration: string, data: IQuestions, view:boolean): void {
    this.dialog.open(AddUpdateQuestionComponent, {
      width: '60%',
      data: {data,view},
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  //delete Question
  openDeleteDialog(id: string,name:string): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {id,name},
      width: '40%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteRooms(result.id);
      }
    });
  }
  deleteRooms(id: string) {
    this._questionService.deleteQuestion(id).subscribe({
      next: (res) => {
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'Error!');
      },
      complete: () => {
        this.allQuestions();
        this.toastr.success('Question Deleted Successfully');
      },
    });
  }
  //search
  difficultySearch:string='';
  typeSearch:string='';
  searchQuestion(){
    // let params = {
    //   difficulty: this.difficultySearch,
    //   type: this.typeSearch
    // }
    this._questionService.onSearchQuestion(this.difficultySearch,this.typeSearch).subscribe({
      next:(res)=>{
        console.log(res);
        this.questions=res
      }
    })
  }

}
