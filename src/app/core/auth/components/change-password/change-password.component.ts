import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit{
  hide: boolean = true;
  hideNew: boolean = true;
  // hideConfirm: boolean = true;

  constructor(private _AuthService:AuthService, private toastr:ToastrService, private _Router:Router){}

  ngOnInit(): void {
    
  }

  changePasswordForm = new FormGroup({
    password: new FormControl(null, [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$')]),
    password_new: new FormControl(null, [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$')]),

  },
    // { validators: this.passwordMatchValidator }
    )

  // passwordMatchValidator(control: any) {
  //   let password_new = control.get('password_new');
  //   let confirm_password_new = control.get('confirm_password_new')
  //   if (password_new.value == confirm_password_new.value) {
  //     return null;
  //   } else {
  //     control
  //       .get('confirm_password_new')
  //       ?.setErrors({ invalid: 'password and confirm password not match' });
  //     return { invalid: 'password and confirm password not match' };
  //   }
  // }

  onSubmit(data: FormGroup){
    this._AuthService.onChangePassword(data.value).subscribe({
      next: (res)=>{
        console.log(res);
        // localStorage.setItem('email', res.data.email);
        
      }, error: (err)=>{
        this.toastr.error(err.error.message, 'Error!')
      }, complete: ()=>{
        this.toastr.success('Password Updated Login Now!', 'Success');
        this._Router.navigate(['/auth'])
      }
    })
  }

}
