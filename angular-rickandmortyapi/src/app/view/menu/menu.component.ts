import {AfterViewInit,Component,OnInit,Renderer2} from '@angular/core';
import {NavigationEnd,Router} from '@angular/router';
import {ApiService} from 'src/app/services/api.service';
import {LoginService} from 'src/app/services/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, AfterViewInit  {

  usuarioLogado!:string | null;
  usuarioImagem!: string;
  menuImagem!: string;
  constructor(
    private loginService: LoginService,
    private api: ApiService,
    private router: Router,
    private renderer: Renderer2
  ) {

   }

  ngOnInit() {
    this.usuarioLogado = this.buscarUsuario();
    this.buscarImagens();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });

  }
  ngAfterViewInit() {
    // Escuta o evento de abertura do offcanvas
    const offcanvasElement = document.getElementById('offcanvasRight');
    if (offcanvasElement) {
      offcanvasElement.addEventListener('shown.bs.offcanvas', this.removeExtraBackdrops);
      offcanvasElement.addEventListener('shown.bs.offcanvas', this.handleBodyState.bind(this, 'open'));
      offcanvasElement.addEventListener('hidden.bs.offcanvas', this.handleBodyState.bind(this, 'close'));
      offcanvasElement.addEventListener('hidden.bs.offcanvas', this.removeExtraBackdrops);
    }
  }

  removeExtraBackdrops() {
    // Obtém todas as backdrops
    const backdrops = document.querySelectorAll('.offcanvas-backdrop');
    if (backdrops.length > 1) {
      // Remove todas as backdrops extras, mantendo apenas uma
      backdrops.forEach((backdrop, index) => {
        if (index > 0) {
          backdrop.remove();
        }
      });
    }
  }

  handleBodyState(action: 'open' | 'close') {
    const body = document.body;

    if (action === 'open') {
      // Garante que apenas um estilo correto seja aplicado
      this.renderer.setStyle(body, 'overflow', 'hidden');
      this.renderer.setStyle(body, 'paddingRight', '34px'); // Ajuste para seu caso
    } else if (action === 'close') {
      // Remove os atributos que causam o problema
      this.renderer.removeAttribute(body, 'data-bs-overflow');
      this.renderer.removeAttribute(body, 'data-bs-padding-right');
      this.renderer.removeStyle(body, 'overflow');
      this.renderer.removeStyle(body, 'paddingRight');
    }
  }

  buscarImagens(){
    this.api.buscarPersonagensPorId(1).subscribe({
      next: (res) => this.usuarioImagem = res.image
    })
    this.api.buscarPersonagensPorId(19).subscribe({
      next: (res) => this.menuImagem = res.image
    })
  }

  buscarUsuario(){
    return this.loginService.buscarUsuario();
  }

  logout():void{
    localStorage.clear();
    this.router.navigate(["login"]);
  }

  expandMenuDesktop(){
    let menu = document.getElementById("menu-desktop") as HTMLElement;
    menu.style.position = "absolute";
    menu.style.top = "10px";
    menu.style.right = "75px";

    if(menu.style.display != "block"){
      menu.style.display = "block";
    }else {
      menu.style.display = "none";
    }
  }
}
