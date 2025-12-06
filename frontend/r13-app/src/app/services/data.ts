import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://146.190.153.169/api/data';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getChart1Data(): Observable<any> {
    return this.http.get(`${this.apiUrl}/chart1`, { headers: this.getHeaders() });
  }

  getChart2Data(): Observable<any> {
    return this.http.get(`${this.apiUrl}/chart2`, { headers: this.getHeaders() });
  }
}
