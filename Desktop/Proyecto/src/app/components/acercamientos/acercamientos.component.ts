import {MatTableDataSource} from '@angular/material';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component,OnInit, OnDestroy} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-acercamientos',
  templateUrl: './acercamientos.component.html',
  styleUrls: ['./acercamientos.component.scss']
})

export class AcercamientosComponent implements OnInit {
  displayedColumnss = ['position', 'codigo', 'descripcion'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  codigo: number;
  descripcion: string;
   
  displayedColumns = ['position', 'codigo', 'descripcion'];
  title = 'Agregar';
  selectedValue: string = "";
  //dataSource = ELEMENT_DATA;
  ngOnInit() {
  }
///////  
  constructor(public dialog: MatDialog){
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
//////
openDialog1(): void { ///AGREGAR
  const dialogRef = this.dialog.open(agregarAcercamientos, {
    width: '450px',
    height: '350px',
    data: {codigo: this.codigo, descripcion: this.descripcion}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    this.codigo = result;
  });
}

openDialog2(): void { ///EDITAR
  const dialogRef = this.dialog.open(editarAcercamientos, {
    width: '350px',
    height: '200px',
    data: {codigo: this.codigo, descripcion: this.descripcion}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    this.codigo = result;
  });
}
}

@Component({ ///AGREGAR
  selector: 'app-acercamientos',
  templateUrl: './agregarAcercamientos.html',
  styleUrls: ['./acercamientos.component.scss']
})
export class agregarAcercamientos implements OnInit {
  checked = false;
  indeterminate = false;
  disabled = false;

  constructor() { }
  displayedColumns = ['position', 'codigo', 'descripcion'];
  selectedValue: string = "";
  dataSource = ELEMENT_DATA;
  ngOnInit() {
  }
}

@Component({ ///EDITAR
  selector: 'app-acercamientos',
  templateUrl: './editarAcercamientos.html',
  styleUrls: ['./acercamientos.component.scss']
})
export class editarAcercamientos implements OnInit {
  checked = false;
  indeterminate = false;
  disabled = false;

  constructor() { }
  displayedColumns = ['position', 'codigo', 'descripcion'];
  selectedValue: string = "";
  dataSource = ELEMENT_DATA;
  ngOnInit() {
  }
}
export interface PeriodicElement {
  position: number;
  codigo: number;
  descripcion: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, codigo: 1, descripcion: "Sin acercamiento"},
  {position: 2, codigo: 2, descripcion: "Sin acercamiento"},
  {position: 3, codigo: 1, descripcion: "Sin acercamiento"},
  {position: 4, codigo: 1, descripcion: "Sin acercamiento"},
  {position: 5, codigo: 1, descripcion: "Sin acercamiento"},
  {position: 6, codigo: 1, descripcion: "Sin acercamiento"}
];