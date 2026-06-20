import { Component, Inject, OnInit } from '@angular/core';
import { GroupsService } from '../../../groupes/sevice/groups.service';
import { IGroup } from '../../../groupes/model/groups';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { StudentsService } from '../../services/students.service';


@Component({
  selector: 'app-add-to-group',
  templateUrl: './add-to-group.component.html',
  styleUrls: ['./add-to-group.component.scss']
})
export class AddToGroupComponent implements OnInit {
  groups: IGroup[]=[];
  groupId:string='';
  constructor(
    private _GroupsService:GroupsService,
    public dialogRef: MatDialogRef<AddToGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _StudentsService:StudentsService,
    private toastr:ToastrService
  ){}
  ngOnInit(): void {
    this.gettAllGroups()
  }
  gettAllGroups(){
    this._GroupsService.onGetAllGroups().subscribe({
      next:(res)=>{
        console.log(res);
        this.groups=res
      }
    })
  }
  //add student to group
  addToGroup(studentId:string,groupId:string){
    this._StudentsService.addToGroup(studentId,groupId).subscribe({
      next:(res)=>{
        console.log(res);
      },
      error:(err)=>{
        this.toastr.error(err.error.message,'Error!')
      },
      complete:()=>{
        setTimeout(function () {
          location.reload();
        }, 3000);
        this.toastr.success('Student added to group successfully')
        this.onClose()
      }
    })
  }
  onClose(): void {
    this.dialogRef.close();
  }
}
