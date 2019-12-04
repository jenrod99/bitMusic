import { Component, OnInit, OnDestroy } from '@angular/core';
import { Usuario } from '../../modelos/usuario';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Router } from '@angular/router';
import { CompartidoService } from 'src/app/servicios/compartido.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  usuario: Usuario;
  loginCorrecto;

  constructor(
    private _usuarioService: UsuarioService,
    private _router: Router,
    private _compartidoService: CompartidoService
  ) {
    if(localStorage.getItem("sesion") != null) {
      this._router.navigate(['/menu']);
    }
    this._usuarioService.usuario = new Usuario ('',  null, '', '', '', '', '')
  }

  ngOnInit() {
  }

  login() {
    this._usuarioService.login(this.usuario).subscribe(
      (response: any) => {
        if (response.usuario) {
          let usuarioLogueado = new Usuario(
            response.usuario._id,
            response.usuario.nombre,
            response.usuario.edad,
            response.usuario.correo,
            response.usuario.password,
            response.usuario.imagen,
            response.usuario.role
          )
            
            localStorage.setItem
            ("sesion",JSON.stringify(usuarioLogueado));
            this._compartidoService.emitirLogueo(true);
            this._router.navigate(['/menu'])
            
        } else {
          this.loginCorrecto = 
          "los datos ingresados son incorrectos  ";
        }
      }, error => {
        if (error != null) {
          console.log(error)
        }
      }
    )
  }

  ngOnDestroy () {
    
  }

}
