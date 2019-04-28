import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface PeriodicElement {
  posicion: number;
  numero: number;
  descripcion: string;
 
}
const ELEMENT_DATA: PeriodicElement[] = [
  { posicion: 1, numero:1,  descripcion:'vista'},
  { posicion: 2, numero: 2, descripcion: 'sueño'},
  { posicion: 3, numero: 3, descripcion: 'Hola'},
];

@Component({
  selector: 'app-cobros-adicionales',
  templateUrl: './cobros-adicionales.component.html',
  styleUrls: ['./cobros-adicionales.component.scss']
})
export class CobrosAdicionalesComponent implements OnInit {
  numero: number;
  descripcion: string;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(Agregar, {
      width: '700px',
      height: '600px',
      data: {numero: this.numero, descripcion: this.descripcion}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.numero = result;
    });
  }

  displayedColumns: String[] =['posicion',  'numero',  'descripcion'];
  title = 'Notarios';
  selectedValue: string = "";
  dataSource = ELEMENT_DATA;
  ngOnInit() {
  }
}


@Component({
  selector: 'app-cobros-adicionales',
  templateUrl: './agregar.html',
})
export class Agregar implements OnInit {

  constructor() { }
  displayedColumns: String[] =['posicion',  'numero',  'descripcion'];
  title = 'Notarios';
  selectedValue: string = "";
  dataSource = ELEMENT_DATA;
  ngOnInit() {
  }
}