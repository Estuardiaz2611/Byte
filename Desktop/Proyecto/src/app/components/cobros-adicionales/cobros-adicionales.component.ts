import {MatTableDataSource} from '@angular/material';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component,OnInit, OnDestroy} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-cobros-adicionales',
  templateUrl: './cobros-adicionales.component.html',
  styleUrls: ['./cobros-adicionales.component.scss']
})
export class CobrosAdicionalesComponent implements OnInit {
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  numero: number;
  descripcion: string;

  displayedColumns: String[] =['codigo', 'descripcion', 'desReportes'];
  title = 'Agregar';
  selectedValue: string = "";
  ngOnInit() {
  }
  //////
  constructor(public dialog: MatDialog) {
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog1(): void {
    const dialogRef = this.dialog.open(agregarCobrosAdicionales, {
      width: '720px',
      height: '400px',
      data: {numero: this.numero, descripcion: this.descripcion}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.numero = result;
    });
  }

  openDialog2(): void {
    const dialogRef = this.dialog.open(editarCobrosAdicionales, {
      width: '720px',
      height: '400px',
      data: {numero: this.numero, descripcion: this.descripcion}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.numero = result;
    });
  }

  openDialog3(): void {
    const dialogRef = this.dialog.open(eliminarCobrosAdicionales, {
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

@Component({ //Agregar
  selector: 'app-agregarCobrosAdicionales',
  templateUrl: './agregarCobrosAdicionales.html',
  styleUrls:['./cobros-adicionales.component.scss']
})
export class agregarCobrosAdicionales implements OnInit {
  checked = false;
  indeterminate = false;
  disabled = false;
  constructor(){}
  ngOnInit(){
  }
}

@Component({ //Editar
  selector: 'app-editarCobrosAdicionales',
  templateUrl: './editarCobrosAdicionales.html',
  styleUrls:['./cobros-adicionales.component.scss']
})
export class editarCobrosAdicionales implements OnInit {
  checked = false;
  indeterminate = false;
  disabled = false;
  constructor(){}
  ngOnInit(){
  }
}

@Component({ //Eliminar
  selector: 'app-eliminarCobrosAdicionales',
  templateUrl: './eliminarCobrosAdicionales.html',
  styleUrls:['./cobros-adicionales.component.scss']
})
export class eliminarCobrosAdicionales implements OnInit {
  checked = false;
  indeterminate = false;
  disabled = false;
  constructor(){}

  ngOnInit(){
  }
}

export interface PeriodicElement {
  codigo: number;
  descripcion: string;
  desReportes: string;

}
const ELEMENT_DATA: PeriodicElement[] = [
  { codigo: 1, descripcion: 'vista',  desReportes:'sueño'},
  { codigo: 2, descripcion: 'vista', desReportes: 'sueño'},
  { codigo: 3, descripcion: 'vista', desReportes: 'sueño'},
];