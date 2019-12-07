import { Component, OnInit } from '@angular/core';
import { Usuario } from './../../../app/modelos/usuario'
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  usuario: Usuario;
  filesToUpload: File;
  actualizacionCorrecta;
  url = "http://localhost:3977/api/";

  /* name='';
  age='';
  email='';
  password='';

  title=''; */

  constructor(
    private _usuarioService: UsuarioService,
  ) {
    /* this.getUser(); */
   }

   ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem("sesion"))
    console.log(this.usuario)
  }

  actualizarDatos(){
    this._usuarioService.actualizarUsuario(this.usuario._id,this.usuario).subscribe(
      (response:any)=>{
        if(response.usuario){
          if(this.filesToUpload != undefined){
              this._usuarioService.cargarImagenUsuario(this.filesToUpload,this.usuario._id)
              .subscribe(
                (response:any)=>{
                  if(response.usuario){
                    this.actualizacionCorrecta = "Datos actualizados correctamente";
                    this.usuario = response.usuario;
                    localStorage.setItem("sesion",JSON.stringify(this.usuario));
                  }else{
                    this.actualizacionCorrecta = "Los datos no se actualizaron por completo. Contacta al administrador de la aplicacion";
                  }
                },error=>{
                  if (error != null) {
                    console.log(error)
                  }
                }
              )
          };
          localStorage.setItem("sesion",JSON.stringify(this.usuario));
        }else{
          this.actualizacionCorrecta = "No se han podido actualizar sus datos, comuniquese con el administrador de la aplicacion";
        }
      },error=>{
        if (error != null) {
          console.log(error)
        }
      }
    )
  }  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <File>fileInput.target.files[0];//recoger archivos seleccionados en el input
  }}


  // Anterior

  /* getUser(){
    if(this._usuarioService.usuario){
      this.name = this._usuarioService.usuario.nombre? this._usuarioService.usuario.nombre : '';
      this.age = this._usuarioService.usuario.edad? this._usuarioService.usuario.edad : '';
      this.email = this._usuarioService.usuario.correo? this._usuarioService.usuario.correo : '';
      this.password = this._usuarioService.usuario.password? this._usuarioService.usuario.password : '';
    }
  } */


