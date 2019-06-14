import { MatTableDataSource } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { FormasDePagoService } from 'src/app/services/formasDePago.service';
import { FormasDePago } from 'src/app/models/formasDePago.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-formas-de-pago',
  templateUrl: './formas-de-pago.component.html',
  styleUrls: ['./formas-de-pago.component.scss'],
  providers: [FormasDePagoService]
})

export class FormasDePagoComponent implements OnInit, OnDestroy {

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  public formaGet: FormasDePago [];
  public formas: FormasDePago [];
  public agregarForma: FormasDePago ;
  public editarForma: FormasDePago ;
  public status: string;
  public selectedForma: number;
  public numeroDePagina: number = 0;
  public lastPage: boolean;
  public firstPage: boolean;
  public elementosPorPagina;
  public cantidadDefinidaDeElementos: number = 10;

  constructor(public dialog: MatDialog, public snackBar: MatSnackBar, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private _FormasService: FormasDePagoService) {
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
  selection = new SelectionModel<FormasDePago>(false, []);
  dataSource = new MatTableDataSource<FormasDePago>(this.formaGet);

  limpiarVariables() {
    this.agregarForma = new FormasDePago(0, '', '1');
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
    this._FormasService.listPage(this.numeroDePagina, this.cantidadDefinidaDeElementos).subscribe(
      response => {
        this.formaGet = response.content;
        this.formas = this.formaGet;
        this.lastPage = response.last;
        this.firstPage = response.first;
        this.elementosPorPagina = response.numberOfElements;
        console.table(this.formaGet)
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage)
      }
    )
  }


  applyFilter(filterValue: number) {
    if (filterValue) {
      this.formas = this.formaGet.filter(forma => forma.codigo == filterValue);
    } else {
      this.formas = this.formaGet;
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
      this.formaGet.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: FormasDePago ): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.codigo + 1}`;
  }

  imprimir() {
    this.selectedForma = this.selection.selected.map(row => row.codigo)[0];
    console.log(this.selectedForma);
    if (this.selectedForma) {
      this.setForma(this.selectedForma);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(editarFormasDePago, {
      width: '500px',
      // height: '350px',
      data: { codigo: this.editarForma.codigo, descripcion: this.editarForma.descripcion }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != undefined) {
        this.editarForma.codigo = result.codigo;
        this.editarForma.descripcion = result.descripcion;
        console.log(result);
        console.table(this.editarForma);
        this.edit();
      }

    });
  }
  openDialog2(): void {
    const dialogRef = this.dialog.open(agregarFormasDePago, {
      width: '500px',
      // height: '350px',
      data: { codigo: this.agregarForma.codigo, descripcion: this.agregarForma.descripcion }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.agregarForma.codigo = result.codigo;
      this.agregarForma.descripcion = result.descripcion;

      this._FormasService. addForma(this.agregarForma).subscribe(
        response => {
          console.log(this.agregarForma)
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
    const dialogRef = this.dialog.open(eliminarFormasDePago, {
      width: '500px',
      height: '350px',
      data: { codigo: this.editarForma.codigo, descripcion: this.editarForma.descripcion }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != undefined) {
        this.editarForma.codigo = result.codigo;
        this.editarForma.descripcion = result.descripcion;
        console.log(result);
        console.table(this.editarForma);
        this.delete(this.selectedForma);
      }
    });
  }

  setForma(id) {
    this._FormasService.getForma(id).subscribe(
      response => {
        if (response.code == 0) {
          this.editarForma = response;
          console.log(this.editarForma);
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
    this._FormasService.editForma(this.editarForma).subscribe(
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
    this._FormasService. deleteForma(id).subscribe(
      response => {
        if (response.code == 0) {
          this.editarForma = response;
          console.log(this.editarForma);
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
  selector: 'app-formas-de-pago',
  templateUrl: './editar-formas-de-pago.html',
  styleUrls: ['./formas-de-pago.component.scss']
})
export class editarFormasDePago implements OnInit {
  public editarForma: FormasDePago;
  public status: string
  constructor(public dialogRef: MatDialogRef<editarFormasDePago>,
    @Inject(MAT_DIALOG_DATA) public data: FormasDePago) { }
  displayedColumns: String[] = ['posicion', 'numero', 'descripcion'];
  title = 'Formas De Pago';
  selectedValue: string = "";
  ngOnInit() {
  }
}

@Component({
  selector: 'app-formas-de-pago',
  templateUrl: './agregar-formas-de-pago.html',
  styleUrls: ['./formas-de-pago.component.scss']

})
export class agregarFormasDePago implements OnInit {
  public status: string
  public agregarForma: FormasDePago;
  constructor() {
  }
  ngOnInit() {
    this.limpiarVariables();
  }
  limpiarVariables() {
    this.agregarForma = new FormasDePago(0, '', '1');
  }
}

@Component({
  selector: 'app-formas-de-pago',
  templateUrl: './eliminar-formas-de-pago.html',
  styleUrls: ['./formas-de-pago.component.scss']
})
export class eliminarFormasDePago implements OnInit {

  public editarForma: FormasDePago;
  public status: string
  constructor(public dialogRef: MatDialogRef<FormasDePago>,
    @Inject(MAT_DIALOG_DATA) public data: FormasDePago) { }


  ngOnInit() {
    //this.limpiarVariables();
  }
  //limpiarVariables() {
  // this.editarAlmacenadora = new Almacenadora(0, 0, '', '', '1', true);
  // } 
}