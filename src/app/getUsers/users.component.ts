import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export default class UsersComponent {
  updatedUserResponse: string = '';
  users: any[] = [];
  errorMessage: string | null = null;
  selectedRole: string = '';
  selectedState: boolean | undefined;
  selectedUser: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  private getAuthHeaders(): HttpHeaders {
    const refreshToken = localStorage.getItem('refreshToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': refreshToken ? `Bearer ${refreshToken}` : ''
    });
  }

  loadUsers(filters: { role?: string; state?: boolean } = {}): void {
    const params: any = {};

    if (filters.role) {
      params.role = filters.role;
    }

    if (filters.state !== undefined) {
      params.state = filters.state.toString();
    }

    this.http.get<any>('http://localhost:8080/api/getUsers', { 
      headers: this.getAuthHeaders(),
      params 
    })
      .subscribe(
        response => {
          if (response.status === '200') {
            this.users = response.data;
            this.errorMessage = null;
          } else {
            this.users = [];
            this.errorMessage = 'No users found';
          }
        },
        error => {
          this.errorMessage = 'Error retrieving users';
          this.users = [];
        }
      );
  }

  editUser(user: any): void {
    this.selectedUser = { ...user };
  }

  updateUser(): void {
    this.http.put<any>('http://localhost:8080/api/updateUser', this.selectedUser, {
      headers: this.getAuthHeaders() 
    })
      .subscribe(
        response => {
          if (response.status === '200') {
            const updatedUser = response.data;
            const index = this.users.findIndex(u => u.userId === updatedUser.userId);
            if (index !== -1) {
              this.users[index] = updatedUser; 
            }
            this.selectedUser = null; 
            this.errorMessage = null; 
            alert("Actualización exitosa");
          } else {
            this.errorMessage = response.details || 'Error updating user';
          }
        },
        error => {
          alert("El Correo ya existe");
        }
      );
  }

  onRoleChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedRole = selectElement.value;
    this.loadUsers({ role: this.selectedRole, state: this.selectedState });
  }

  onStateChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedState = selectElement.value === 'true';
    this.loadUsers({ role: this.selectedRole, state: this.selectedState });
  }
}
