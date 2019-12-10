import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from './servicios/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  constructor(
    private router: Router,
    private _usuarioService: UsuarioService,
  ){}

  goLogin(){
    this.router.navigate(['/login']);
  }

  get session(){
    return  localStorage.getItem("sesion")? JSON.parse( localStorage.getItem("sesion")): ''
  }

  

  logOut(){
    localStorage.setItem("sesion",'');
    this.router.navigate(['/content']);
  }
}
