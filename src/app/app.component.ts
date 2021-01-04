import { Component } from '@angular/core';
import { UsuarioService } from './_services/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Curso-Ectotec-FrontEnd';

  constructor(
    public usuarioService: UsuarioService,
    ){
    }

  public logout(): void{
    this.usuarioService.logout();
  }

}
