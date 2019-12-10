import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from './servicios/usuario.service';
import { CompartidoService } from './servicios/compartido.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  url = "http://localhost:3977/api/";

  constructor(
    private router: Router,
    private _compartidoService: CompartidoService
  ){}

  goLogin(){
    this.router.navigate(['/login']);
  }

  get session(){
    return  localStorage.getItem("sesion")? JSON.parse( localStorage.getItem("sesion")): ''
  }

  goProfile(){
    localStorage.setItem('page','perfil');
  }

  logOut(){
    localStorage.setItem("sesion",'');
    this.router.navigate(['/content']);
  }
}
