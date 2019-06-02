import { MatTableDataSource, MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, OnDestroy, Inject} from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { FormasDeDesembolso } from 'src/app/models/formasDeDesembolso.model';
import { FormasDeDesembolsoService } from 'src/app/services/formas-de-desembolso.service';


@Component({
  selector: 'app-formas-de-desembolso',
  templateUrl: './formas-de-desembolso.component.html',
  styleUrls: ['./formas-de-desembolso.component.scss'],
  providers: [FormasDeDesembolsoService]
})
export class FormasDeDesembolsoComponent implements OnInit, OnDestroy {

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  public formasDesembolsoGet: FormasDeDesembolso[];
  public agregarFormasDesembolso: FormasDeDesembolso;
  public editarFormasDesembolso: FormasDeDesembolso;
  public status: string;
  public selectedFormasDesembolso: number;
 
  constructor(public dialog: MatDialog,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private _formasDeDesembolsoService: FormasDeDesembolsoService) {  
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.listarPagina();
    this.limpiarVariables();
  }

  displayedColumns: string[] = ['select', 'codigo', 'descripcion'];
  selection = new SelectionModel<FormasDeDesembolso>(false, []);
  dataSource = new MatTableDataSource<FormasDeDesembolso>(this.formasDesembolsoGet);

  limpiarVariables() {
    this.agregarFormasDesembolso = new FormasDeDesembolso(0, 0, '', '', true);
  }

  public listarPagina() {
    this._formasDeDesembolsoService.listPage(0, 10).subscribe(
      response => {
        this.formasDesembolsoGet = response.content;
        console.table(this.formasDesembolsoGet)
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage)
      }
    )
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
          this.formasDesembolsoGet.forEach(row => this.selection.select(row));
    }
    
    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: FormasDeDesembolso): string {
      if (!row) {
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.codigo + 1}`;
    } 

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  imprimir() {
    this.selectedFormasDesembolso = this.selection.selected.map(row => row.codigo)[0];
    console.log(this.selectedFormasDesembolso);
    if(this.selectedFormasDesembolso) {
      this.setFormasDesembolso(this.selectedFormasDesembolso);
    }
  }
  
//////
openDialog1(): void { ///AGREGAR
  const dialogRef = this.dialog.open(agregarFormasDeDesembolso, {
    width: '470px',
    height: '420px',
    data: {codigo: this.agregarFormasDesembolso.codigo, descripcion: this.agregarFormasDesembolso.descripcion}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    console.log(result);
    this.agregarFormasDesembolso.codigo = result.codigo;
    this.agregarFormasDesembolso.descripcion = result.descripcion;

    this._formasDeDesembolsoService.addFormasDesembolso(this.agregarFormasDesembolso).subscribe(
      response => {
        console.log(this.agregarFormasDesembolso)
        console.log(response)
        if(response) {
          console.log(response)
          this.listarPagina();
          this.status = 'ok'
        }
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage)
      }
    )
  });
}

openDialog2(): void { ///EDITAR
  const dialogRef = this.dialog.open(editarFormasDeDesembolso, {
    width: '350px',
    height: '200px',
    data: {codigo: this.editarFormasDesembolso.codigo, descripcion: this.editarFormasDesembolso.descripcion}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    if(result != undefined) {
      this.editarFormasDesembolso.codigo = result.codigo;
      this.editarFormasDesembolso.descripcion = result.descripcion;
      console.log(result);
      console.table(this.editarFormasDesembolso);
      this.edit();
    }
  });
}

openDialog3(): void { ///ELIMINAR
  const dialogRef = this.dialog.open(eliminarFormasDeDesembolso, {
    width: '400px',
    height: '300px',
    data: {codigo: this.editarFormasDesembolso.codigo, descripcion: this.editarFormasDesembolso.descripcion}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    if(result != undefined){
      this.editarFormasDesembolso.codigo = result.codigo;
      this.editarFormasDesembolso.descripcion = result.descripcion;
      console.log(result);
      console.table(this.editarFormasDesembolso);
      this.delete(this.selectedFormasDesembolso);
    }
  })
}

setFormasDesembolso(id) {
  this._formasDeDesembolsoService.getFormasDesembolso(id).subscribe(
    response => {
      if(response.code == 0) {
        this.editarFormasDesembolso = response;
        console.log(this.editarFormasDesembolso);
        this.status='ok';
      } else {
        this.status = 'error';
      }
    }, error => {
      let errorMessage = <any>error;
      console.log(errorMessage);
      if(errorMessage != null){
        this.status = 'error';
      }
    }
  );
}

edit() {
  this._formasDeDesembolsoService.editFormasDesembolso(this.editarFormasDesembolso).subscribe(
    response => {
      console.log(response);
      this.listarPagina();
      if(response.code == 0){
        this.status = 'ok';
      } else {
        alert(response.description);
      }
    }, error => {
      let errorMessage = <any>error;
      console.log(errorMessage);
      if(errorMessage != null){
        alert(error.description);
        this.status = 'error';
      }
    }
  );
}

delete(id) {
  if(this.formasDesembolsoGet == undefined) return;
  this._formasDeDesembolsoService.deleteFormasDesembolso(id).subscribe(
    response => {
      if(response.code == 0){
        this.editarFormasDesembolso = response;
        console.log(this.editarFormasDesembolso)
        this.listarPagina();
        this.status = 'ok';
      } else {
        this.status = 'ok';
      }
    }, error => {
      let errorMessage = <any>error;
      console.log(errorMessage);
      if(errorMessage != null){
        this.status = 'error';
      }
    }
  );
}

}


@Component({ ///AGREGAR
  selector: 'app-formas-de-desembolso',
  templateUrl: './agregarFormasDeDesembolso.html',
  styleUrls: ['./formas-de-desembolso.component.scss']
})
export class agregarFormasDeDesembolso implements OnInit {
  public agregarFormasDesembolso: FormasDeDesembolso;
  public status: string;

  constructor() { }

  ngOnInit() {
    this.limpiarVariables();
  }
  limpiarVariables() {
    this.agregarFormasDesembolso = new FormasDeDesembolso(0, 0, '', '', true);
  }
}

@Component({ ///EDITAR
  selector: 'app-formas-de-desembolso',
  templateUrl: './editarFormasDeDesembolso.html',
  styleUrls: ['./formas-de-desembolso.component.scss']
})
export class editarFormasDeDesembolso implements OnInit {
  public editarFormasDesembolso: FormasDeDesembolso;
  public status: string;

  constructor(public dialogRef: MatDialogRef<editarFormasDeDesembolso>,
    @Inject(MAT_DIALOG_DATA) public data: FormasDeDesembolso) { }
    displayedColumns: String[] = ['posicion', 'numero', 'descripcion'];
    title = 'FormasDeDesembolso';
    selectedValue: string = "";

  ngOnInit() {

  }
}

@Component({ ///ELIMINAR
  selector: 'app-formas-de-desembolso',
  templateUrl: './eliminarFormasDeDesembolso.html',
  styleUrls: ['./formas-de-desembolso.component.scss']
})
export class eliminarFormasDeDesembolso implements OnInit {
  checked = false;
  indeterminate = false;
  disabled = false;
  
  public editarFormasDesembolso: FormasDeDesembolso;
  public status: string;

  constructor( public dialogRef: MatDialogRef<eliminarFormasDeDesembolso>,
    @Inject(MAT_DIALOG_DATA) public data: FormasDeDesembolso) { }

  ngOnInit() {
  }
}