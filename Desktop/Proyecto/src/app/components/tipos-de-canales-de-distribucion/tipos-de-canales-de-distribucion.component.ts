import {MatTableDataSource} from '@angular/material';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component,OnInit, OnDestroy} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-tipos-de-canales-de-distribucion',
  templateUrl: './tipos-de-canales-de-distribucion.component.html',
  styleUrls: ['./tipos-de-canales-de-distribucion.component.scss']
})

export class TiposDeCanalesDeDistribucionComponent implements OnInit {
  displayedColumnss: String[] =['posicion', 'codigo', 'descripcion'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  numero: number;
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
  const dialogRef = this.dialog.open(agregarTiposdeCanalesdeDistribucion, {
    width: '650px',
    height: '480px',
    data: {numero: this.numero, descripcion: this.descripcion}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    this.numero = result;
  });
}

openDialog2(): void { ///EDITAR
  const dialogRef = this.dialog.open(editarTiposdeCanalesdeDistribucion, {
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

@Component({ ///AGREGAR
  selector: 'app-tipos-de-canales-de-distribucion',
  templateUrl: './agregarTiposdeCanalesdeDistribucion.html',
  styleUrls: ['./tipos-de-canales-de-distribucion.component.scss']
})
export class agregarTiposdeCanalesdeDistribucion implements OnInit {
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
  selector: 'app-tipos-de-canales-de-distribucion',
  templateUrl: './editarTiposdeCanalesdeDistribucion.html',
  styleUrls: ['./tipos-de-canales-de-distribucion.component.scss']
})
export class editarTiposdeCanalesdeDistribucion implements OnInit {
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
  { posicion: 1, codigo: 1, descripcion: 'Normales'},
  { posicion: 2, codigo: 2, descripcion: 'Planillas/Pagadurías'},
  { posicion: 3, codigo: 3, descripcion: 'Otros'},
];