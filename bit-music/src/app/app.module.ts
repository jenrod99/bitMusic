import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { ContentIndexComponent } from './componentes/content-index/content-index.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { LoginComponent } from './componentes/login/login.component';
import { MainMenuComponent } from './componentes/main-menu/main-menu.component';
import { MenuSongComponent } from './componentes/menu-song/menu-song.component';
import { PlayerComponent } from './componentes/player/player.component';
import { SongToolsComponent } from './componentes/song-tools/song-tools.component';
import { UserProfileComponent } from './componentes/user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    ContentIndexComponent,
    FooterComponent,
    LoginComponent,
    MainMenuComponent,
    MenuSongComponent,
    PlayerComponent,
    SongToolsComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
