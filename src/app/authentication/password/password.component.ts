import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './password.component.html',
  styleUrl: './password.component.css'  
})
export  default class PasswordComponent implements OnInit {
  newPassword: string = '';
  token: string | null = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');
    if (!this.token) {
      alert('Token inválido o faltante');
      this.router.navigate(['/login']); 
    }
  }

  onSubmit(): void {
    const payload = {
      token: this.token,
      newPassword: this.newPassword,
    };
  
    this.http.post('http://localhost:8080/recovery/recoverPassword', payload).subscribe({
      next: (response) => {
        alert('Contraseña actualizada exitosamente.');      },
      error: (err) => {
        const errorDetails = err.error?.details || 'Hubo un problema al actualizar la contraseña.';
        alert(`Actualizacion Fallida: ${errorDetails}`);
      },
    });
  }
  
}
