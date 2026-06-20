import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

export const instructorGuard: CanActivateFn = ( state ) => {
  const route = inject(Router);
  const authService = inject(AuthService);

  const token = localStorage.getItem('userToken');
  const role  = localStorage.getItem('role')

  if(token !== null && role == 'Instructor')
  {
    return true
  } else
  {
    authService.getProfile();
    route.navigate(['/quizwiz/student']);
    return false;
  }
};
