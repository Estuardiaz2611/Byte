import {MatTableDataSource} from '@angular/material';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component,OnInit, OnDestroy} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-asignacion-de-categorias',
  templateUrl: './asignacion-de-categorias.component.html',
  styleUrls: ['./asignacion-de-categorias.component.scss']
})

export class AsignacionDeCategoriasComponent implements OnInit {
  displayedColumnss = ['posicion', 'usuario', 'categoria', 'descripcion'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  codigo: number;
  descripcion: string;
   
  displayedColumns = ['posicion', 'usuario', 'categoria', 'descripcion'];
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
  const dialogRef = this.dialog.open(agregarAsignaciondeCategorias, {
    width: '650px',
    height: '530px',
    data: {codigo: this.codigo, descripcion: this.descripcion}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    this.codigo = result;
  });
}

openDialog2(): void { ///EDITAR
  const dialogRef = this.dialog.open(editarAsignaciondeCategorias, {
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
  selector: 'app-asignacion-de-categorias',
  templateUrl: './agregarAsignaciondeCategorias.html',
  styleUrls: ['./asignacion-de-categorias.component.scss']
})
export class agregarAsignaciondeCategorias implements OnInit {
  checked = false;
  indeterminate = false;
  disabled = false;

  constructor() { }
  displayedColumns = ['posicion', 'usuario', 'categoria', 'descripcion'];
  selectedValue: string = "";
  dataSource = ELEMENT_DATA;
  ngOnInit() {
  }
}

@Component({ ///EDITAR
  selector: 'app-asignacion-de-categorias',
  templateUrl: './editarAsignaciondeCategorias.html',
  styleUrls: ['./asignacion-de-categorias.component.scss']
})
export class editarAsignaciondeCategorias implements OnInit {
  checked = false;
  indeterminate = false;
  disabled = false;

  constructor() { }
  displayedColumns = ['posicion', 'usuario', 'categoria', 'descripcion'];
  selectedValue: string = "";
  dataSource = ELEMENT_DATA;
  ngOnInit() {
  }
}
export interface PeriodicElement {
  posicion: number;
  usuario: string;
  categoria: number;
  descripcion: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { posicion: 1, usuario: "Avasquez", categoria: 1, descripcion: 'Gerente'},
  { posicion: 2, usuario: "Bytecap", categoria: 1, descripcion: 'Gerente'},
  { posicion: 3, usuario: "Bytesef", categoria: 1, descripcion: 'Gerente'},
  { posicion: 4, usuario: "Cestevez", categoria: 4, descripcion: 'Prueba'},
  { posicion: 5, usuario: "Eduarte", categoria: 1, descripcion: 'Gerente'},
  { posicion: 6, usuario: "Rchavez", categoria: 1, descripcion: 'Gerente'},
];