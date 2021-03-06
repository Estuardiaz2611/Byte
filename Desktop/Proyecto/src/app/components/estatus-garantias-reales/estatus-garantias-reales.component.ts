import { MatTableDataSource } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { EstatusService } from 'src/app/services/estatus-garantias-reales.service';
import { EstatusGarantiaReal } from 'src/app/models/estatus-garantias-reales.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-estatus-garantias-reales',
  templateUrl: './estatus-garantias-reales.component.html',
  styleUrls: ['./estatus-garantias-reales.component.scss'],
  providers: [EstatusService]
})

export class EstatusGarantiasRealesComponent implements OnInit, OnDestroy {

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  public estatusGet: EstatusGarantiaReal[];
  public estatus: EstatusGarantiaReal[];
  public agregarEstatus: EstatusGarantiaReal;
  public editarEstatus: EstatusGarantiaReal;
  public status: string;
  public selectedEstatus: string;
  public numeroDePagina: number = 0;
  public lastPage: boolean;
  public firstPage: boolean;
  public elementosPorPagina;
  public cantidadDefinidaDeElementos: number = 10;

  constructor(public dialog: MatDialog, public snackBar: MatSnackBar, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private _estatusService: EstatusService) {
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
  selection = new SelectionModel<EstatusGarantiaReal>(false, []);
  dataSource = new MatTableDataSource<EstatusGarantiaReal>(this.estatusGet);

  limpiarVariables() {
    this.agregarEstatus = new EstatusGarantiaReal(0, '', '', '', true);
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
    this._estatusService.listPage(this.numeroDePagina, this.cantidadDefinidaDeElementos).subscribe(
      response => {
        this.estatusGet = response.content;
        this.estatus = this.estatusGet;
        this.lastPage = response.last;
        this.firstPage = response.first;
        this.elementosPorPagina = response.numberOfElements;
        console.table(this.estatusGet)
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage)
      }
    )
  }


  //applyFilter(filterValue: number) {
  //  if (filterValue) {
  //    this.estatus = this.estatusGet.filter(estatu => estatu.codigo == filterValue);
  //  } else {
  //    this.estatus = this.estatusGet;
  //  }
    // console.log("sip")
  //}

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
      this.estatusGet.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: EstatusGarantiaReal): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.codigo + 1}`;
  }

  imprimir() {
    this.selectedEstatus = this.selection.selected.map(row => row.codigo.toString())[0];
    console.log(this.selectedEstatus);
    if (this.selectedEstatus) {
      this.setEstatus(this.selectedEstatus);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(editarEstatus, {
      width: '500px',
      // height: '350px',
      data: { codigo: this.editarEstatus.codigo, descripcion: this.editarEstatus.descripcion }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != undefined) {
        this.editarEstatus.codigo = result.codigo;
        this.editarEstatus.descripcion = result.descripcion;
        console.log(result);
        console.table(this.editarEstatus);
        this.edit();
      }

    });
  }
  openDialog2(): void {
    const dialogRef = this.dialog.open(agregarEstatus, {
      width: '500px',
      // height: '350px',
      data: { codigo: this.agregarEstatus.codigo, descripcion: this.agregarEstatus.descripcion }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.agregarEstatus.codigo = result.codigo;
      this.agregarEstatus.descripcion = result.descripcion;

      this._estatusService.addEstatus(this.agregarEstatus).subscribe(
        response => {
          console.log(this.agregarEstatus);
          console.log(response);
          if (response) {
            this.snackBar.open('Agregado correctamente','',{duration: 2500});
            console.log(response);
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
    const dialogRef = this.dialog.open(eliminarEstatus, {
      width: '500px',
      height: '350px',
      data: { codigo: this.editarEstatus.codigo, descripcion: this.editarEstatus.descripcion }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != undefined) {
        console.log(result)
        this.delete(this.selectedEstatus);
      }
    });
  }
  
  setEstatus(id) {
    this._estatusService.getEstatus(id).subscribe(
      response => {
        if (response.code == 0) {
          this.editarEstatus = response;
          console.log(this.editarEstatus);
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
      this._estatusService.editEstatus(this.editarEstatus).subscribe(
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
        this._estatusService.deleteEstatus(id).subscribe(
          response => {
            if (response.code == 0) {
              this.editarEstatus = response;
              console.log(this.editarEstatus);
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
  selector: 'app-editarEstatus',
  templateUrl: './editarEstatus.html',
})
export class editarEstatus implements OnInit {
  public editarEstatus: EstatusGarantiaReal;
  public status: string
  constructor(public dialogRef: MatDialogRef<editarEstatus>,
    @Inject(MAT_DIALOG_DATA) public data: EstatusGarantiaReal) { }
  displayedColumns: String[] = ['posicion', 'numero', 'descripcion'];
  title = 'Estatus Garantias Reales';
  selectedValue: string = "";
  ngOnInit() {
  }
}

@Component({
  selector: 'app-agregarEstatus',
  templateUrl: './agregarEstatus.html'

})
export class agregarEstatus implements OnInit {
  public status: string
  public agregarEstatus: EstatusGarantiaReal;
  constructor() {
  }
  ngOnInit() {
    this.limpiarVariables();
  }
  limpiarVariables() {
    this.agregarEstatus = new EstatusGarantiaReal(0, '', '', '', true);
  }
}

@Component({
  selector: 'app-eliminarEstatus',
  templateUrl: './eliminarEstatus.html',
})
export class eliminarEstatus implements OnInit {

  public editarEstatus: EstatusGarantiaReal;
  public status: string
  constructor(public dialogRef: MatDialogRef<eliminarEstatus>,
    @Inject(MAT_DIALOG_DATA) public data: EstatusGarantiaReal) { }


  ngOnInit() {
    //this.limpiarVariables();
  }
  //limpiarVariables() {
  // this.editarAlmacenadora = new Almacenadora(0, 0, '', '', '1', true);
  // } 
}