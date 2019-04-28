import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  posicion: number;
  numero: String;
  descripcion: string;
 
}

const ELEMENT_DATA: PeriodicElement[] = [
  { posicion: 1, numero: 'ZAPATOS',  descripcion:'NIKE'},
  { posicion: 2, numero: 'CAMISAS', descripcion: 'Adidas'},
];

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  constructor() { }
  displayedColumns: String[] =['posicion',  'numero',  'descripcion'];
  title = 'Notarios';
  selectedValue: string = "";
  dataSource = ELEMENT_DATA;
  ngOnInit() {
  }
}