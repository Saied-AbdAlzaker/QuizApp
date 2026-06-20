import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupesRoutingModule } from './groupes-routing.module';
import { ListGroupsComponent } from './components/list-groups/list-groups.component';
import { AddUpdateGroupComponent } from './components/add-update-group/add-update-group.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ListGroupsComponent,
    AddUpdateGroupComponent
  ],
  imports: [
    CommonModule,
    GroupesRoutingModule,
    SharedModule
  ]
})
export class GroupesModule { }
