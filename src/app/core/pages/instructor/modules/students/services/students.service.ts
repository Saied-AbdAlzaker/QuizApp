import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IStudents } from '../model/students';
import { IRegister } from 'src/app/core/auth/model/auth';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  constructor(private _HttpClient: HttpClient) {}

  getAllStudents(): Observable<any> {
    return this._HttpClient.get('student');
  }
  getAllStudentsWithoutGroup(): Observable<any> {
    return this._HttpClient.get('student/without-group');
  }
  getStudentById(id: string): Observable<IStudents> {
    return this._HttpClient.get<IStudents>(`student/${id}`);
  }
  updateStudent(data: IStudents): Observable<IStudents> {
    return this._HttpClient.put<IStudents>('student', data);
  }
  deleteStudent(id: string): Observable<IStudents> {
    return this._HttpClient.delete<IStudents>(`student/${id}`);
  }
  deleteStudentFromGroup(studentId: string,groupId:string):Observable<IStudents>{
    return this._HttpClient.delete<IStudents>(`student/${studentId}/${groupId}`)
  }
  // Group
  addToGroup(studentId: string, groupId: string): Observable<IStudents> {
    return this._HttpClient.get<IStudents>(`student/${studentId}/${groupId}`,{params:{studentId,groupId}});
  }
  updateStudentGroup(studentId: string, groupId: string, data: IStudents): Observable<IStudents> {
    return this._HttpClient.put<IStudents>(`student/${studentId}/${groupId}`, data);
  }
  onGetTopFiveStudents(): Observable<any> {
    return this._HttpClient.get('student/top-five');
  }
  onUpdateInstructorAccount(data:IRegister):Observable<IRegister>{
    return this._HttpClient.put<IRegister>('instructor',data)
  }
  onUpdateStudentAccount(data:IRegister):Observable<IRegister>{
    return this._HttpClient.put<IRegister>('student',data)
  }
}
