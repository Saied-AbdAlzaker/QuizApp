import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {

  constructor(private _AuthService:AuthService,
    private _toastr:ToastrService,
    private _Router:Router) { }

    email:string = ''
    errorMessage:string='';

  resetPassword(data: string){
    this._AuthService.onResetPassword(data).subscribe({
      next: (res: any)=>{
        this.errorMessage = res.message;
      }, error: (err)=>{
        this._toastr.error(err.error.errorMessage, 'Error!');
      },complete: ()=>{
        this._toastr.success("Request Success", 'Successfully!');
        this._Router.navigate(['/auth/resetPassword']);
        localStorage.setItem('email' , data);

      }
    })
  }

}
