import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../services/students.service';
import { MatDialog } from '@angular/material/dialog';
import { IStudents, IStudentsGroups } from '../../model/students';
import { IGroup } from '../../../groupes/model/groups';
import { GroupsService } from '../../../groupes/sevice/groups.service';
import { DeleteComponent } from 'src/app/shared/components/delete/delete.component';
import { ToastrService } from 'ngx-toastr';
import { AddToGroupComponent } from '../add-to-group/add-to-group.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})

export class StudentsComponent implements OnInit {
  studentList: IGroup[] | any;
  studentGroups: IStudents | any;
  studentsWithoutGroup:IStudents|any
  groups: IGroup[] = [];
  groupName: string = '';
  groupId: string='';
  // studentList: IStudents[] | any;

  constructor(
    private _studentsService: StudentsService,
    private dialog: MatDialog,
    private _GroupsService: GroupsService,
    private toastr:ToastrService
  ) {}

  ngOnInit(): void {
    // this.allStudentsWithoutGroups();
    this.allStudents();
    this.getAllGroups();
  }

  allStudentsWithoutGroups() {
    this._studentsService.getAllStudentsWithoutGroup().subscribe({
      next: (res) => {
        console.log(res);
        this.studentsWithoutGroup=res
        this.studentList=null
      }
    })
  }
  getAllGroups() {
    this._GroupsService.onGetAllGroups().subscribe({
      next: (res) => {
        this.groups = res;
      },
    });
  }
  getGroupById(id: string) {
    this._GroupsService.onGetGroupById(id).subscribe({
      next: (res) => {
        console.log(res);
        this.groupName = res.name;
        this.groupId=res._id;
        this.studentList = res.students;
        this.studentsWithoutGroup=null
      },
    });
  }

  allStudents() {
    this._studentsService.getAllStudents().subscribe({
      next: (res) => {
        console.log(res);
        this.studentGroups = res;
        this.studentsWithoutGroup=null;
        this.studentList=null
      },
    });
  }

  //add update dialog
  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    data:any
  ): void {
    const dialogRef = this.dialog.open(AddToGroupComponent, {
      width: '40%',
      data:data,
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        setTimeout(function () {
          location.reload();
        }, 3000);
      }
    });
  }

  //delete
  openDeleteDialog(
    enterAnimationDuration: string, exitAnimationDuration: string, id: string, name: string
  ): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {id,name},
      width: '40%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteStudent(result.id);
      }
    });
  }
  deleteStudent(id:string){
    this._studentsService.deleteStudent(id).subscribe({
      next:(res)=>{},
      error:(err)=>{
        this.toastr.error(err.error.message,'Error!')
      },
      complete:()=>{
        this.toastr.success('Student deleted successfully')
        this.allStudents()
      }
    })
  }
  //delete from group
  openDeleteFromGroupDialog(
    enterAnimationDuration: string, exitAnimationDuration: string,
     id: string,groupId: string, name: string,groupName:string,fromGroup:boolean
  ): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {id,groupId,name,groupName},
      width: '40%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteStudentFromGroup(result.id,result.groupId);
      }
    });
  }
  deleteStudentFromGroup(studentId:string,groupId:string){
    this._studentsService.deleteStudentFromGroup(studentId,groupId).subscribe({
      next:(res)=>{},
      error:(err)=>{
        this.toastr.error(err.error.message,'Error!')
      },
      complete:()=>{
        this.toastr.success('Student deleted from group successfully')
        this.allStudents()
      }
    })
  }
  
}
