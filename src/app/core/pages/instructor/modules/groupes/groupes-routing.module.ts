import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListGroupsComponent } from './components/list-groups/list-groups.component';
import { AddUpdateGroupComponent } from './components/add-update-group/add-update-group.component';

const routes: Routes = [
  {path:'', component:ListGroupsComponent},
  {path:'edit',component:AddUpdateGroupComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupesRoutingModule { }
