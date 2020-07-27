import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http: HttpClient) { }
  
  public login(userInfo: User) {
    let login = userInfo.login,
    password = userInfo.password,
    checkLoginUrl = `http://localhost:3000/login?login=${login}&password=${password}`;
    return this.http.get(checkLoginUrl)
  }
  public isLoggedIn(){
    return localStorage.getItem('ACCESS_TOKEN') !== null;

  }
  public logout(){
    localStorage.removeItem('ACCESS_TOKEN');
  }
}
