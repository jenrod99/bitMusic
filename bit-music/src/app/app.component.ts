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

  logOut(){
    this._usuarioService.usuario='';
    this.router.navigate(['']);
  }
}
