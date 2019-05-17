import {MatTableDataSource} from '@angular/material';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component,OnInit, OnDestroy} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-rangos-de-plazos',
  templateUrl: './rangos-de-plazos.component.html',
  styleUrls: ['./rangos-de-plazos.component.scss']
})

export class RangosDePlazosComponent implements OnInit {
  displayedColumnss = ['minimo', 'maximo', 'tasa'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  codigo: number;
  descripcion: string;
   
  displayedColumns = ['minimo', 'maximo', 'tasa'];
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
  const dialogRef = this.dialog.open(agregarRangodePlazos, {
    width: '550px',
    height: '370px',
    data: {codigo: this.codigo, descripcion: this.descripcion}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    this.codigo = result;
  });
}

openDialog2(): void { ///EDITAR
  const dialogRef = this.dialog.open(editarRangodePlazos, {
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
  selector: 'app-rangos-de-plazos',
  templateUrl: './agregarRangodePlazos.html',
  styleUrls: ['./rangos-de-plazos.component.scss']
})
export class agregarRangodePlazos implements OnInit {
  checked = false;
  indeterminate = false;
  disabled = false;

  constructor() { }
  displayedColumns = ['minimo', 'maximo', 'tasa'];
  selectedValue: string = "";
  dataSource = ELEMENT_DATA;
  ngOnInit() {
  }
}

@Component({ ///EDITAR
  selector: 'app-rangos-de-plazos',
  templateUrl: './editarRangodePlazos.html',
  styleUrls: ['./rangos-de-plazos.component.scss']
})
export class editarRangodePlazos implements OnInit {
  checked = false;
  indeterminate = false;
  disabled = false;

  constructor() { }
  displayedColumns = ['minimo', 'maximo', 'tasa'];
  selectedValue: string = "";
  dataSource = ELEMENT_DATA;
  ngOnInit() {
  }
}
export interface PeriodicElement {
  minimo: Number;
  maximo: Number;
  tasa: String;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { minimo: 0, maximo: 0, tasa: "0.000"},
  { minimo: 0, maximo: 0, tasa: "0.000"},
  { minimo: 0, maximo: 0, tasa: "0.000"},
  { minimo: 0, maximo: 0, tasa: "0.000"},
  { minimo: 0, maximo: 0, tasa: "0.000"},
  { minimo: 0, maximo: 0, tasa: "0.000"},
  { minimo: 0, maximo: 0, tasa: "0.000"},
  { minimo: 0, maximo: 0, tasa: "0.000"},
  { minimo: 0, maximo: 0, tasa: "0.000"},
];