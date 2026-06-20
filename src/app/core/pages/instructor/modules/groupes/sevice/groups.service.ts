import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddGroup, IGroup } from '../model/groups';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

constructor(
  private _HttpClient:HttpClient
){}

  onGetAllGroups():Observable<any>{
    return this._HttpClient.get('group')
  }
  onAddGroup(data:AddGroup):Observable<AddGroup>{
    return this._HttpClient.post<AddGroup>('group',data)
  }
  onDeleteGroup(id:string):Observable<string>{
    return this._HttpClient.delete<string>(`group/${id}`)
  }
  onGetGroupById(id:string):Observable<IGroup>{
    return this._HttpClient.get<IGroup>(`group/${id}`)
  }
  onUpdateGroup(id:string,data:AddGroup):Observable<AddGroup>{
    return this._HttpClient.put<AddGroup>(`group/${id}`,data)
  }

}
