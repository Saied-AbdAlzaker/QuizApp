import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserRole } from '../../model/role.enum';
import { AuthService } from '../../services/auth.service';
import { IRegister } from '../../model/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  message: string = '"Welcome In QuizWiz!"';
  verifyEmail: any;
  role: UserRole[] = [UserRole.Instructor, UserRole.Student];

  hide: boolean = true;
  constructor(private _AuthService: AuthService, private toastr: ToastrService, private _Router: Router) { }

  ngOnInit(): void {
    console.log(this.role);
  }


  registerForm = new FormGroup({
    first_name: new FormControl(null, [
      Validators.required,
      Validators.pattern('([a-zA-Z]){3,12}')
    ]),
    last_name: new FormControl(null, [
      Validators.required,
      Validators.pattern('([a-zA-Z]){3,12}')
    ]),
    email: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]),

    role: new FormControl(null, [
      Validators.required
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$')
    ]),
  });


  onSubmit(data: FormGroup) {
    console.log(data.value);

    this._AuthService.onRegister(data.value).subscribe({
      next: (res: IRegister) => {
        console.log(res);
        this.verifyEmail = localStorage.setItem('email', res.email);

      },
      error: (err: any) => {
        console.log(err);
        this.toastr.error(err.error.message, 'Error!');
      },
      complete: () => {
        this.toastr.success(this.message, 'Succeded');
        this._Router.navigate(['/auth/login']);
      },
    });
  }


}
