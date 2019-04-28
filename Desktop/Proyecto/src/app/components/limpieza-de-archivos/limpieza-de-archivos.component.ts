import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  posicion: number;
  numero: number;
  descripcion: string;
 
}

const ELEMENT_DATA: PeriodicElement[] = [
  { posicion: 1, numero:1,  descripcion:'Daniel'},
  { posicion: 2, numero: 2, descripcion: 'Bryan'},
];

@Component({
  selector: 'app-limpieza-de-archivos',
  templateUrl: './limpieza-de-archivos.component.html',
  styleUrls: ['./limpieza-de-archivos.component.scss']
})
export class LimpiezaDeArchivosComponent implements OnInit {

  constructor() { }
  displayedColumns: String[] =['posicion',  'numero',  'descripcion'];
  title = 'Notarios';
  selectedValue: string = "";
  dataSource = ELEMENT_DATA;
  ngOnInit() {
  }
}