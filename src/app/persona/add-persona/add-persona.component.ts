import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Persona } from 'src/app/Models/Persona';
import { PersonaService } from 'src/app/_services/persona.service';

@Component({
  templateUrl: './add-persona.component.html',
  styleUrls: ['./add-persona.component.scss']
})
export class AddPersonaComponent implements OnInit {

  isUpdate: boolean;
  constructor(
    public dialogRef: MatDialogRef<AddPersonaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Persona,
    private formBuilder: FormBuilder,
    private personas: PersonaService
  ) {
    this.isUpdate = !!this.data;
    this.buildForm();
  }

  personaForm: FormGroup;

  ngOnInit(): void {
    if(this.isUpdate){
      this.setPersona();
    }
  }

  cancelarClick(): void{
    this.dialogRef.close();
  }

  public submit(): void{
    if(this.personaForm.invalid){
      return;
    }
    const data = this.personaForm.getRawValue();
    console.log(data);
    let persona: Persona;
    persona = new Persona();
    persona.correo = data.Correo;
    persona.nombreCompleto = data.NombreCompleto;
    if(this.isUpdate){
      persona.personaId = this.data.personaId;
      this.updatePersona(persona);
    }else{
      this.postPersona(persona);
    }
  }

  private buildForm(): void {
    this.personaForm = this.formBuilder.group(
      {
        NombreCompleto: ['', [Validators.required]],
        Correo: ['', [Validators.required, Validators.email]],
      }
    );
  }

  private updatePersona(persona: Persona): void{
    this.personas.putPersona(persona).subscribe((result) =>{
      this.dialogRef.close();
    },
    (err) => alert("Ha ocurrido un error"));
  }

  private postPersona(persona: Persona): void{
    this.personas.postPersona(persona).subscribe((result) =>{
      this.dialogRef.close();
    },
    (err) => alert("Ha ocurrido un error"));
  }

  private setPersona(){
    this.personaForm.patchValue({
      NombreCompleto: this.data.nombreCompleto,
      Correo: this.data.correo
    });
  }

}
