import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  
  userEmail=localStorage.getItem('email');
  hide: boolean = true;
  // hideConfirm: boolean = true;
  Message:string='';
  resetPasswordForm = new FormGroup({
    otp:new FormControl(null,[Validators.required]),
    email:new FormControl(this.userEmail,[Validators.required,Validators.email]),
    password:new FormControl(null, [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$'),]),
    // confirmPassword:new FormControl(null,[Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$')]),
  },{validators: this.passwordMatchValidator,})
  constructor(private _AuthService:AuthService,private tostar:ToastrService,private router:Router  ){ }

  passwordMatchValidator(control: any) {
    let password =control.get('password');
    let confirmPassword=control.get('confirmPassword')
    if (password?.value == confirmPassword?.value) {
      return null;
    } else {
      control
        .get('confirmPassword')
        ?.setErrors({ invalid: 'password and confirm password not match' });
      return { invalid: 'password and confirm password not match' };
    }
  }
  onSubmit(data:FormGroup){
     this._AuthService.onRestPassword(data?.value).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.Message=res.message;
        
      },error:(err)=>{
       this.tostar.error(err.error.message,'Error');
      },complete:()=>{
        this.tostar.success(this.Message,'Successfully');
        this.router.navigate(['/auth/login'])

      }
    })
    
    
  }
}
