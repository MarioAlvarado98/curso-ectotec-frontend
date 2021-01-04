import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private usuarioService: UsuarioService) { }

  intercept(req, next){
    const tokenizeReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.usuarioService.currentUserValue.token}`
      }
    });
    return next.handle(tokenizeReq);
  }
}
