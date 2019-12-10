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

  getSession(){
    return  localStorage.getItem("sesion")? JSON.parse( localStorage.getItem("sesion")): ''
  }

  getUser(){
    let user = this.getSession();
    if(user){
      this.name = user.nombre? user.nombre : '';
      this.age = user.edad? user.edad : '';
      this.email = user.correo? user.correo : '';
      this.password = user.password? user.password : '';
    }
  }

}
