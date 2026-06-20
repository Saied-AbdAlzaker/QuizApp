import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { StudentsService } from 'src/app/core/pages/instructor/modules/students/services/students.service';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.scss'],
})
export class UpdateAccountComponent {
  role: string | null = localStorage.getItem('role');
  updateAccountForm = new FormGroup({
    first_name: new FormControl(null),
    last_name: new FormControl(null),
    email: new FormControl(null),
  });
  constructor(
    public dialogRef: MatDialogRef<UpdateAccountComponent>,
    private _StudentsService: StudentsService,
    private toastr: ToastrService
  ) {}
  updateAccount(data: FormGroup) {
    if (this.role == 'Instructor') {
      this._StudentsService.onUpdateInstructorAccount(data.value).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          this.toastr.error(err.error.message, 'Error!');
        },
        complete: () => {
          this.toastr.success('Your account updated successfully');
          this.onClose();
        },
      });
    } else {
      this._StudentsService.onUpdateStudentAccount(data.value).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          this.toastr.error(err.error.message, 'Error!');
        },
        complete: () => {
          this.toastr.success('Your account updated successfully');
          this.onClose();
        },
      });
    }
  }
  onClose(): void {
    this.dialogRef.close();
  }
}
