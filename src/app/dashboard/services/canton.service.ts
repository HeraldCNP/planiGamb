import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CantonService {
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


  createCanton(data: any): Observable<any> {
    const url = `${this.baseUrl}/betanzos/canton`;
    const header = this.headers;
    const req = new HttpRequest('POST', url, data, { headers: header });
    return this.http.request(req);
  }

  getCantonById(id:any){
    const url = `${this.baseUrl}/betanzos/canton/${id}`;
    const header = this.headers;
    return this.http.get<any>(url, {headers: header});
    // return this.http.get<any>(url+id, { headers });
  }

  editCanton(data: any, id: any): Observable<any> {
    const url = `${this.baseUrl}/betanzos/canton/${id}`;
    const header = this.headers;
    return this.http.patch<any>(url, data, {headers: header});
  }


  createSubcentral(data: any): Observable<any> {
    const url = `${this.baseUrl}/betanzos/subcentral`;
    const header = this.headers;
    const req = new HttpRequest('POST', url, data, { headers: header });
    return this.http.request(req);
  }

  getSubcentralById(id:any){
    const url = `${this.baseUrl}/betanzos/subcentral/${id}`;
    const header = this.headers;
    return this.http.get<any>(url, {headers: header});
    // return this.http.get<any>(url+id, { headers });
  }

  editSubcentral(data: any, id: any): Observable<any> {
    const url = `${this.baseUrl}/betanzos/subcentral/${id}`;
    const header = this.headers;
    return this.http.patch<any>(url, data, {headers: header});
  }


  createComunidad(data: any): Observable<any> {
    const url = `${this.baseUrl}/betanzos/comunidad`;
    const header = this.headers;
    const req = new HttpRequest('POST', url, data, { headers: header });
    return this.http.request(req);
  }


  getComunidadById(id:any){
    const url = `${this.baseUrl}/betanzos/comunidad/${id}`;
    const header = this.headers;
    return this.http.get<any>(url, {headers: header});
    // return this.http.get<any>(url+id, { headers });
  }

  editComunidad(data: any, id: any): Observable<any> {
    const url = `${this.baseUrl}/betanzos/comunidad/${id}`;
    const header = this.headers;
    return this.http.patch<any>(url, data, {headers: header});
  }

}
