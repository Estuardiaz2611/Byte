import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  posicion: number;
  numero: number;
  descripcion: string;

}

const ELEMENT_DATA: PeriodicElement[] = [
  { posicion: 1, numero: 1,  descripcion: 'daño en el servidor'},
  { posicion: 2, numero: 2, descripcion: 'no muestra datos'},
];

@Component({
  selector: 'app-motivos-de-ajustes',
  templateUrl: './motivos-de-ajustes.component.html',
  styleUrls: ['./motivos-de-ajustes.component.scss']
})
export class MotivosDeAjustesComponent implements OnInit {

  constructor() { }
  displayedColumns: String [] = ['posicion',  'numero',  'descripcion'];
  title = 'Notarios';
  selectedValue: string = "";
  dataSource = ELEMENT_DATA;
  ngOnInit() {
  }
}
