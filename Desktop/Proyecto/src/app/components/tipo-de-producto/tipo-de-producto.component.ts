import {MatTableDataSource} from '@angular/material';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component,OnInit, OnDestroy} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-tipo-de-producto',
  templateUrl: './tipo-de-producto.component.html',
  styleUrls: ['./tipo-de-producto.component.scss']
})

export class TipoDeProductoComponent implements OnInit {
  displayedColumnss = ['posicion', 'codigo', 'descripcion'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  codigo: number;
  descripcion: string;
   
  displayedColumns = ['posicion', 'codigo', 'descripcion'];
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
  const dialogRef = this.dialog.open(agregarTipoProducto, {
    width: '450px',
    height: '400px',
    data: {codigo: this.codigo, descripcion: this.descripcion}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    this.codigo = result;
  });
}

openDialog2(): void { ///EDITAR
  const dialogRef = this.dialog.open(editarTipoProducto, {
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
  selector: 'app-tipo-de-producto',
  templateUrl: './agregarTipoProducto.html',
  styleUrls: ['./tipo-de-producto.component.scss']
})
export class agregarTipoProducto implements OnInit {
  checked = false;
  indeterminate = false;
  disabled = false;

  constructor() { }
  displayedColumns = ['posicion', 'codigo', 'descripcion'];
  selectedValue: string = "";
  dataSource = ELEMENT_DATA;
  ngOnInit() {
  }
}

@Component({ ///EDITAR
  selector: 'app-tipo-de-producto',
  templateUrl: './editarTipoProducto.html',
  styleUrls: ['./tipo-de-producto.component.scss']
})
export class editarTipoProducto implements OnInit {
  checked = false;
  indeterminate = false;
  disabled = false;

  constructor() { }
  displayedColumns = ['posicion', 'codigo', 'descripcion'];
  selectedValue: string = "";
  dataSource = ELEMENT_DATA;
  ngOnInit() {
  }
}
export interface PeriodicElement {
  posicion: number;
  codigo: number;
  descripcion: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { posicion: 1, codigo: 1, descripcion: 'Gerente'},
  { posicion: 2, codigo: 2, descripcion: 'Jefe'},
  { posicion: 3, codigo: 3, descripcion: 'Asesor'},
  { posicion: 4, codigo: 4, descripcion: 'Prueba'},
  { posicion: 5, codigo: 5, descripcion: 'Prueba 2'},
  { posicion: 6, codigo: 6, descripcion: 'Oficial 1'},
];