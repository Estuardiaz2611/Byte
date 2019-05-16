import {MatTableDataSource} from '@angular/material';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component,OnInit, OnDestroy} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-canales-de-venta',
  templateUrl: './canales-de-venta.component.html',
  styleUrls: ['./canales-de-venta.component.scss']
})

export class CanalesDeVentaComponent implements OnInit {
  displayedColumnss: String[] = ['posicion', 'canal', 'descripcion'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  numero: number;
  descripcion: string;
   
  displayedColumns = ['posicion', 'canal', 'descripcion'];
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
  const dialogRef = this.dialog.open(agregarCanalesdeVenta, {
    width: '450px',
    height: '350px',
    data: {numero: this.numero, descripcion: this.descripcion}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    this.numero = result;
  });
}

openDialog2(): void { ///EDITAR
  const dialogRef = this.dialog.open(editarCanalesdeVenta, {
    width: '350px',
    height: '200px',
    data: {numero: this.numero, descripcion: this.descripcion}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    this.numero = result;
  });
}
}

@Component({///AGREGAR
  selector: 'app-canales-de-venta',
  templateUrl: './agregarCanalesdeVenta.html',
  styleUrls: ['./canales-de-venta.component.scss']
})
export class agregarCanalesdeVenta implements OnInit {
  checked = false;
  indeterminate = false;
  disabled = false;

  constructor() { }
  displayedColumns = ['posicion', 'canal', 'descripcion'];
  selectedValue: string = "";
  dataSource = ELEMENT_DATA;
  ngOnInit() {
  }
}

@Component({ ///EDITAR
  selector: 'app-canales-de-venta',
  templateUrl: './editarCanalesdeVenta.html',
  styleUrls: ['./canales-de-venta.component.scss']
})
export class editarCanalesdeVenta implements OnInit {
  checked = false;
  indeterminate = false;
  disabled = false;

  constructor() { }
  displayedColumns = ['posicion', 'canal', 'descripcion'];
  selectedValue: string = "";
  dataSource = ELEMENT_DATA;
  ngOnInit() {
  }
}
export interface PeriodicElement {
  posicion: number;
  canal: number;
  descripcion: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { posicion: 1, canal: 1, descripcion: 'Cartera Propia'},
  { posicion: 2, canal: 2, descripcion: 'Cartera Cedida'},
  { posicion: 3, canal: 3, descripcion: 'Banca Personal'},
  { posicion: 4, canal: 4, descripcion: 'Otras Empresas'},
  { posicion: 5, canal: 5, descripcion: 'Otros'},
];