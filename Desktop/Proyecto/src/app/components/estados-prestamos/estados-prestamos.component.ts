import { Component, OnInit } from '@angular/core';
import {PeriodicElement} from '../interfaces/periodic-element';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource,MatDialog} from '@angular/material';

export interface PeriodicElement {
  descripcion: string;
  codigo: number;
}

@Component({
  selector: 'app-estados-prestamos',
  templateUrl: './estados-prestamos.component.html',
  styleUrls: ['./estados-prestamos.component.scss']
})


export class EstadosPrestamosComponent implements OnInit {
  displayedColumnss = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  numero: number;
  descripcion: string;

  displayedColumns = ['position', 'name', 'weight', 'symbol'];
  title = 'Agregar';
  selectedValue: string = "";

 

  ngOnInit() {
  }

  constructor(public dialog: MatDialog) { }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
  }

}

const ELEMENT_DATA: PeriodicElement[] = [
  {codigo: 1, descripcion: 'Hydrogen'},
  {codigo: 2, descripcion: 'Helium'},
  {codigo: 3, descripcion: 'Lithium'},
  {codigo: 4, descripcion: 'Beryllium'},
  {codigo: 5, descripcion: 'Boron'},
];