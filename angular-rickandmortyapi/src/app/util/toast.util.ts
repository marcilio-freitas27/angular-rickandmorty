import { Injectable } from "@angular/core";
import * as bootstrap from 'bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ToastUtil {

    carregarDadosSucesso(){
        let timeout = setTimeout(() => {
            const toastSucces = document.getElementById('toastSuccess') as HTMLElement;
            const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastSucces);
            toastBootstrap.show();    
        },5);
    }

    async carregarDadosFalha(){
        let timeout = await setTimeout(() => {
            const toastError = document.getElementById('toastError') as HTMLElement;
            const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastError);
            toastBootstrap.show();    
        },5);
    }

    async limparTimeOut(timeout: NodeJS.Timeout){
        clearTimeout(timeout);
    }
}