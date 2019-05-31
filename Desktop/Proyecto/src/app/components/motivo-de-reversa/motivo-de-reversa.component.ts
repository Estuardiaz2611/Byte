import {MatTableDataSource} from '@angular/material';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component,OnInit, OnDestroy} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
@Component({
  selector: 'app-motivo-de-reversa',
  templateUrl: './motivo-de-reversa.component.html',
  styleUrls: ['./motivo-de-reversa.component.scss']
})
export class MotivoDeReversaComponent implements OnInit, OnDestroy  {
  numero: number;
  descripcion: string;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void; 
 
  constructor(public dialog: MatDialog,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {  
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
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
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.numero + 1}`;
    } 

  ngOnInit() {
  }
  displayedColumns: string[] = ['select', 'numero', 'descripcion'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  openDialog1(): void { ///AGREGAR
    const dialogRef = this.dialog.open(agregarMotivoDeReversa, {
      width: '650px',
      height: '530px',
      data: {numero: this.numero, descripcion: this.descripcion}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.numero = result;
    });
  }

  openDialog2(): void { ///EDITAR
    const dialogRef = this.dialog.open(editarMotivoDeReversa, {
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
  selector: 'app-motivo-de-reversa',
  templateUrl: './agregarMotivoDeReversa.html',
  styleUrls: ['./motivo-de-reversa.component.scss']
})
export class agregarMotivoDeReversa implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}

@Component({ ///EDITAR
  selector: 'app-motivo-de-reversa',
  templateUrl: './editarMotivoDeReversa.html',
  styleUrls: ['./motivo-de-reversa.component.scss']
})
export class editarMotivoDeReversa implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}

export interface PeriodicElement {
  numero: number,
  descripcion: string,
}
const ELEMENT_DATA: PeriodicElement[] = [
  {numero: 1, descripcion: 'Hydrogen'},
  {numero: 2, descripcion: 'Helium'},
  {numero: 3, descripcion: 'Lithium'},
  {numero: 4, descripcion: 'Beryllium'},
  {numero: 5, descripcion: 'Boron'},
]; 