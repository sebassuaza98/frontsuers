import { Component } from '@angular/core'; 
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'; 
import { catchError } from 'rxjs/operators'; 
import { throwError } from 'rxjs'; 
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export default class RegisterComponent {
  user = {
    identificacion: '', 
    name: '',             
    lastName: '',         
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',          
    role: 'Ciudadano'     
  };

  errorMessage: string = '';
  successMessage: string = '';
  private apiUrl = 'http://localhost:8080/api/register';

  constructor(private http: HttpClient, private router: Router) {}

  registerUser() {
    if (this.user.password !== this.user.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    const userData = {
      identificacion: this.user.identificacion,
      name: this.user.name,
      lastName: this.user.lastName,
      email: this.user.email,
      phone: this.user.phone,
      address: this.user.address,
      password: this.user.password,
      role: this.user.role
    };

    const refreshToken = localStorage.getItem('refreshToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': refreshToken ? `Bearer ${refreshToken}` : ''
    });

    this.http.post<any>(this.apiUrl, userData, { headers })
      .pipe(catchError(this.handleError))  
      .subscribe({
        next: (response) => {
          this.successMessage = 'Usuario registrado exitosamente';
          this.errorMessage = '';
        },
        error: (error) => {
          this.errorMessage = error;
          this.successMessage = '';
        }
      });
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocurrió un error inesperado';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      if (error.status === 400) {
        errorMessage = error.error.details || 'Error de validación';
      } else if (error.status === 500) {
        errorMessage = 'Ocurrió un error en el servidor';
      }
    }
    return throwError(errorMessage);
  }

  login(): void {
    this.router.navigate(['/login']);
  }
}
