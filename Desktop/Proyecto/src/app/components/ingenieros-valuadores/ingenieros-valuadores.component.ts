import { MatTableDataSource } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { IngenierosService } from 'src/app/services/ingenieros-valuadores.service';
import { IngenieroValuador } from 'src/app/models/ingenieros-valuadores.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-ingenieros-valuadores',
  templateUrl: './ingenieros-valuadores.component.html',
  styleUrls: ['./ingenieros-valuadores.component.scss'],
  providers: [IngenierosService]
})

export class IngenierosValuadoresComponent implements OnInit, OnDestroy {

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  public ingeGet: IngenieroValuador[];
  public inges: IngenieroValuador[];
  public agregarInge: IngenieroValuador;
  public editarInge: IngenieroValuador;
  public status: string;
  public selectedInge: number;
  public numeroDePagina: number = 0;
  public lastPage: boolean;
  public firstPage: boolean;
  public elementosPorPagina;
  public cantidadDefinidaDeElementos: number = 10;

  constructor(public dialog: MatDialog, public snackBar: MatSnackBar, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private _ingenierosService: IngenierosService) {
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
  selection = new SelectionModel<IngenieroValuador>(false, []);
  dataSource = new MatTableDataSource<IngenieroValuador>(this.ingeGet);

  limpiarVariables() {
    this.agregarInge = new IngenieroValuador(0, 0, '', '', '1', true, '');
  }

  public mas() {
    if (!this.lastPage) {
      ++this.numeroDePagina;
      this.listarPagina();
    }
  }

  public menos() {
    if (!this.firstPage) {
      --this.numeroDePagina;
      this.listarPagina();
    }
  }


  public listarPagina() {
    this._ingenierosService.listPage(this.numeroDePagina, this.cantidadDefinidaDeElementos).subscribe(
      response => {
        this.ingeGet = response.content;
        this.inges = this.ingeGet;
        this.lastPage = response.last;
        this.firstPage = response.first;
        this.elementosPorPagina = response.numberOfElements;
        console.table(this.ingeGet)
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage)
      }
    )
  }


  applyFilter(filterValue: number) {
    if (filterValue) {
      this.inges = this.ingeGet.filter(ingeniero => ingeniero.codigo == filterValue);
    } else {
      this.inges = this.ingeGet;
    }
    // console.log("sip")
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    //const numRows = this.almacenadoraGet.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.ingeGet.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: IngenieroValuador): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.codigo + 1}`;
  }

  imprimir() {
    this.selectedInge = this.selection.selected.map(row => row.codigo)[0];
    console.log(this.selectedInge);
    if (this.selectedInge) {
      this.setMedio(this.selectedInge);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(editarIngenieros, {
      width: '500px',
      // height: '350px',
      data: { codigo: this.editarInge.codigo, descripcion: this.editarInge.descripcion, numeroRegistro: this.editarInge.numeroRegistro }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != undefined) {
        this.editarInge.codigo = result.codigo;
        this.editarInge.descripcion = result.descripcion;
        this.editarInge.numeroRegistro = result.numeroRegistro;
        console.log(result);
        console.table(this.editarInge);
        this.edit();
      }

    });
  }
  openDialog2(): void {
    const dialogRef = this.dialog.open(agregarIngenieros, {
      width: '500px',
      // height: '350px',
      data: { codigo: this.agregarInge.codigo, descripcion: this.agregarInge.descripcion, numeroRegistro: this.agregarInge.numeroRegistro }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.agregarInge.codigo = result.codigo;
      this.agregarInge.descripcion = result.descripcion;
      this.agregarInge.numeroRegistro = result.numeroRegistro;

      this._ingenierosService.addIngeniero(this.agregarInge).subscribe(
        response => {
          console.log(this.agregarInge)
          console.log(response)
          if (response) {
            this.snackBar.open('Agregado correctamente','',{duration: 2500});
            console.log(response)
            this.status = 'ok';
            this.listarPagina();
          }else{
            this.snackBar.open(response.description, '',{duration: 2500});
          }
        },
        error => {
          var errorMessage = <any>error;
          console.log(errorMessage)
        }
      )
    });
  }

  openDialog3(): void {
    const dialogRef = this.dialog.open(eliminarIngenieros, {
      width: '500px',
      height: '350px',
      data: { codigo: this.editarInge.codigo, descripcion: this.editarInge.descripcion, numeroRegistro: this.editarInge.numeroRegistro }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != undefined) {
        this.editarInge.codigo = result.codigo;
        this.editarInge.descripcion = result.descripcion;
        this.editarInge.numeroRegistro = result.numeroRegistro;
        console.log(result);
        console.table(this.editarInge);
        this.delete(this.selectedInge);
      }
    });
  }

  setMedio(id) {
    this._ingenierosService.getIngeniero(id).subscribe(
      response => {
        if (response.code == 0) {
          this.editarInge = response;
          console.log(this.editarInge);
          this.status = 'ok';
        } else {
          this.status = 'error';
        }
      }, error => {
        let errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    );
  }

  edit() {
    this._ingenierosService.editIngeniero(this.editarInge).subscribe(
      response => {
        console.log(response);
        this.listarPagina();
        if (response.code == 0) {
          this.snackBar.open('Actualizado correctamente','',{duration: 2500});
          this.status = 'ok';
        } else {
          this.snackBar.open(response.description, '',{duration: 2500});
          alert(response.description);
        }
      }, error => {
        let errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          alert(error.description);
          this.status = 'error';
        }
      }
    );
  }
  delete(id) {
    // if (this.estatusGet == undefined) retu rn;
    this._ingenierosService.deleteIngeniero(id).subscribe(
      response => {
        if (response.code == 0) {
          this.editarInge = response;
          console.log(this.editarInge);
          this.status = 'ok';
          this.listarPagina();
          this.snackBar.open('Eliminado correctamente','',{duration: 2500});
        } else {
          this.snackBar.open(response.description, '',{duration: 2500});
          this.status = 'error';
        }
      }, error => {
        let errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    );
  }
}

@Component({
  selector: 'app-editarIngenieros',
  templateUrl: './editarIngenieros.html',
})
export class editarIngenieros implements OnInit {
  public editarMedio: IngenieroValuador;
  public status: string
  constructor(public dialogRef: MatDialogRef<editarIngenieros>,
    @Inject(MAT_DIALOG_DATA) public data: IngenieroValuador) { }
  displayedColumns: String[] = ['posicion', 'numero', 'descripcion'];
  title = 'Mantenimiento a Supervisores';
  selectedValue: string = "";
  ngOnInit() {
  }
}

@Component({
  selector: 'app-agregarIngenieros',
  templateUrl: './agregarIngenieros.html'

})
export class agregarIngenieros implements OnInit {
  public status: string
  public agregarInge: IngenieroValuador;
  constructor() {
  }
  ngOnInit() {
    this.limpiarVariables();
  }
  limpiarVariables() {
    this.agregarInge = new IngenieroValuador(0, 0, '', '', '1', true, '');
  }
}

@Component({
  selector: 'app-eliminarIngenieros',
  templateUrl: './eliminarIngenieros.html',
})
export class eliminarIngenieros implements OnInit {

  public editarMedio: IngenieroValuador;
  public status: string
  constructor(public dialogRef: MatDialogRef<eliminarIngenieros>,
    @Inject(MAT_DIALOG_DATA) public data: IngenieroValuador) { }


  ngOnInit() {
    //this.limpiarVariables();
  }
  //limpiarVariables() {
  // this.editarAlmacenadora = new Almacenadora(0, 0, '', '', '1', true);
  // } 
}