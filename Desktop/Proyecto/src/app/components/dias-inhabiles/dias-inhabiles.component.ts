import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface PeriodicElement {
  posicion: number;
  numero: number;
  descripcion: string;
 
}
const ELEMENT_DATA: PeriodicElement[] = [
  { posicion: 1, numero:1,  descripcion:'Whtas up'},
  { posicion: 2, numero: 2, descripcion: 'hi'},
];


@Component({
  selector: 'app-dias-inhabiles',
  templateUrl: './dias-inhabiles.component.html',
  styleUrls: ['./dias-inhabiles.component.scss']
})
export class DiasInhabilesComponent implements OnInit {
  numero: number;
  descripcion: string;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(agregarDiasInhabiles, {
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
  selector: 'app-dias-inhabiles',
  templateUrl: './agregarDiasInhabiles.html',
})
export class agregarDiasInhabiles implements OnInit {

  constructor() { }
  displayedColumns: String[] =['posicion',  'numero',  'descripcion'];
  title = 'Notarios';
  selectedValue: string = "";
  dataSource = ELEMENT_DATA;
  ngOnInit() {
  }
}
