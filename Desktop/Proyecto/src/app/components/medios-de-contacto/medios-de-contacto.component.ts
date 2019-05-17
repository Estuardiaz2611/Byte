import {MatTableDataSource} from '@angular/material';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component,OnInit, OnDestroy} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-medios-de-contacto',
  templateUrl: './medios-de-contacto.component.html',
  styleUrls: ['./medios-de-contacto.component.scss']
})

export class MediosDeContactoComponent implements OnInit {
  displayedColumnss: String[] =['posicion', 'medios',  'descripcion'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  numero: number;
  descripcion: string;
   
  displayedColumns = ['posicion', 'medios', 'descripcion'];
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
  const dialogRef = this.dialog.open(agregarMediosdeContacto, {
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
  const dialogRef = this.dialog.open(editarMediosdeContacto, {
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
  selector: 'app-medios-de-contacto',
  templateUrl: './agregarMediosdeContacto.html',
  styleUrls: ['./medios-de-contacto.component.scss']
})
export class agregarMediosdeContacto implements OnInit {
  checked = false;
  indeterminate = false;
  disabled = false;

  constructor() { }
  displayedColumns = ['posicion', 'medios', 'descripcion'];
  selectedValue: string = "";
  dataSource = ELEMENT_DATA;
  ngOnInit() {
  }
}

@Component({ ///EDITAR
  selector: 'app-medios-de-contacto',
  templateUrl: './editarMediosdeContacto.html',
  styleUrls: ['./medios-de-contacto.component.scss']
})
export class editarMediosdeContacto implements OnInit {
  checked = false;
  indeterminate = false;
  disabled = false;

  constructor() { }
  displayedColumns = ['posicion', 'medios', 'descripcion'];
  selectedValue: string = "";
  dataSource = ELEMENT_DATA;
  ngOnInit() {
  }
}
export interface PeriodicElement {
  posicion: number;
  medios: number;
  descripcion: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { posicion: 1, medios: 1, descripcion: 'Gerencia General'},
  { posicion: 2, medios: 2, descripcion: 'Promociones'},
  { posicion: 3, medios: 3, descripcion: 'Iniciativa del cliente'},
  { posicion: 4, medios: 4, descripcion: 'Departamento de creditos'},
  { posicion: 5, medios: 5, descripcion: 'Jefes de Agencia'},
  { posicion: 6, medios: 6, descripcion: 'Educadores'},
  { posicion: 7, medios: 7, descripcion: 'Dirigentes'},
  { posicion: 8, medios: 8, descripcion: 'Oficiales de Credito'},
];