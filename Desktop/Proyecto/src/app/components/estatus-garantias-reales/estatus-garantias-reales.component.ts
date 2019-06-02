import { MatTableDataSource } from '@angular/material';
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
  public agregarEstatus: EstatusGarantiaReal;
  public editarEstatus: EstatusGarantiaReal;
  public status: string;
  public selectedEstatus: string;

  constructor(public dialog: MatDialog, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private _estatusService: EstatusService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
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

  public listarPagina() {
    this._estatusService.listPage(0, 10).subscribe(
      response => {
        if (response.content) {
          this.estatusGet = response.content;
          console.table(this.estatusGet);
        }
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
      }
    )
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
            console.log(response);
            this.status = 'ok';
            this.listarPagina();
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
            this.status = 'ok';
          } else {
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
}

@Component({
  selector: 'app-editarEstatus',
  templateUrl: './editarEstatus.html',
})
export class editarEstatus implements OnInit {
  public editarMedio: EstatusGarantiaReal;
  public status: string
  constructor(public dialogRef: MatDialogRef<editarEstatus>,
    @Inject(MAT_DIALOG_DATA) public data: EstatusGarantiaReal) { }
  displayedColumns: String[] = ['posicion', 'numero', 'descripcion'];
  title = 'Medios de Contacto';
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

  public editarMedio: EstatusGarantiaReal;
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