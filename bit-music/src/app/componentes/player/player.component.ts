import { Component, OnInit } from '@angular/core';
import { CompartidoService } from 'src/app/servicios/compartido.service';
import { Cancion } from 'src/app/modelos/cancion';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  url = "http://localhost:3977/api/obtener-fichero-cancion/"
  canciones: Cancion[];
  indiceCancion = 0;
  cancionActual;
  playlistInLocalStorage;

  constructor(
    private _servicioCompartido: CompartidoService
  ) {
    this.canciones = new Array();
    if (localStorage.getItem("playlist") != null) {
      this.canciones = JSON.parse(localStorage.getItem("playlist"));
      this.playlistInLocalStorage = true;
    }
    this._servicioCompartido.cancionEmitida.subscribe(
      cancion => {
        this.canciones.push(cancion);
        let totalCanciones = this.canciones.length;
        if (totalCanciones == 1) {
          this.iniciarReproductor();
        }
      }
    )
    
  }

  ngOnInit() {
    if (this.playlistInLocalStorage) {
      this.iniciarReproductor();
    }
  }

  obtenerIndiceCancion() {
    return this.indiceCancion;
  }

  aumentarIndiceCancion() {
    this.indiceCancion++;
  }

  cambiarNombreCancionActual(cancionActual) {
    this.cancionActual = cancionActual;
  }

  eliminarCancion(cancion) {
    let listsongs = this.canciones.filter(song => song._id != cancion._id)
    this.canciones = JSON.parse(JSON.stringify(listsongs))
    localStorage.setItem('playlist', JSON.stringify(this.canciones))
  }

  resetIndiceCancion() {
    this.indiceCancion = 1;
  }

  iniciarReproductor() {
    var audio = document.getElementById("audio");
    if (this.canciones && this.canciones[0]) {
      audio.setAttribute("src", this.url + this.canciones[0].archivo);
      this.cambiarNombreCancionActual(this.canciones[0].titulo)
      this.aumentarIndiceCancion();

      // el evento ended ocurre cuando el audio termina
      audio.addEventListener('ended', () => {
        //se obtiene el indice de la siguiente cancion a reproducir
        let indice = this.obtenerIndiceCancion();

        /* se valida si el indice de la siguiente cancion a reproducir
        desborda el arreglo de canciones */
        if (indice < this.canciones.length) {
          audio.setAttribute("src", this.url + this.canciones[indice].archivo);
          this.cambiarNombreCancionActual(this.canciones[indice].titulo)

          //modificar el tipo del objeto/variable
          let repro = audio as any;
          repro.play();
          this.aumentarIndiceCancion();
        } else {
          audio.setAttribute("src", this.url + this.canciones[0].archivo)
          this.cambiarNombreCancionActual(this.canciones[0].titulo)
          this.resetIndiceCancion();
        }
      })

    }

  }


}
