import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { ToastUtil } from 'src/app/util/toast.util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mensagem!: string;
  mensagemFalha!: string;
  constructor(
    private loginService: LoginService,
    public toastUtil: ToastUtil,
  ) {

  }

  ngOnInit() {
    this.mensagem = "Teste";
  }

  login(user: string, pass: string):void{
    let logado = this.loginService.login(user, pass);
    if(logado){
      this.toastUtil.loginSucesso();
    }else{
      this.toastUtil.loginFalha();
    }
    
  }

  logout():void{
    this.loginService.logout();
  }

}
