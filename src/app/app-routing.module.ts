import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { PersonaComponent } from './persona/persona.component';
import { RegistroComponent } from './registro/registro.component';

import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path: "", component: IndexComponent},
  {path: "*", component: IndexComponent},
  {path: "Personas", component: PersonaComponent, canActivate: [AuthGuard]},
  {path: "Login", component: LoginComponent},
  {path: "Registro", component: RegistroComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
