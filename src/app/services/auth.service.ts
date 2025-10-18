import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthObject } from '../types';
const API_URL = environment.API_URL

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient)
  register(credentials: { name?: string, email: string, password: string }) {
    return this.http.post<AuthObject>(`${API_URL}/auth/register`, credentials)
  }
  login(credentials: { email: string, password: string }) {
    return this.http.post<AuthObject>(`${API_URL}/auth/login`, credentials)
  }
  logout() {
    return this.http.post(`${API_URL}/auth/logout`, null)
  }
  refresh() {
    return this.http.post<AuthObject>(`${API_URL}/auth/refresh`, null)
  }
}