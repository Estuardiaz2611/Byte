import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatTableDataSource} from '@angular/material';
import {PeriodicElement} from '../interfaces/periodic-element';
export interface PeriodicElement {
  posicion: number;
  numero: number;
  descripcion: string;
 
}



@Component({
  selector: 'app-dias-inhabiles',
  templateUrl: './dias-inhabiles.component.html',
  styleUrls: ['./dias-inhabiles.component.scss']
})
export class DiasInhabilesComponent implements OnInit {
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  numero: number;
  descripcion: string;

  displayedColumns = ['position', 'name', 'weight', 'symbol'];
  title = 'Agregar';
  selectedValue: string = "";


   
  ngOnInit() {
  }

  
  constructor(public dialog: MatDialog){
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  openDialog1(): void {
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
}
  

@Component({ //Agregar

  selector: 'app-dias-inhabiles',
  templateUrl: './agregarDiasInhabiles.html',
  styleUrls:['./dias-inhabiles.component.scss']

})

export class agregarDiasInhabiles implements OnInit {
  checked = false;
  indeterminate = false;
  disabled = false;


  constructor(){}
  displayedColumns = ['position', 'name', 'weight', 'symbol'];
  selectedValue: string = "";
  dataSource = ELEMENT_DATA;

  ngOnInit(){

  }
}


const ELEMENT_DATA: PeriodicElement[] = [
  {codigo: 1, descripcion: 'Hydrogen'},
  {codigo: 2, descripcion: 'Helium'},
  {codigo: 3, descripcion: 'Lithium'},
  {codigo: 4, descripcion: 'Beryllium'},
  {codigo: 5, descripcion: 'Boron'},
];


