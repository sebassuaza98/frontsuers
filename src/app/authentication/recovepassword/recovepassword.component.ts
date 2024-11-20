import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {Router } from '@angular/router';

@Component({
  selector: 'app-recovepassword',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './recovepassword.component.html',
  styleUrls: ['./recovepassword.component.css']
})
export default class RecovepasswordComponent {
  email: string = '';
  responseMessage: string | null = null;
  isSuccess: boolean = false;

  constructor(private http: HttpClient,private router: Router) {}

  onSubmit() {
  const apiUrl = 'http://localhost:8080/recovery/requestPasswordRecovery';
  this.http.post(apiUrl, null, { params: { email: this.email } })
    .subscribe({
      next: (response: any) => {
        if (response.status == 200) {
          alert("¡Correo enviado con éxito!");
          this.router.navigate(['/login']);
        }
      },
      error: (error) => {
        this.responseMessage = error.error.details || 'Ocurrió un error inesperado.';
        this.isSuccess = false;

        if (error.status !== 200) {
          alert("Hubo un error al enviar el correo.");
        }
      }
    });
}

}
