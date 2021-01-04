import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { PersonaComponent } from "./persona/persona.component";

const routes: Routes = [
  {path: "", component: IndexComponent},
  {path: "*", component: IndexComponent},
  {path: "Personas", component: PersonaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
