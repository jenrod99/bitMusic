import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompartidoService } from 'src/app/servicios/compartido.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})

export class MainMenuComponent implements OnInit {
  ubicacion: string;

  constructor(
    private _router: Router,
    private _compartidoService: CompartidoService
    ) {
    if(!localStorage.getItem("sesion")) {
      this._router.navigate(['']);
    }
    localStorage.setItem('page','editarCanciones');
    if(localStorage.getItem("sesion") && this.session.role!='ROLE_ADMIN'){
      this._compartidoService.pupUpActive=true
    }
  }

  get boton(){
    return localStorage.getItem('page')
  }

  ngOnInit() {
  }
  
  asignarBoton(boton) {
    localStorage.setItem('page',boton);
  }

  get session(){
    return  localStorage.getItem("sesion")? JSON.parse( localStorage.getItem("sesion")): ''
  };

}
