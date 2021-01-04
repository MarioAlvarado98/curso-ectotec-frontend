import { renderFlagCheckIfStmt } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InicioSesion } from '../Models/InicioSesion';
import { UsuarioService } from '../_services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService
  ) {
    this.buildForm();
   }

  loginForm: FormGroup;

  ngOnInit(): void {
  }

  public submit(): void{
    if(this.loginForm.invalid){
      return;
    }
    let usuarioLogin: InicioSesion = {
      correo: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    };
    this.usuarioService.autenticar(usuarioLogin).subscribe(
      result => {
        if(!!result.resultado){
          localStorage.setItem('currentUser', JSON.stringify(result));
          this.router.navigate(['/']);
        }else{
          alert(result.mensaje);
        }
      },
      error => {
        alert(error);
      }
    )
  }

  private buildForm(): void {
    this.loginForm = this.formBuilder.group(
      {
        email: ['', [Validators.required]],
        password: ['', [Validators.required]],
      }
    );
  }

}
