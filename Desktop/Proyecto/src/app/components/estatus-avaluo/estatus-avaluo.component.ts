import { MatTableDataSource } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { AvaluosService } from 'src/app/services/estatus-avaluo.service';
import { EstatusAvaluo } from 'src/app/models/estatus-avaluo.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-estatus-avaluo',
  templateUrl: './estatus-avaluo.component.html',
  styleUrls: ['./estatus-avaluo.component.scss'],
  providers: [AvaluosService]
})

export class EstatusAvaluoComponent implements OnInit, OnDestroy {

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  public avaluoGet: EstatusAvaluo[];
  public avaluos: EstatusAvaluo[];
  public agregarAvaluo: EstatusAvaluo;
  public editarAvaluo: EstatusAvaluo;
  public status: string;
  public selectedAvaluo: number;
  public numeroDePagina: number = 0;
  public lastPage: boolean;
  public firstPage: boolean;
  public elementosPorPagina;
  public cantidadDefinidaDeElementos: number = 10;

  constructor(public dialog: MatDialog, public snackBar: MatSnackBar, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private _avaluosService: AvaluosService) {
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
  selection = new SelectionModel<EstatusAvaluo>(false, []);
  dataSource = new MatTableDataSource<EstatusAvaluo>(this.avaluoGet);

  limpiarVariables() {
    this.agregarAvaluo = new EstatusAvaluo(0, 0, '', '', '1', true);
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
    this._avaluosService.listPage(this.numeroDePagina, this.cantidadDefinidaDeElementos).subscribe(
      response => {
        this.avaluoGet = response.content;
        this.avaluos = this.avaluoGet;
        this.lastPage = response.last;
        this.firstPage = response.first;
        this.elementosPorPagina = response.numberOfElements;
        console.table(this.avaluoGet)
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage)
      }
    )
  }


  applyFilter(filterValue: number) {
    if (filterValue) {
      this.avaluos = this.avaluoGet.filter(almacenadora => almacenadora.codigo == filterValue);
    } else {
      this.avaluos = this.avaluoGet;
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
      this.avaluoGet.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: EstatusAvaluo): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.codigo + 1}`;
  }

  imprimir() {
    this.selectedAvaluo = this.selection.selected.map(row => row.codigo)[0];
    console.log(this.selectedAvaluo);
    if (this.selectedAvaluo) {
      this.setMedio(this.selectedAvaluo);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(editarAvaluo, {
      width: '500px',
      // height: '350px',
      data: { codigo: this.editarAvaluo.codigo, descripcion: this.editarAvaluo.descripcion }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != undefined) {
        this.editarAvaluo.codigo = result.codigo;
        this.editarAvaluo.descripcion = result.descripcion;
        console.log(result);
        console.table(this.editarAvaluo);
        this.edit();
      }

    });
  }
  openDialog2(): void {
    const dialogRef = this.dialog.open(agregarAvaluo, {
      width: '500px',
      // height: '350px',
      data: { codigo: this.agregarAvaluo.codigo, descripcion: this.agregarAvaluo.descripcion }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.agregarAvaluo.codigo = result.codigo;
      this.agregarAvaluo.descripcion = result.descripcion;

      this._avaluosService.addAvaluo(this.agregarAvaluo).subscribe(
        response => {
          console.log(this.agregarAvaluo)
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
    const dialogRef = this.dialog.open(eliminarAvaluo, {
      width: '500px',
      height: '350px',
      data: { codigo: this.editarAvaluo.codigo, descripcion: this.editarAvaluo.descripcion }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != undefined) {
        this.editarAvaluo.codigo = result.codigo;
        this.editarAvaluo.descripcion = result.descripcion;
        console.log(result);
        console.table(this.editarAvaluo);
        this.delete(this.selectedAvaluo);
      }
    });
  }

  setMedio(id) {
    this._avaluosService.getAvaluo(id).subscribe(
      response => {
        if (response.code == 0) {
          this.editarAvaluo = response;
          console.log(this.editarAvaluo);
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
    this._avaluosService.editAvaluo(this.editarAvaluo).subscribe(
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
    this._avaluosService.deleteAvaluo(id).subscribe(
      response => {
        if (response.code == 0) {
          this.editarAvaluo = response;
          console.log(this.editarAvaluo);
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
  selector: 'app-editarAvaluo',
  templateUrl: './editarAvaluo.html',
})
export class editarAvaluo implements OnInit {
  public editarAvaluo: EstatusAvaluo;
  public status: string
  constructor(public dialogRef: MatDialogRef<editarAvaluo>,
    @Inject(MAT_DIALOG_DATA) public data: EstatusAvaluo) { }
  displayedColumns: String[] = ['posicion', 'numero', 'descripcion'];
  title = 'Mantenimiento a Estatus de Avaluos';
  selectedValue: string = "";
  ngOnInit() {
  }
}

@Component({
  selector: 'app-agregarAvaluo',
  templateUrl: './agregarAvaluo.html'

})
export class agregarAvaluo implements OnInit {
  public status: string
  public agregarAvaluo: EstatusAvaluo;
  constructor() {
  }
  ngOnInit() {
    this.limpiarVariables();
  }
  limpiarVariables() {
    this.agregarAvaluo = new EstatusAvaluo(0, 0, '', '', '1', true);
  }
}

@Component({
  selector: 'app-eliminarAvaluo',
  templateUrl: './eliminarAvaluo.html',
})
export class eliminarAvaluo implements OnInit {

  public editarAvaluo: EstatusAvaluo;
  public status: string
  constructor(public dialogRef: MatDialogRef<eliminarAvaluo>,
    @Inject(MAT_DIALOG_DATA) public data: EstatusAvaluo) { }


  ngOnInit() {
    //this.limpiarVariables();
  }
  //limpiarVariables() {
  // this.editarAlmacenadora = new Almacenadora(0, 0, '', '', '1', true);
  // } 
}