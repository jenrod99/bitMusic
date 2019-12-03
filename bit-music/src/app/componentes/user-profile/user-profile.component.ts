import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  name='';
  age='';
  email='';
  password='';

  title='';

  constructor(
    private _usuarioService: UsuarioService,
  ) {
    this.getUser();
   }

  ngOnInit() {
  }

  getUser(){
    if(this._usuarioService.usuario){
      this.name = this._usuarioService.usuario.nombre? this._usuarioService.usuario.nombre : '';
      this.age = this._usuarioService.usuario.edad? this._usuarioService.usuario.edad : '';
      this.email = this._usuarioService.usuario.correo? this._usuarioService.usuario.correo : '';
      this.password = this._usuarioService.usuario.password? this._usuarioService.usuario.password : '';
    }
  }

}
