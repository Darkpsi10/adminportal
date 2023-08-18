import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly ROOTURL: string;

  constructor(private http: HttpClient, private router: Router) {
    this.ROOTURL = 'http://localhost:3000'; // API URL
  }

  // CRUD OPERATIONS
  get(uri: string) {
    return this.http.get(`${this.ROOTURL}/${uri}`);
  }

  getAll(uri: string) {
    return this.http.get(`${this.ROOTURL}/${uri}`);
  }

  post(uri: string, payload: object) {
    return this.http.post(`${this.ROOTURL}/${uri}`, payload);
  }

  put(uri: string, payload: object) {
    return this.http.put(`${this.ROOTURL}/${uri}`, payload);
  }

  delete(uri: string) {
    return this.http.delete(`${this.ROOTURL}/${uri}`);
  }

  // LOCAL STORAGE METHODS

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  logout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }

  public get loggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }
}
