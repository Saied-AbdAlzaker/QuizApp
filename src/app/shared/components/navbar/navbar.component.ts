import { Component } from '@angular/core';
import { LogoutComponent } from '../logout/logout.component';
import { MatDialog } from '@angular/material/dialog';
import { SetupComponent } from 'src/app/core/pages/instructor/modules/quizes/components/setup/setup.component';
import { Router } from '@angular/router';
import { JoinQuizComponent } from 'src/app/core/pages/student/components/join-quiz/join-quiz.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  userName: string|null = localStorage.getItem('userName');
  role: string|null = localStorage.getItem('role');
  userId:string|null= localStorage.getItem('userId');
  userGroup:string|null= localStorage.getItem('groupName')
  constructor(
    public dialog: MatDialog,
    private router:Router
  ){}

  openLogoutDialog(): void{
    const dialogRef = this.dialog.open(LogoutComponent, {
      data: {},
      width: '35%',
    });

    dialogRef.afterClosed().subscribe((result: any) => {

    });
  }
  //setup quiz dialog
  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    const dialogRef = this.dialog.open(SetupComponent, {
      width: '60%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.router.navigate(['/quizwiz/instructor/quizzes'])
    });
  }
// join quiz
openJoinDialog(
  enterAnimationDuration: string,
  exitAnimationDuration: string
): void {
  this.dialog.open(JoinQuizComponent, {
    width: '40%',
    enterAnimationDuration,
    exitAnimationDuration,
  });
}
}
