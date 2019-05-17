import {MatTableDataSource, MatDialog} from '@angular/material';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component,OnInit, OnDestroy} from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
export interface PeriodicElement {
  descripcion: string;
  codigo: number;
} 
const ELEMENT_DATA: PeriodicElement[] = [
  {codigo: 1, descripcion: 'Hydrogen'},
  {codigo: 2, descripcion: 'Helium'},
  {codigo: 3, descripcion: 'Lithium'},
  {codigo: 4, descripcion: 'Beryllium'},
  {codigo: 5, descripcion: 'Boron'},
]; 
@Component({
  selector: 'app-contabilizacion',
  templateUrl: './contabilizacion.component.html',
  styleUrls: ['./contabilizacion.component.scss']
})
export class ContabilizacionComponent implements OnInit, OnDestroy {

  descripcion: string;
  codigo: number;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void; 


  constructor(public dialog: MatDialog, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) { 
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  } 
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  
  ngOnInit() {
  }
  
  displayedColumns: string[] = ['select', 'codigo', 'descripcion'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows; 
  }
  
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  } 
  
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.codigo + 1}`;
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(cotabilidad1, {
      width: '500px',
      height: '350px',
      data: { codigo:this.codigo, descripcion: this.descripcion,}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.codigo = result;
    });
  }  
  openDialog2(): void {
    const dialogRef = this.dialog.open(cotabilidad2, {
      width: '500px',
      height: '350px',
      data: { codigo:this.codigo, descripcion: this.descripcion,}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.codigo = result;
    });
  } 

} 
@Component({
  selector: 'app-contabilizacion',
  templateUrl: './cotabilida1.html',
}) 
export class cotabilidad1 implements OnInit {
  
  constructor() { }
  displayedColumns: String[] =['posicion',  'numero',  'descripcion'];
  title = 'Conta';
  selectedValue: string = "";
  dataSource = ELEMENT_DATA;
  ngOnInit() {
  }
} 

@Component({
  selector: 'app-contabilizacion',
  templateUrl: './cotabilidad2.html',
}) 
export class cotabilidad2 implements OnInit {
  
  constructor() { }
  displayedColumns: String[] =['posicion',  'numero',  'descripcion'];
  title = 'Conta';
  selectedValue: string = "";
  dataSource = ELEMENT_DATA;
  ngOnInit() {
  }
}

@Component({
  selector: 'app-agregarcontabilizacion',
  templateUrl: './contabilizacion.html',
}) 
export class agregarcontabilizacion implements OnInit {
  
  constructor() { }

  ngOnInit() {
  }
}

