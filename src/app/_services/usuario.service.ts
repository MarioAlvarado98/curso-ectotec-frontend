import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../Models/usuario';
import { HttpClient, HttpParams } from '@angular/common/http';
import { InicioSesion } from '../Models/InicioSesion';
import { environment } from 'src/environments/environment';
import { Sesion } from '../Models/Sesion';
import { RegistroUsuario } from '../Models/RegistroUsuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private httpClient: HttpClient,
    private router: Router
    ) { }

  public get currentUserValue(): Usuario{
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if ( !currentUser ){
      return new Usuario();
    }
    const usuario: Usuario = {
      nombreCompleto: currentUser.nombreCompleto,
      correo: currentUser.correo,
      token: currentUser.token
    };
    return currentUser;
  }

  public get isAuthenticated(): boolean{
    return !!localStorage.getItem('currentUser');
  }

  public registrar(usuarioRegistro: RegistroUsuario): Observable<boolean>{
    const registroData = {
      correo: usuarioRegistro.email,
      password: usuarioRegistro.password,
      nombreCompleto: usuarioRegistro.nombre
    }
    return this.httpClient.post<boolean>(environment.apiUrl.concat('usuario/registro'), registroData);
  }

  public autenticar(inicioSesion: InicioSesion): Observable<Sesion>{
    return this.httpClient.post<Sesion>(environment.apiUrl.concat('usuario/login'), inicioSesion);
  }

  public logout(): void{
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }
}
