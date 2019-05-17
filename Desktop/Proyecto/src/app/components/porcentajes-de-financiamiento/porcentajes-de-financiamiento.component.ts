import {MatTableDataSource} from '@angular/material';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component,OnInit, OnDestroy} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-porcentajes-de-financiamiento',
  templateUrl: './porcentajes-de-financiamiento.component.html',
  styleUrls: ['./porcentajes-de-financiamiento.component.scss']
})

export class PorcentajesDeFinanciamientoComponent implements OnInit {
  displayedColumnss = ['financiamiento', 'tasa'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  codigo: number;
  descripcion: string;
   
  displayedColumns = ['financiamiento', 'tasa'];
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
  const dialogRef = this.dialog.open(agregarPorcentajes, {
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
  const dialogRef = this.dialog.open(editarPorcentajes, {
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
  selector: 'app-porcentajes-de-financiamiento',
  templateUrl: './agregarPorcentajes.html',
  styleUrls: ['./porcentajes-de-financiamiento.component.scss']
})
export class agregarPorcentajes implements OnInit {
  checked = false;
  indeterminate = false;
  disabled = false;

  constructor() { }
  displayedColumns = ['financiamiento', 'tasa'];
  selectedValue: string = "";
  dataSource = ELEMENT_DATA;
  ngOnInit() {
  }
}

@Component({ ///EDITAR
  selector: 'app-porcentajes-de-financiamiento',
  templateUrl: './editarPorcentajes.html',
  styleUrls: ['./porcentajes-de-financiamiento.component.scss']
})
export class editarPorcentajes implements OnInit {
  checked = false;
  indeterminate = false;
  disabled = false;

  constructor() { }
  displayedColumns = ['financiamiento', 'tasa'];
  selectedValue: string = "";
  dataSource = ELEMENT_DATA;
  ngOnInit() {
  }
}
export interface PeriodicElement {
  financiamiento: String;
  tasa: String;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { financiamiento: "0.000", tasa: "0.000"},
  { financiamiento: "0.000", tasa: "0.000"},
  { financiamiento: "0.000", tasa: "0.000"},
  { financiamiento: "0.000", tasa: "0.000"},
  { financiamiento: "0.000", tasa: "0.000"},
  { financiamiento: "0.000", tasa: "0.000"},
  { financiamiento: "0.000", tasa: "0.000"},
  { financiamiento: "0.000", tasa: "0.000"},
  { financiamiento: "0.000", tasa: "0.000"},
];