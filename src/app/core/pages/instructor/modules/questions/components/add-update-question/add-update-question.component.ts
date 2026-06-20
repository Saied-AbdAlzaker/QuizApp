import { Component, Inject, OnInit, Type } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuestionsService } from '../../services/questions.service';
import { AnswerEnum, DifficultyEnum, TypeEnum } from '../../model/difficulty.enum';
import { ToastrService } from 'ngx-toastr';
import { IQuestions } from '../../model/questions';

@Component({
  selector: 'app-add-update-question',
  templateUrl: './add-update-question.component.html',
  styleUrls: ['./add-update-question.component.scss']
})
export class AddUpdateQuestionComponent implements OnInit {
  questionDetails: IQuestions | undefined | any
  addMode: boolean = true;
  updateMode: boolean = true;
  viewMode: boolean = true;
  questionForm = new FormGroup({
    title: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    options: new FormGroup({
      A: new FormControl(null, [Validators.required]),
      B: new FormControl(null, [Validators.required]),
      C: new FormControl(null, [Validators.required]),
      D: new FormControl(null, [Validators.required]),
    }),
    answer: new FormControl(null, Validators.required),
    difficulty: new FormControl(null, Validators.required),
    type: new FormControl(null, Validators.required),
  });
  answer: AnswerEnum[] = [AnswerEnum.A, AnswerEnum.B, AnswerEnum.C, AnswerEnum.D];
  type: TypeEnum[] = [TypeEnum.BE, TypeEnum.DO, TypeEnum.FE]
  difficulty: DifficultyEnum[] = [DifficultyEnum.easy, DifficultyEnum.medium, DifficultyEnum.hard]

  constructor(
    public dialogRef: MatDialogRef<AddUpdateQuestionComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _QuestionsService: QuestionsService,
    private toastr: ToastrService
  ) { }
  ngOnInit(): void {
    if (this.data !== null) {
      this.getQuestionById(this.data.data)
      this.addMode = false;
      this.updateMode = true;
      this.viewMode = false
      if (this.data.view) {
        this.viewMode = true;
        this.updateMode = false
        this.addMode = false
        this.questionForm.disable()
      }
    }
    else {
      this.addMode = true;
      this.updateMode = false;
      this.viewMode = false
    }
  }

  onSubmit(data: FormGroup) {
    if (this.data !== null) {
      this._QuestionsService.updateQuestion(data.value, this.data.data).subscribe({
        next: (res) => {
          console.log(res);
        }, error: (err) => {
          this.toastr.error(err.error.message, 'Error!')
        }, complete: () => {
          this.onNoClick()
          setTimeout(function () {
            location.reload();
          }, 3000);
          this.toastr.success('Question Updated Successfully');
        }
      })
    }
    else {
      this._QuestionsService.addQuestion(data.value).subscribe({
        next: (res) => {
          console.log(res);
        }, error: (err) => {
          this.toastr.error(err.error.message, 'Error!')
        }, complete: () => {
          this.onNoClick()
          setTimeout(function () {
            location.reload();
          }, 3000);
          this.toastr.success('Question Created Successfully');
        }
      })
    }

  }
  getQuestionById(id: string) {
    this._QuestionsService.getQuestionById(id).subscribe({
      next: (res) => {
        console.log(res);
        this.questionDetails = res
      }, error: (err) => {

      }, complete: () => {
        this.questionForm.patchValue({
          title: this.questionDetails?.title,
          description: this.questionDetails?.description,
          options: ({
            A: this.questionDetails?.options?.A,
            B: this.questionDetails?.options?.B,
            C: this.questionDetails?.options?.C,
            D: this.questionDetails?.options?.D,
          }),
          answer: this.questionDetails?.answer,
          difficulty: this.questionDetails?.difficulty,
          type: this.questionDetails?.type,
        })
      }
    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
