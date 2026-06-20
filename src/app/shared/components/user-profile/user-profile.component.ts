import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { IStudents } from 'src/app/core/pages/instructor/modules/students/model/students';
import { StudentsService } from 'src/app/core/pages/instructor/modules/students/services/students.service';
import { UpdateAccountComponent } from '../update-account/update-account.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  studentId: string = '';
  accountId: string | null = localStorage.getItem('userId');
  accountName: string | null = localStorage.getItem('userName');
  email: string | null = localStorage.getItem('email');
  role: string | null = localStorage.getItem('role');
  status: string | null = localStorage.getItem('status');
  student: IStudents | undefined;
  accountGroupName:string|null=localStorage.getItem('groupName')
  accountMode: boolean = true;
  studentViewMode: boolean = true;
  constructor(
    private _StudentsService: StudentsService,
    private ActivatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.studentId = this.ActivatedRoute.snapshot.params['id'];
  }
  ngOnInit(): void {
    if (this.studentId == this.accountId) {
      console.log(
        this.email,
        this.accountName,
        this.accountId,
        this.role,
        this.status
      );
      this.accountMode = true;
      this.studentViewMode = false;
    } else {
      this.getStudentById();
      this.accountMode = false;
      this.studentViewMode = true;
    }
  }
  getStudentById() {
    this._StudentsService.getStudentById(this.studentId).subscribe({
      next: (res) => {
        console.log(res);
        this.student = res;
      },
    });
  }
  openUpdateDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    id: string
  ): void {
    const dialogRef = this.dialog.open(UpdateAccountComponent, {
      data: { id },
      width: '60%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateAccount();
      }
    });
  }
  updateAccount() {}
}
