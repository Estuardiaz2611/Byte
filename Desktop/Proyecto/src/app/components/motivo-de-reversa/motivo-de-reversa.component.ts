import { MatTableDataSource } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MotivoDeReversa } from 'src/app/models/motivo-de-reversa.model';
import { MotivoDeReversaService } from 'src/app/services/motivo-de-reversa.service';


@Component({
  selector: 'app-motivo-de-reversa',
  templateUrl: './motivo-de-reversa.component.html',
  styleUrls: ['./motivo-de-reversa.component.scss'],
  providers: [MotivoDeReversaService]
})
export class MotivoDeReversaComponent implements OnInit, OnDestroy  {

  //checkbox
  checked = false;
  public CheckCobroAdicional: string;
  //

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  public motivoDeReversaGet: MotivoDeReversa[];
  public motivoDeReversas: MotivoDeReversa[];
  public agregarMotivoDeReversa: MotivoDeReversa;
  public editarMotivo: MotivoDeReversa;
  public status: string;
  public selectedMotivoDeReversa: number;
  public numeroDePagina: number = 0;
  public lastPage: boolean;
  public firstPage: boolean;
  public elementosPorPagina;
  public cantidadDefinidaDeElementos: number = 10;
 
  constructor(public dialog: MatDialog, public snackBar: MatSnackBar, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private _motivoDeReversaService: MotivoDeReversaService) {  
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
  selection = new SelectionModel<MotivoDeReversa>(false, []);
  dataSource = new MatTableDataSource<MotivoDeReversa>(this.motivoDeReversaGet);

  limpiarVariables() {
    this.agregarMotivoDeReversa = new MotivoDeReversa('', 0, 0, '', '', '1', true, 0, '','','','')
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
    this._motivoDeReversaService.listPage(this.numeroDePagina, this.cantidadDefinidaDeElementos).subscribe(
      response => {
        this.motivoDeReversaGet = response.content;
        this.motivoDeReversas = this.motivoDeReversaGet;
        this.lastPage = response.last;
        this.firstPage = response.first;
        this.elementosPorPagina = response.numberOfElements;
        console.table(this.motivoDeReversaGet)
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage)
      }
    )
  }


  applyFilter(filterValue: number) {
    if (filterValue) {
      this.motivoDeReversas = this.motivoDeReversaGet.filter(motivoDeReversa => motivoDeReversa.codigo == filterValue);
    } else {
      this.motivoDeReversas = this.motivoDeReversaGet;
    }
    // console.log("sip")
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
          this.motivoDeReversaGet.forEach(row => this.selection.select(row));
    }
    
    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: MotivoDeReversa): string {
      if (!row) {
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.codigo + 1}`;
    } 

  imprimir() {
    this.selectedMotivoDeReversa = this.selection.selected.map(row => row.codigo)[0];
    console.log(this.selectedMotivoDeReversa);
    if(this.selectedMotivoDeReversa) {
      this.setMotivoDeReversa(this.selectedMotivoDeReversa);
    }
  }

  openDialog1(): void { ///AGREGAR
    const dialogRef = this.dialog.open(agregarMotivoDeReversa, {
      width: '645px',
      height: '555px',
      data: {cobroAdicional: this.agregarMotivoDeReversa.cobroAdicional,
             codigo: this.agregarMotivoDeReversa.codigo,
             descripcion: this.agregarMotivoDeReversa.descripcion,
             institucion: this.agregarMotivoDeReversa.institucion,
             referencia1: this.agregarMotivoDeReversa.referencia1,
             referencia2: this.agregarMotivoDeReversa.referencia2,
             referencia3: this.agregarMotivoDeReversa.referencia3,
             tipoRetencion: this.agregarMotivoDeReversa.tipoRetencion}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
            //check
            if(result.cobroAdicional == true) {
              result.CheckCobroAdicional = 'S'
            }
      
            if(result.CheckCobroAdicional == false){
              result.CheckCobroAdicional = 'N'
            }
            //
      this.agregarMotivoDeReversa.cobroAdicional = result.CheckCobroAdicional; ///CHECKBOX
      this.agregarMotivoDeReversa.codigo = result.codigo;
      this.agregarMotivoDeReversa.descripcion = result.descripcion;
      this.agregarMotivoDeReversa.institucion = result.institucion;
      this.agregarMotivoDeReversa.referencia1 = result.referencia1;
      this.agregarMotivoDeReversa.referencia2 = result.referencia2;
      this.agregarMotivoDeReversa.referencia3 = result.referencia3;
      this.agregarMotivoDeReversa.tipoRetencion = result.tipoRetencion;

    
      this._motivoDeReversaService.addMotivo(this.agregarMotivoDeReversa).subscribe(
        response => {
          console.log(this.agregarMotivoDeReversa)
          console.log(response)
          if(response) {
            this.snackBar.open('Agregado correctamente','',{duration: 2500});
            console.log(response)
            this.status = 'ok'
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

  openDialog2(): void { ///EDITAR
    const dialogRef = this.dialog.open(editarMotivoDeReversa, {
      width: '350px',
      height: '200px',
      data: {cobroAdicional: this.editarMotivo.cobroAdicional,
             codigo: this.editarMotivo.codigo,
             descripcion: this.editarMotivo.descripcion,
             institucion: this.editarMotivo.institucion,
             referencia1: this.editarMotivo.referencia1,
             referencia2: this.editarMotivo.referencia2,
             referencia3: this.editarMotivo.referencia3,
             tipoRetencion: this.editarMotivo.tipoRetencion}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result != undefined){        
      this.editarMotivo.cobroAdicional = result.CheckCobroAdicional;
      this.editarMotivo.codigo = result.codigo;
      this.editarMotivo.descripcion = result.descripcion;
      this.editarMotivo.institucion = result.institucion;
      this.editarMotivo.referencia1 = result.referencia1;
      this.editarMotivo.referencia2 = result.referencia2;
      this.editarMotivo.referencia3 = result.referencia3;
      this.editarMotivo.tipoRetencion = result.tipoRetencion;
      console.log(result);
      console.table(this.editarMotivo);
      this.edit();
    }
    });
  }

  openDialog3(): void { ///ELIMINAR
    const dialogRef = this.dialog.open(eliminarMotivoDeReversa, {
      width: '645px',
      height: '535px',
      data: {cobroAdicional: this.editarMotivo.cobroAdicional,
             codigo: this.editarMotivo.codigo,
             descripcion: this.editarMotivo.descripcion,
             institucion: this.editarMotivo.institucion,
             referencia1: this.editarMotivo.referencia1,
             referencia2: this.editarMotivo.referencia2,
             referencia3: this.editarMotivo.referencia3,
             tipoRetencion: this.editarMotivo.tipoRetencion}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result != undefined){
        this.editarMotivo.cobroAdicional = result.CheckCobroAdicional;
        this.editarMotivo.codigo = result.codigo;
        this.editarMotivo.descripcion = result.descripcion;
        this.editarMotivo.institucion = result.institucion;
        this.editarMotivo.referencia1 = result.referencia1;
        this.editarMotivo.referencia2 = result.referencia2;
        this.editarMotivo.referencia3 = result.referencia3;
        this.editarMotivo.tipoRetencion = result.tipoRetencion;
        console.log(result);
        console.table(this.editarMotivo);
        this.delete(this.selectedMotivoDeReversa);
      }
    });
  }

  setMotivoDeReversa(id){
    this._motivoDeReversaService.getMotivo(id).subscribe(
      response => {
        if(response.code == 0) {
          this.editarMotivo = response;
          console.log(this.editarMotivo);
          this.status = 'ok';
        } else {
          this.status = 'error'
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
    this._motivoDeReversaService.editMotivo(this.editarMotivo).subscribe(
      response => {
        console.log(response);
        this.listarPagina();
        if(response.code == 0){
          this.snackBar.open('Actualizado correctamente','',{duration: 2500});
          this.status = 'ok';
        } else {
          this.snackBar.open(response.description, '',{duration: 2500});
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
    )
  }

  delete(id){
    this._motivoDeReversaService.deleteMotivo(id).subscribe(
      response => {
        if(response.code == 0) {
          this.editarMotivo = response;
          console.log(this.editarMotivo)
          this.status = 'ok'
          this.listarPagina();
          this.snackBar.open('Eliminado correctamente','',{duration: 2500});
        } else {
          this.snackBar.open(response.description, '',{duration: 2500});
          this.status = 'error';
        }
      }, error => {
        let errorMessage = <any>error;
        console.log(errorMessage);
        if(errorMessage != null){
          this.status = 'error';
        }
      }
    )
  }

}

@Component({ ///AGREGAR
  selector: 'app-motivo-de-reversa',
  templateUrl: './agregarMotivoDeReversa.html',
  styleUrls: ['./motivo-de-reversa.component.scss']
})
export class agregarMotivoDeReversa implements OnInit {
  public agregarMotivoDeReversa: MotivoDeReversa;
  public status: string;

  constructor() { }

  ngOnInit() {
    this.limpiarVariables();
  }
  limpiarVariables() {
    this.agregarMotivoDeReversa = new MotivoDeReversa('', 0, 0, '', '', '1', true, 0, '','','','')
  }
}

@Component({ ///EDITAR
  selector: 'app-motivo-de-reversa',
  templateUrl: './editarMotivoDeReversa.html',
  styleUrls: ['./motivo-de-reversa.component.scss']
})
export class editarMotivoDeReversa implements OnInit {
  public editarMotivo: MotivoDeReversa;
  public status: string;

  constructor(public dialogRef: MatDialogRef<editarMotivoDeReversa>,
    @Inject(MAT_DIALOG_DATA) public data: MotivoDeReversa) { }
    displayedColumns: string[] = ['select', 'codigo', 'descripcion'];
    title = 'Motivos de Reversa';
    selectedValue: string = "";
  ngOnInit() {
  }
}

@Component({ ///ELIMINAR
  selector: 'app-motivo-de-reversa',
  templateUrl: './eliminarMotivoDeReversa.html',
  styleUrls: ['./motivo-de-reversa.component.scss']
})
export class eliminarMotivoDeReversa implements OnInit {
  public editarMotivo: MotivoDeReversa;
  public status: string;

  constructor( public dialogRef: MatDialogRef<eliminarMotivoDeReversa>,
    @Inject(MAT_DIALOG_DATA) public data: MotivoDeReversa) { }

  ngOnInit() {
  }
}