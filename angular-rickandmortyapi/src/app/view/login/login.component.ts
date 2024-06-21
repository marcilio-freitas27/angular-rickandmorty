import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private loginService: LoginService,
  ) {

  }

  ngOnInit() {
  }

  login(user: string, pass: string):void{
    this.loginService.login(user, pass);
  }

  logout():void{
    this.loginService.logout();
  }

}
