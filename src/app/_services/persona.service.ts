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
    return this.http.get<Persona[]>(this.APIURL.concat('Personas'));
  }

  public getPersona(id: number): Observable<Persona>{
    return this.http.get<Persona>(this.APIURL.concat('Personas/'+id));
  }

  public postPersona(persona: Persona): Observable<boolean>{
    return this.http.post<boolean>(this.APIURL.concat('Personas'),persona);
  }

  public putPersona(persona: Persona): Observable<boolean>{
    return this.http.put<boolean>(this.APIURL.concat('Personas'),persona);
  }

  public deletePersona(id: number): Observable<boolean>{
    let params = new HttpParams();
    params = params.append('id', id.toString());
    return this.http.delete<boolean>(this.APIURL.concat('Personas'),{params});
  }
}
