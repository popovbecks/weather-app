import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router } from  '@angular/router';
import { User } from '../models/user';
import { Result } from '../models/result'
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder, private toastr: ToastrService ) { 

  }
  loginForm: FormGroup;
  isSubmitted: boolean  =  false;
  get formControls() { return this.loginForm.controls; }

  login(){
    if(this.loginForm.invalid){
      return;
    }
    this.authService.login(this.loginForm.value).subscribe((resp: Result)=> {
      this.isSubmitted = true;
      if(resp.result === 'successful') {
        localStorage.setItem('ACCESS_TOKEN', "access_token");
        this.router.navigateByUrl('/weather-page');
      } else {
         this.toastr.error('Login or Password incorrect', 'Login Error');
      }
    });
    
  }

  ngOnInit() {
    this.loginForm  =  this.formBuilder.group({
        login: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
        password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(100)]]
    });
}

}
