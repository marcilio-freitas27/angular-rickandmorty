import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  constructor() { }

  @Input() mensagem!: string;
  @Input() mensagemFalha!: string;
  ngOnInit() {
    this.mensagem = "Dados carregados.";
    this.mensagemFalha = "Falha ao carregador os dados";
  }

}
