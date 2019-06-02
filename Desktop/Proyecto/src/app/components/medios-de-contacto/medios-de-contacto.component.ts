import { MatTableDataSource } from '@angular/material';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MediosService } from 'src/app/services/medio-de-contacto.service';
import { MediodeContacto } from 'src/app/models/medio-de-contacto.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-medios-de-contacto',
  templateUrl: './medios-de-contacto.component.html',
  styleUrls: ['./medios-de-contacto.component.scss'],
  providers: [MediosService]
})

export class MediosDeContactoComponent implements OnInit, OnDestroy {

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  public medioGet: MediodeContacto[];
  public agregarMedio: MediodeContacto;
  public editarMedio: MediodeContacto;
  public status: string;
  public selectedMedio: number;

  constructor(public dialog: MatDialog, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private _mediosService: MediosService) {
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
  selection = new SelectionModel<MediodeContacto>(false, []);
  dataSource = new MatTableDataSource<MediodeContacto>(this.medioGet);

  limpiarVariables() {
    this.agregarMedio = new MediodeContacto(0, 0, '', '', '1', true);
  }

  public listarPagina() {
    this._mediosService.listPage(0, 10).subscribe(
      response => {
        this.medioGet = response.content;
        console.table(this.medioGet)
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
    //const numRows = this.almacenadoraGet.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.medioGet.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: MediodeContacto): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.codigo + 1}`;
  }

  imprimir() {
    this.selectedMedio = this.selection.selected.map(row => row.codigo)[0];
    console.log(this.selectedMedio);
    if (this.selectedMedio) {
      this.setMedio(this.selectedMedio);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(editarMediosdeContacto, {
      width: '500px',
      // height: '350px',
      data: { codigo: this.editarMedio.codigo, descripcion: this.editarMedio.descripcion }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != undefined) {
        this.editarMedio.codigo = result.codigo;
        this.editarMedio.descripcion = result.descripcion;
        console.log(result);
        console.table(this.editarMedio);
        this.edit();
      }

    });
  }
  openDialog2(): void {
    const dialogRef = this.dialog.open(agregarMediosdeContacto, {
      width: '500px',
      // height: '350px',
      data: { codigo: this.agregarMedio.codigo, descripcion: this.agregarMedio.descripcion }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.agregarMedio.codigo = result.codigo;
      this.agregarMedio.descripcion = result.descripcion;

      this._mediosService.addMedio(this.agregarMedio).subscribe(
        response => {
          console.log(this.agregarMedio)
          console.log(response)
          if (response) {
            console.log(response)
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
    const dialogRef = this.dialog.open(eliminarMediosdeContacto, {
      width: '500px',
      height: '350px',
      data: { codigo: this.editarMedio.codigo, descripcion: this.editarMedio.descripcion }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != undefined) {
        this.editarMedio.codigo = result.codigo;
        this.editarMedio.descripcion = result.descripcion;
        console.log(result);
        console.table(this.editarMedio);
        this.delete(this.selectedMedio);
      }
    });
  }

  setMedio(id) {
    this._mediosService.getMedio(id).subscribe(
      response => {
        if (response.code == 0) {
          this.editarMedio = response;
          console.log(this.editarMedio);
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
    this._mediosService.editMedio(this.editarMedio).subscribe(
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
    this._mediosService.deleteMedio(id).subscribe(
      response => {
        if (response.code == 0) {
          this.editarMedio = response;
          console.log(this.editarMedio);
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
  selector: 'app-editarMediosdeContacto',
  templateUrl: './editarMediosdeContacto.html',
})
export class editarMediosdeContacto implements OnInit {
  public editarMedio: MediodeContacto;
  public status: string
  constructor(public dialogRef: MatDialogRef<editarMediosdeContacto>,
    @Inject(MAT_DIALOG_DATA) public data: MediodeContacto) { }
  displayedColumns: String[] = ['posicion', 'numero', 'descripcion'];
  title = 'Medios de Contacto';
  selectedValue: string = "";
  ngOnInit() {
  }
}

@Component({
  selector: 'app-agregarMediosdeContacto',
  templateUrl: './agregarMediosdeContacto.html'

})
export class agregarMediosdeContacto implements OnInit {
  public status: string
  public agregarMedio: MediodeContacto;
  constructor() {
  }
  ngOnInit() {
    this.limpiarVariables();
  }
  limpiarVariables() {
    this.agregarMedio = new MediodeContacto(0, 0, '', '', '1', true);
  }
}

@Component({
  selector: 'app-eliminarMediosdeContacto',
  templateUrl: './eliminarMediosdeContacto.html',
})
export class eliminarMediosdeContacto implements OnInit {

  public editarMedio: MediodeContacto;
  public status: string
  constructor(public dialogRef: MatDialogRef<eliminarMediosdeContacto>,
    @Inject(MAT_DIALOG_DATA) public data: MediodeContacto) { }


  ngOnInit() {
    //this.limpiarVariables();
  }
  //limpiarVariables() {
  // this.editarAlmacenadora = new Almacenadora(0, 0, '', '', '1', true);
  // } 
}