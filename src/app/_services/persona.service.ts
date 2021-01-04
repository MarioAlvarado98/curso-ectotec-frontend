import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment";
import { Persona } from '../Models/Persona';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private readonly APIURL: string;
  constructor(private http: HttpClient) {
    this.APIURL = environment.apiUrl;
   }

  public getPersonas(): Observable<Persona[]>{
    return this.http.get<Persona[]>(this.APIURL.concat('Persona'));
  }

  public getPersona(id: number): Observable<Persona>{
    return this.http.get<Persona>(this.APIURL.concat('Persona/' + id));
  }

  public postPersona(persona: Persona): Observable<boolean>{
    return this.http.post<boolean>(this.APIURL.concat('Persona'),persona);
  }

  public putPersona(persona: Persona): Observable<boolean>{
    return this.http.put<boolean>(this.APIURL.concat(`Persona/${persona.personaId}`),persona);
  }

  public deletePersona(id: number): Observable<boolean>{
    return this.http.delete<boolean>(this.APIURL.concat(`Persona/${id}`));
  }
}
