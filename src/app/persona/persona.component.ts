import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Persona } from "../Models/Persona";
import { PersonaService } from '../_services/persona.service';
import { AddPersonaComponent } from "./add-persona/add-persona.component";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.scss']
})
export class PersonaComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) private _sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) private _paginator: MatPaginator;
  displayedColumns: string[] = ['PersonaId', 'NombreCompleto', 'Correo', 'Opciones'];
  dataSource: MatTableDataSource<Persona>;
  constructor(
    public dialog: MatDialog,
    private _personas: PersonaService
    ) {
      this.dataSource = new MatTableDataSource([]);
    }

  ngOnInit(): void {
    this.configTable();
    this.getPersonas();
  }

  addPersona(persona?: Persona): void{
    const addPersonaDialog = this.dialog.open(AddPersonaComponent, {
      width: '60%',
      data: persona
    });

    addPersonaDialog.afterClosed().subscribe(result => {
      this.getPersonas();
    });
  }

  getPersonas(): void{
    this._personas
    .getPersonas().subscribe((response) => {
      this.dataSource.data = response;
    },
    (err) => alert("Ha ocurrido un error"))

  }

  deletePersona(id: number){
    this._personas.deletePersona(id).subscribe((response) => {
      this.getPersonas();
    },
    (err) => alert("No se ha podido eliminar"))
  }

  private configTable(): void {
    this.dataSource.sort = this._sort;
    this.dataSource.paginator = this._paginator;
  }

}
