import { Component, OnInit } from '@angular/core';
import { CompartidoService } from 'src/app/servicios/compartido.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {

  constructor(
    private _compartidoService: CompartidoService,
    private _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
  }

  goPremium(){
    let userPremium = localStorage.getItem('sesion')? JSON.parse( localStorage.getItem('sesion')) : '';
    if(userPremium){
      userPremium.role='ROLE_ADMIN';
    this._usuarioService.actualizarUsuario(userPremium._id, userPremium).subscribe(
      (response: any) => {
        if (response.usuario) {
          localStorage.setItem('sesion',JSON.stringify(response.usuario))
        }
      }, error => {
        if (error != null) {
          console.log(error)
        }
      }
    )

    }
    this._compartidoService.pupUpActive=false;
  }

  noPremium(){
    this._compartidoService.pupUpActive=false;
  }

}
