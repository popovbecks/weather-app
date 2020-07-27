import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { AuthService } from '../services/auth.service';
import { Router } from  '@angular/router';



@Component({
  selector: 'app-weather-page',
  templateUrl: './weather-page.component.html',
  styleUrls: ['./weather-page.component.scss']
})
export class WeatherPageComponent implements OnInit {

  constructor(private weatherService: WeatherService, private authService: AuthService, private router: Router) { }
  weatherData: any;

  logout () {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  ngOnInit(): void {
    this.weatherService.getData().subscribe((res):void => {
      console.log(res)
      this.weatherData = res;

    })
  }

}
