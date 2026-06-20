import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

export const studentGuard: CanActivateFn = ( state ) => {
  const route = inject(Router);
  const authService= inject(AuthService);

  const token = localStorage.getItem('userToken');
  const role  = localStorage.getItem('role')

  if(token !== null && role == 'Student')
  {
    return true
  } else
  {
    authService.getProfile();
    route.navigate(['/quizwiz/instructor']);
    return false;
  }
};
