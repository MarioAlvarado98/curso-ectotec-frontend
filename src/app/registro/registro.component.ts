import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroUsuario } from '../Models/RegistroUsuario';
import { UsuarioService } from "../_services/usuario.service";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService
  ) {
    this.buildForm();
  }

  registroForm: FormGroup;

  ngOnInit(): void {

  }

  submit(): void{
    if(this.registroForm.invalid){
      return;
    }
    const passwordValid = this.registroForm.get('password').value === this.registroForm.get('passwordConfirmacion').value;
    if(!passwordValid){
      alert('Las contraseñas deben coincidir');
      return;
    }
    this.usuarioService.registrar(this.registroForm.value).subscribe((res) => {
      if(!!res){
        alert('Registro exitoso.');
        this.router.navigate(['Login']);
      }else{
        alert('Ha ocurrido un error, por favor verifique sus datos.')
      }
    },
    (err) => {
      alert('Ha ocurrido un error');
    });
  }

  cancelar(): void{
    this.router.navigateByUrl('/Login');
  }

  private buildForm(): void {
    this.registroForm = this.formBuilder.group(
      {
        nombre: ['', [Validators.required]],
        email: ['', [Validators.required]],
        password: ['', [Validators.required]],
        passwordConfirmacion: ['', [Validators.required]],
      }
    );
  }

}
