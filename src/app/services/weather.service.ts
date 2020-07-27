import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }
  getData() {
   return this.http.get('http://localhost:3000/weather?address=kyiv')
  }
}
