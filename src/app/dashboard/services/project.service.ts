import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
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

  // getProjects(): Observable<any> {
  //   const url = `${this.baseUrl}/proyect`;
  //   const header = this.headers;
  //   return this.http.get<any>(url, { headers: header });
  // }


  getProjects(params?: any): Observable<any> {
    const url = `${this.baseUrl}/proyect`;
    const header = this.headers;
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key]) {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }
    return this.http.get<any>(url, { params: httpParams, headers: header });
  }



  getCantones(): Observable<any[]> {
    const url = `${this.baseUrl}/betanzos/canton`;
    const header = this.headers;
    return this.http.get<any[]>(url, { headers: header });
  }

  getSubcentralias(): Observable<any[]> {
    const url = `${this.baseUrl}/betanzos/subcentral`;
    const header = this.headers;
    return this.http.get<any[]>(url, { headers: header });
  }

  getComunidades(): Observable<any[]> {
    const url = `${this.baseUrl}/betanzos/comunidad`;
    const header = this.headers;
    return this.http.get<any[]>(url, { headers: header });
  }

  getProgramas(): Observable<any[]> {
    const url = `${this.baseUrl}/programa`;
    const header = this.headers;
    return this.http.get<any[]>(url, { headers: header });
  }

  createProject(data: any): Observable<any> {
    const url = `${this.baseUrl}/proyect`;
    const header = this.headers;


    const req = new HttpRequest('POST', url, data, {
      reportProgress: true,
      responseType: 'json',
      headers: header
    });
    return this.http.request(req);
  }

  getProjectForId(id: string) {
    const url = `${this.baseUrl}/proyect/${id}`;
    const header = this.headers;
    return this.http.get<any>(url, { headers: header });
  }

  addArchivo(data: any, id: any): Observable<any> {
    console.log(data.get('documentos'));
    const url = `${this.baseUrl}/proyect/addDocument/${id}`;
    const header = this.headers;

    const req = new HttpRequest('PATCH', url, data, {
      reportProgress: true,
      responseType: 'json',
      headers: header
    });

    console.log(req);

    return this.http.request(req);

    // return this.http.post<any>(url, data, { headers: header });
  }

  updateProject(data: any, id: any): Observable<any> {
    const url = `${this.baseUrl}/proyect/${id}`;
    const header = this.headers;

    const req = new HttpRequest('PATCH', url, data, {
      reportProgress: true,
      responseType: 'json',
      headers: header
    });
    return this.http.request(req);

    // return this.http.post<any>(url, data, { headers: header });
  }

  deleteProject(id: any): Observable<any> {
    const url = `${this.baseUrl}/proyect/${id}`;
    const header = this.headers;
    return this.http.delete<any>(url, { headers: header });
  }



}
