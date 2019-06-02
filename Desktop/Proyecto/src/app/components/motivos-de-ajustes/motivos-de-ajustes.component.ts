import {MatTableDataSource} from '@angular/material';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component,OnInit, OnDestroy} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MotivoDeAjuste } from 'src/app/models/motivo-de-ajuste.model';
import { SelectionModel } from '@angular/cdk/collections';
@Component({
  selector: 'app-motivos-de-ajustes',
  templateUrl: './motivos-de-ajustes.component.html',
  styleUrls: ['./motivos-de-ajustes.component.scss']
})
export class MotivosDeAjustesComponent implements OnInit, OnDestroy {
  public agregarMotivoDeAjuste: MotivoDeAjuste

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
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
    } 
ngOnInit() {
  this.agregarMotivoDeAjuste = new MotivoDeAjuste(0, 0, '', '', '1', true);
}
displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol', 'saldo'];
dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
selection = new SelectionModel<PeriodicElement>(true, []);

applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
openDialog1(): void { ///AGREGAR
  const dialogRef = this.dialog.open(agregarMotivosDeAjustes, {
    width: '720px',
    height: '455px',
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
    height: '455px',
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