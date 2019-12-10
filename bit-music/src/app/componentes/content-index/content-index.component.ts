import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../modelos/usuario';
import { UsuarioService } from '../../servicios/usuario.service';
import { Router } from '@angular/router';
import { CompartidoService } from 'src/app/servicios/compartido.service';

@Component({
  selector: 'app-content-index',
  templateUrl: './content-index.component.html',
  styleUrls: ['./content-index.component.css']
})
export class ContentIndexComponent implements OnInit {

  usuario: Usuario;
  registroCorrecto='';

  constructor(
    private _usuarioService : UsuarioService,
    private _router : Router,
    private _compartidoService: CompartidoService
  ) {
    if(localStorage.getItem("sesion")){
      this._router.navigate(['/menu']);
    }
    this.usuario = new Usuario('', null, '', '', '', '', '');
   }

  ngOnInit() {
  }

  registrar() {
    this._usuarioService.registrar(this.usuario)
    .subscribe(
      (response: any) => {
        if (response.usuario) {
          this.registroCorrecto = 
          "El registro es correcto te puedes loguear con el email "+this.usuario.correo;
          this.usuario.edad=null;
          this.usuario.imagen='';
          this.usuario.nombre='';
          this.usuario.role=''; 
          let usuarioNuevo = JSON.parse( JSON.stringify(this.usuario));
          this.usuario.correo='';
          this.usuario.password='';
          setTimeout(()=>{
            this.registroCorrecto='';
            this._usuarioService.login(usuarioNuevo).subscribe(
              (response: any) => {
                if (response.usuario) {          
                  let usuarioLogueado = new Usuario(
                    response.usuario.nombre,
                    response.usuario.edad,
                    response.usuario.correo,
                    response.usuario.password,
                    response.usuario.role,
                    response.usuario.imagen,
                    response.usuario._id,
                    )
                    localStorage.setItem
                    ("sesion",JSON.stringify(usuarioLogueado));
                    this._compartidoService.emitirLogueo(true);
                    this._router.navigate(['/menu'])
                    
                } 
              }, error => {
                if (error != null) {
                  console.log(error)
                }
              }
            )
          },3000)
        } else {
          this.registroCorrecto = 
          "no se ha realizado el registro del usuario, consulte con soporte ";
        }
      }, error => {
        if (error != null) {
          console.log(error)
        }
      }
    )
  }

}
