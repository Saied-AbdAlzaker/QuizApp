import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/auth/services/auth.service';

interface IMenu {
  title: string,
  icon: string,
  link: string,
  isActive: Boolean
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent {
  @Output() isOpenedValue = new EventEmitter<boolean>();
  isOpened:boolean =true;
  isMaxHeight:boolean=true;
  is100vHeight:boolean=false;

  constructor(
    private _AuthService: AuthService, 
    private router: Router,
    private toastr: ToastrService, 
    public dialog: MatDialog) { }


  isInstructor(): boolean {
    return this._AuthService.role == 'Instructor' ? true : false;
  }
  isStudent(): boolean {
    return this._AuthService.role == 'Student' ? true : false;
  }
  ngOnInit() { }

 menu:IMenu[]=[
   {
     title: 'Dashboard',
     icon: 'Dashboard-icon.svg',
     link: '/quizwiz/instructor/dashboard',
     isActive: this.isInstructor()
   },
   {
     title: 'Groups',
     icon: 'Students-icon.svg',
     link: '/quizwiz/instructor/groups',
     isActive: this.isInstructor()
   },
   {
    title: 'Students',
    icon: 'Students-icon.svg',
    link: '/quizwiz/instructor/students',
    isActive: this.isInstructor()
  },
  {
    title: 'Quizzes',
    icon: 'Quiz-icon.svg',
    link: '/quizwiz/instructor/quizzes',
    isActive: this.isInstructor()
  },
  {
    title: 'Results',
    icon: 'Results-icon.svg',
    link: '/quizwiz/instructor/results',
    isActive: this.isInstructor()
  },
   {
    title: 'Dashboard',
    icon: 'Dashboard-icon.svg',
    link: '/quizwiz/student/dashboard',
    isActive: this.isStudent()
  },
  {
    title: 'quizzes',
    icon: 'Quiz-icon.svg',
    link: '/quizwiz/student/quizzes',
    isActive: this.isStudent()
  },
  {
    title: 'Results',
    icon: 'Results-icon.svg',
    link: '/quizwiz/student/results',
    isActive: this.isStudent()
  }
  
 ]
 onClicked() {
  this.isOpened = !this.isOpened;
  this.isOpenedValue.emit(this.isOpened);
  console.log(this.isOpened)
}
@HostListener('window:scroll', [])
  onWindowScroll() {
    const offset = window.scrollY;
    this.isMaxHeight = offset < 64;
    this.is100vHeight= offset > 64;
  }
}
