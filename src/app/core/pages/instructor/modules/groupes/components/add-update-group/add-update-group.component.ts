import { Component, Inject, OnInit } from '@angular/core';
import { SetupEndComponent } from '../../../quizes/components/setup-end/setup-end.component';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { GroupsService } from '../../sevice/groups.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { StudentsService } from '../../../students/services/students.service';
import { IStudents } from '../../../students/model/students';
import { AddGroup, IGroup } from '../../model/groups';

@Component({
  selector: 'app-add-update-group',
  templateUrl: './add-update-group.component.html',
  styleUrls: ['./add-update-group.component.scss'],
})
export class AddUpdateGroupComponent implements OnInit {
  addMode: boolean = true;
  updateMode: boolean = true;
  selectedValue:string='';
  studentsList: IStudents[] = [];
  groupStudents: IStudents[] | any = [];
  studentsArray: IStudents[]=[];
  studentsId: string[] =[];
  groupDetails: IGroup | undefined | any;
  groupName: string = '';
  groupForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    students: new FormControl(this.studentsId, Validators.required),
  });
  constructor(
    public dialogRef: MatDialogRef<AddUpdateGroupComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _GroupsService: GroupsService,
    private toastr: ToastrService,
    private _StudentsService: StudentsService
  ) { }
  ngOnInit() {
    this.getAllStudents();
    if (this.data !== null) {
      this.getGroupById(this.data);
      this.updateMode = true;
      this.addMode = false;
    } else {
      this.updateMode = false;
      this.addMode = true;
    }
  }
  //all students
  getAllStudents() {
    this._StudentsService.getAllStudentsWithoutGroup().subscribe({
      next: (res) => {
        console.log(res);
        this.studentsList = res;
      },
    });
  }
  //setup
  onSubmit() {
    let students = this.groupForm.get('students')?.value;
    students?.forEach((student:any) => {
      this.studentsId.push(student._id)
    })
    console.log(this.studentsId);
    let group: any = {
      name: this.groupForm.get('name')?.value,
      students: this.studentsId,
    };
    if (this.data !== null) {
      this.updateGroup(group)
    } 
    else {
      this.addGroup(group)
    }
  }
  addGroup(data: AddGroup){
    this._GroupsService.onAddGroup(data).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'Error!');
      },
      complete: () => {
        this.toastr.success('Group Created Successfully');
        this.onNoClick();
        setTimeout(function () {
          location.reload();
        }, 3000);
      },
    });
  }
  updateGroup(data: AddGroup){
    this._GroupsService.onUpdateGroup(this.data, data).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'Error!');
      },
      complete: () => {
        this.toastr.success('Group Updated Successfully');
        this.onNoClick();
        setTimeout(function () {
          location.reload();
        }, 3000);
      },
    });
  }

  //setup end
  openSetupEndDialog(): void {
    const dialogRef = this.dialog.open(SetupEndComponent, {
      data: {},
      width: '30%',
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log(result.id);
      }
    });
    this.onNoClick();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  //update group
  getGroupById(id: string) {
    this._GroupsService.onGetGroupById(id).subscribe({
      next: (res) => {
        console.log(res);
        this.groupDetails = res;
        this.groupStudents = res.students;
        this.groupName = res.name;
        // this.groupDetails.students.forEach((student:any) => {
        //   this.studentsArray.push(student);
        // });
      },
      complete: () => {  
        this.groupForm.patchValue({
          name: this.groupDetails?.name,
          students: this.groupDetails?.students
        });
        
        console.log(this.studentsArray);
        console.log(this.groupForm);
        

      },
    });
  }
}
