import {MatTableDataSource} from '@angular/material';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component,OnInit, OnDestroy} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MotivoDeAjuste } from 'src/app/models/motivo-de-ajuste.model';

@Component({
  selector: 'app-motivos-de-ajustes',
  templateUrl: './motivos-de-ajustes.component.html',
  styleUrls: ['./motivos-de-ajustes.component.scss']
})
export class MotivosDeAjustesComponent implements OnInit {
  public agregarMotivoDeAjuste: MotivoDeAjuste
  displayedColumnss = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  numero: number;
  descripcion: string;
   
  displayedColumns = ['position', 'name', 'weight', 'symbol', 'saldo'];
  title = 'Agregar';
  selectedValue: string = "";
  //dataSource = ELEMENT_DATA;
  ngOnInit() {
    this.agregarMotivoDeAjuste = new MotivoDeAjuste(0, 0, '', '', '1', true);
  }
//////
constructor(public dialog: MatDialog){
}
applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
openDialog1(): void { ///AGREGAR
  const dialogRef = this.dialog.open(agregarMotivosDeAjustes, {
    width: '720px',
    height: '450px',
    data: {numero: this.numero, descripcion: this.descripcion}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    this.numero = result;
  });
}

openDialog2(): void { ///EDITAR
  const dialogRef = this.dialog.open(editarMotivosDeAjustes, {
    width: '720px',
    height: '450px',
    data: {numero: this.numero, descripcion: this.descripcion}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    this.numero = result;
  });
}

openDialog3(): void { ///ELIMINAR
  const dialogRef = this.dialog.open(eliminarMotivosDeAjustes, {
    width: '500px',
    height: '250px',
    data: {numero: this.numero, descripcion: this.descripcion}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    this.numero = result;
  });
}
}

@Component({ ///AGREGAR
  selector: 'app-agregarMotivosDeAjustes',
  templateUrl: './agregarMotivosDeAjustes.html',
  styleUrls: ['./motivos-de-ajustes.component.scss']
})
export class agregarMotivosDeAjustes implements OnInit {
  checked = false;
  indeterminate = false;
  disabled = false;
  l = 'w';
  lab = 'q';
  la = 'e';
  public agregarMotivoDeAjuste: MotivoDeAjuste

  constructor() { }

  ngOnInit() {
    this.agregarMotivoDeAjuste = new MotivoDeAjuste(0, 0, '', '', '1', true);
  }
}

@Component({ ///EDITAR
  selector: 'app-editarMotivosDeAjustes',
  templateUrl: './editarMotivosDeAjustes.html',
  styleUrls: ['./motivos-de-ajustes.component.scss']
})
export class editarMotivosDeAjustes implements OnInit {
  checked = false;
  indeterminate = false;
  disabled = false;

  constructor() { }

  ngOnInit() {
  }
}

@Component({ ///ELIMINAR
  selector: 'app-eliminarMotivosDeAjustes',
  templateUrl: './eliminarMotivosDeAjustes.html',
  styleUrls: ['./motivos-de-ajustes.component.scss']
})
export class eliminarMotivosDeAjustes implements OnInit {
  checked = false;
  indeterminate = false;
  disabled = false;

  constructor() { }
  
  ngOnInit() {
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: string;
  symbol: string;
  saldo: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 'si', symbol: 's', saldo: 'no'},

];