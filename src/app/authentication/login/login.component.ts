import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {
  user: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router){}

  login(): void {
    this.authService.login(this.user, this.password).subscribe({
      next: (response) => {
        const token = response.token;
        const payload = JSON.parse(atob(token.split('.')[1]));
        const role = payload.role;
        if (role === 'Administrador') {
          this.router.navigate(['/dashboard']);
        } else {
          alert("Solo pueden ingresar Usuarios con Rol Administrador ");

        }
      },
      error: (err) => {
        if (err.status === 401) {
          alert('No autenticado. Verifique sus credenciales.');
        } else if(err.status === 403) {
          alert('Usuario inactivo');
        }else {
          alert('Error de inicio de sesión. Intente nuevamente.');
        }
      }
    });
  }

  register(): void {
    this.router.navigate(['/getusers']);
  }
  recoverPasss(): void {
    this.router.navigate(['/recoverPasss']);
  }
}
