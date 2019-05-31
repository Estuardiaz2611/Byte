import {MatTableDataSource} from '@angular/material';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component,OnInit, OnDestroy} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-motivos-de-ajustes',
  templateUrl: './motivos-de-ajustes.component.html',
  styleUrls: ['./motivos-de-ajustes.component.scss']
})
export class MotivosDeAjustesComponent implements OnInit {

  displayedColumnss = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  numero: number;
  descripcion: string;
   
  displayedColumns = ['position', 'name', 'weight', 'symbol'];
  title = 'Agregar';
  selectedValue: string = "";
  //dataSource = ELEMENT_DATA;
  ngOnInit() {
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

  constructor() { }
  displayedColumns = ['position', 'name', 'weight', 'symbol'];
  selectedValue: string = "";
  dataSource = ELEMENT_DATA;
  ngOnInit() {
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
  displayedColumns = ['position', 'name', 'weight', 'symbol'];
  selectedValue: string = "";
  dataSource = ELEMENT_DATA;
  ngOnInit() {
  }
}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];