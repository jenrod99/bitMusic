import { Component, OnInit } from '@angular/core';
// import { Usuario } from 'src/app/modelos/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
  ubicacion: string;
  boton = 'editarCanciones';
  usuario = {role:'ROLE-ADMIN'}

  constructor(private _router: Router) {
    if(!localStorage.getItem("sesion")) {
      this._router.navigate(['']);
    }
  }

  ngOnInit() {
  }
  asignarBoton(boton) {
    this.boton = boton;
  }

  
}
