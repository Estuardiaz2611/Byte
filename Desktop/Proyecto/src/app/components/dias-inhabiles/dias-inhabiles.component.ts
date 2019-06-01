import {MatTableDataSource} from '@angular/material';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component,OnInit, OnDestroy} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-dias-inhabiles',
  templateUrl: './dias-inhabiles.component.html',
  styleUrls: ['./dias-inhabiles.component.scss']
})
export class DiasInhabilesComponent implements OnInit {
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  numero: number;
  descripcion: string;

  displayedColumns = ['tipoFeriado', 'fecha', 'descripcion'];
  title = 'Agregar';
  selectedValue: string = "";
  ngOnInit() {
  }
  //////
  constructor(public dialog: MatDialog){
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog1(): void {
    const dialogRef = this.dialog.open(agregarDiasInhabiles, {
      width: '720px',
      height: '450px',
      data: {numero: this.numero, descripcion: this.descripcion}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.numero = result;
    });
  }

  openDialog2(): void {
    const dialogRef = this.dialog.open(editarDiasInhabiles, {
      width: '720px',
      height: '450px',
      data: {numero: this.numero, descripcion: this.descripcion}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.numero = result;
    });
  }

  openDialog3(): void {
    const dialogRef = this.dialog.open(eliminarDiasInhabiles, {
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
  selector: 'app-agregarDiasInhabiles',
  templateUrl: './agregarDiasInhabiles.html',
  styleUrls:['./dias-inhabiles.component.scss']
})
export class agregarDiasInhabiles implements OnInit {
  checked = false;
  indeterminate = false;
  disabled = false;
  constructor(){}
  ngOnInit(){
  }
}

@Component({ //Editar
  selector: 'app-editarDiasInhabiles',
  templateUrl: './editarDiasInhabiles.html',
  styleUrls:['./dias-inhabiles.component.scss']
})
export class editarDiasInhabiles implements OnInit {
  checked = false;
  indeterminate = false;
  disabled = false;
  constructor(){}
  ngOnInit(){
  }
}

@Component({ //Eliminar
  selector: 'app-eliminarDiasInhabiles',
  templateUrl: './eliminarDiasInhabiles.html',
  styleUrls:['./dias-inhabiles.component.scss']
})
export class eliminarDiasInhabiles implements OnInit {
  checked = false;
  indeterminate = false;
  disabled = false;
  constructor(){}

  ngOnInit(){
  }
}

export interface PeriodicElement {
  tipoFeriado: string;
  fecha: string;
  descripcion: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {tipoFeriado: 'fijo', fecha: '12/25/15', descripcion: 'asdasdasd'},
  {tipoFeriado: 'fijo', fecha: 'Helium', descripcion: 'asdasdasd'},
  {tipoFeriado: 'fijo', fecha: 'Lithium', descripcion: 'asdasdasd'},
  {tipoFeriado: 'fijo', fecha: 'Beryllium', descripcion: 'asdasdasd'},
  {tipoFeriado: 'fijo', fecha: 'Boron', descripcion: 'asdasdasd'},
];


