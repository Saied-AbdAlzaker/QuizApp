import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../../sevice/groups.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddUpdateGroupComponent } from '../add-update-group/add-update-group.component';
import { IGroup } from '../../model/groups';
import { DeleteComponent } from 'src/app/shared/components/delete/delete.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-groups',
  templateUrl: './list-groups.component.html',
  styleUrls: ['./list-groups.component.scss'],
})
export class ListGroupsComponent implements OnInit {
  groups: IGroup[]=[];
  constructor(
    private _GroupsService: GroupsService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}
  ngOnInit() {
    this.getAllGroups();
  }

  getAllGroups() {
    this._GroupsService.onGetAllGroups().subscribe({
      next: (res) => {
        console.log(res);
        this.groups = res;
      },
    });
  }
  //delete group
  openDeleteDialog(roomData: any): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: roomData,
      width: '40%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.onDeleteRooms(result._id);
      }
    });
  }
  onDeleteRooms(id: string) {
    this._GroupsService.onDeleteGroup(id).subscribe({
      next: (res) => {},
      error: (err) => {
        this.toastr.error(err.error.message, 'Error!');
      },
      complete: () => {
        this.getAllGroups();
        this.toastr.success('Group Deleted Successfully');
      },
    });
  }

  //setup dialog
  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(AddUpdateGroupComponent, {
      width: '60%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  openEditDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    data: any
  ): void {
    this.dialog.open(AddUpdateGroupComponent, {
      width: '60%',
      data: data._id,
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
