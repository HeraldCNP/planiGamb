import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);
  private authService = inject(AuthService)

  constructor() { }


  get token() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.authService.logout();
    }
    return token;
  }
  get headers() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return headers;
  }

  getAllCarpetas(): Observable<any> {
    const url = `${this.baseUrl}/projects`;
    const header = this.headers;
    return this.http.get<any>(url, { headers: header });
  }
}
