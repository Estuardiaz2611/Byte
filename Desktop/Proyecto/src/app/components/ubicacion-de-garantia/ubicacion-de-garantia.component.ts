import {MatTableDataSource} from '@angular/material';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component,OnInit, OnDestroy} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-ubicacion-de-garantia',
  templateUrl: './ubicacion-de-garantia.component.html',
  styleUrls: ['./ubicacion-de-garantia.component.scss']
})

export class UbicacionDeGarantiaComponent implements OnInit, OnDestroy {
  codigo: number;
  descripcion: string;
  title = 'Agregar';
  selectedValue: string = "";
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
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.codigo + 1}`;
    } 
  ngOnInit() {
  }

  displayedColumns: string[] = ['select', 'codigo', 'descripcion'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog1(): void { ///AGREGAR
    const dialogRef = this.dialog.open(agregarUbicacionDeGarantia, {
      width: '650px',
      height: '340px',
      data: {codigo: this.codigo, descripcion: this.descripcion}
    });
  }
    openDialog2(): void { ///EDITAR
      const dialogRef = this.dialog.open(editarUbicacionDeGarantia, {
        width: '550px',
        height: '300px',
        data: {codigo: this.codigo, descripcion: this.descripcion}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.codigo = result;
      });
    }
    openDialog3(): void { //ELIMINAR
      const dialogRef = this.dialog.open(eliminarUbicacionDeGarantia, {
        width: '500px',
        height: '270px',
        data: {codigo: this.codigo, descripcion: this.descripcion}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.codigo = result;
      });
    }
}

@Component({//AGREGAR
  selector: 'app-ubicacion-de-garantia',
  templateUrl: './agregar-ubicacion-de-garantia.html',
  styleUrls: ['./ubicacion-de-garantia.component.scss']
})

export class agregarUbicacionDeGarantia implements OnInit {
  checked = false;
  indeterminate = false;
  disabled = false;
  constructor(){
  }
  displayedColumns = ['select', 'codigo', 'descripcion'];
  selectedValue: string = "";
  dataSource = ELEMENT_DATA;
  ngOnInit(){}
  
}

@Component({//EDITAR
  selector: 'app-ubicacion-de-garantia',
  templateUrl: './editar-ubicacion-de-garantia.html',
  styleUrls: ['./ubicacion-de-garantia.component.scss']
})

export class editarUbicacionDeGarantia implements OnInit {
  checked = false;
  indeterminate = false;
  disabled = false;

  constructor() { }
  displayedColumns = ['codigo', 'descripcion'];
  selectedValue: string = "";
  dataSource = ELEMENT_DATA;
  ngOnInit() {
  }
}

@Component({ //ELIMINAR
  selector: 'app-ubicacion-de-garantia',
  templateUrl: './eliminar-ubicacion-de-garantia.html',
  styleUrls: ['./ubicacion-de-garantia.component.scss']
})
export class eliminarUbicacionDeGarantia implements OnInit {
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
}

const ELEMENT_DATA: PeriodicElement[] = [
  {codigo: 1, descripcion:"asdf"},
  {codigo: 2, descripcion:"ñlkj"},
  {codigo: 3, descripcion:"jhgf"},
];