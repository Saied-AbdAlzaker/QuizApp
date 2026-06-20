import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { IChangePassword, ILogin, IRegister, IResetPassword } from '../model/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  role: string | null = '';
  token: string | null = '';
  constructor(private _HttpClient: HttpClient) {
    if (localStorage.getItem('role') !== null) {
      this.getProfile();
    }
  }

  getProfile() {
    let encoded: any = localStorage.getItem('userToken');
    let decoded: any = jwtDecode(encoded);
    localStorage.setItem('role', decoded.role);
    this.getRole();
  }
  getRole() {
    if (
      localStorage.getItem('userToken') !== null &&
      localStorage.getItem('role')
    ) {
      this.role = localStorage.getItem('role');
      this.token = localStorage.getItem('userToken')
    }
  }

  onLogIn(data: ILogin): Observable<ILogin> {
    return this._HttpClient.post<ILogin>('auth/login', data);
  }
  onRegister(data: IRegister):Observable<IRegister>
  {
    return this._HttpClient.post<IRegister>('auth/register' , data)
  }
  onChangePassword(data: IChangePassword):Observable<IChangePassword>
  {
    return this._HttpClient.post<IChangePassword>('auth/change-password' , data)
  }
  onResetPassword(data:string):Observable<any>
  {
    return this._HttpClient.post('auth/forgot-password', {email: data})
  }
  onRestPassword(data:IResetPassword):Observable<IResetPassword>
 {
  return this._HttpClient.post<IResetPassword>('auth/reset-password', data)
 }
}
