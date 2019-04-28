import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  posicion: number;
  numero: number;
  descripcion: string;
 
}

const ELEMENT_DATA: PeriodicElement[] = [
  { posicion: 1, numero:1,  descripcion:'vista'},
  { posicion: 2, numero: 2, descripcion: 'sueño'},
];

@Component({
  selector: 'app-instituciones-cobros-adicionales',
  templateUrl: './instituciones-cobros-adicionales.component.html',
  styleUrls: ['./instituciones-cobros-adicionales.component.scss']
})
export class InstitucionesCobrosAdicionalesComponent implements OnInit {

  constructor() { }
  displayedColumns: String[] =['posicion',  'numero',  'descripcion'];
  title = 'Notarios';
  selectedValue: string = "";
  dataSource = ELEMENT_DATA;
  ngOnInit() {
  }

}
