import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ContentIndexComponent} from './componentes/content-index/content-index.component';
import {LoginComponent} from  './componentes/login/login.component';
import {MainMenuComponent} from './componentes/main-menu/main-menu.component';

const routes: Routes = [
    {path: 'login', component:LoginComponent},
    {path: 'content', component:ContentIndexComponent},
    {path: '', redirectTo: '/content', pathMatch: 'full' },
    {path:'menu',component:MainMenuComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }