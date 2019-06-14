import {MatTableDataSource} from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component,OnInit, OnDestroy, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { CobrosAdicionalesService } from 'src/app/services/cobrosAdicionales.service';
import { CobrosAdicionales } from 'src/app/models/cobros-adicionales.model'; 
import { SelectionModel } from '@angular/cdk/collections';

@Component({ 
  selector: 'app-cobros-adicionales',
  templateUrl: './cobros-adicionales.component.html',
  styleUrls: ['./cobros-adicionales.component.scss'],
  providers: [CobrosAdicionalesService]
})
export class CobrosAdicionalesComponent implements OnInit {
  
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  public cobrosAdicionalesGet: CobrosAdicionales[];
  public cobrosAdicionales: CobrosAdicionales[];
  public agregarCobro: CobrosAdicionales;
  public editarCobro: CobrosAdicionales;
  public status: string;
  public selectedCobroA: number;
  public numeroDePagina: number = 0;
  public lastPage: boolean;
  public firstPage: boolean;
  public elementosPorPagina;
  public cantidadDefinidaDeElementos: number = 10;

  constructor(public dialog: MatDialog, public snackBar: MatSnackBar, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private _cobrosAdicionalesService: CobrosAdicionalesService) {
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
  selection = new SelectionModel<CobrosAdicionales>(false, []); 
  dataSource = new MatTableDataSource<CobrosAdicionales>(this.cobrosAdicionalesGet);

  limpiarVariables() {
    this.agregarCobro = new CobrosAdicionales(0, 0, '', '', '1', true);
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
    this._cobrosAdicionalesService.listPage(this.numeroDePagina, this.cantidadDefinidaDeElementos).subscribe(
      response => {
        this.cobrosAdicionalesGet = response.content;
        this.cobrosAdicionales = this.cobrosAdicionalesGet;
        this.lastPage = response.last;
        this.firstPage = response.first;
        this.elementosPorPagina = response.numberOfElements;
        console.table(this.cobrosAdicionalesGet)
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage)
      }
    )
  }


  applyFilter(filterValue: number) {
    if (filterValue) {
      this.cobrosAdicionales = this.cobrosAdicionalesGet.filter(cobrosAdicionale => cobrosAdicionale.codigo == filterValue);
    } else {
      this.cobrosAdicionales = this.cobrosAdicionalesGet;
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
      this.cobrosAdicionalesGet.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: CobrosAdicionales): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.codigo + 1}`;
  }
  
  imprimir() {
    this.selectedCobroA = this.selection.selected.map(row => row.codigo)[0];
    console.log(this.selectedCobroA);
    if(this.selectedCobroA) {
      this.setCobro(this.selectedCobroA);
    }
  }

  openDialog1(): void {
    const dialogRef = this.dialog.open(agregarCobrosAdicionales, {
      width: '720px',
      height: '400px',
      data: { codigo: this.agregarCobro.codigo, descripcion: this.agregarCobro.descripcion }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.agregarCobro.codigo = result.codigo;
      this.agregarCobro.descripcion = result.descripcion;
      
      this._cobrosAdicionalesService.addCobrosA(this.agregarCobro).subscribe(
        response => { 
          console.log(this.agregarCobro)
          console.log(response)
          if (response) {
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

  openDialog2(): void {
    const dialogRef = this.dialog.open(editarCobrosAdicionales, {
      width: '720px',
      height: '400px',
      data: { codigo: this.editarCobro.codigo, descripcion: this.editarCobro.descripcion }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != undefined) {
        this.editarCobro.codigo = result.codigo;
        this.editarCobro.descripcion = result.descripcion;
        console.log(result);
        console.table(this.editarCobro);
        this.edit();
      }

    });
  }

  openDialog3(): void {
    const dialogRef = this.dialog.open(eliminarCobrosAdicionales, {
      width: '500px',
      height: '250px',
      data: { codigo: this.editarCobro.codigo, descripcion: this.editarCobro.descripcion }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != undefined) {
        this.editarCobro.codigo = result.codigo;
        this.editarCobro.descripcion = result.descripcion;
        console.log(result);
        console.table(this.editarCobro);
        this.delete(this.selectedCobroA);
      }
    });
  } 
  setCobro(id) {
    this._cobrosAdicionalesService.getCobrosA(id).subscribe(
      response => {
        if(response.code == 0) {
          this.editarCobro = response;
          console.log(this.editarCobro);
          this.status='ok';
        } else {
          this.status = 'error';
        }
      }, error => {
        let errorMessage = <any>error;
        console.log(errorMessage);
        if(errorMessage != null) {
          this.status = 'error';
        }
      }
    );
  } 

  edit() {
    this._cobrosAdicionalesService.editCobrosA(this.editarCobro).subscribe(
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
  delete(id){
  if(this.cobrosAdicionalesGet == undefined) return;
    this._cobrosAdicionalesService.deleteCobrosA(id).subscribe(
      response => {
        if (response.code == 0) {
          this.editarCobro = response;
          console.log(this.editarCobro)
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

@Component({ //Agregar
  selector: 'app-agregarCobrosAdicionales',
  templateUrl: './agregarCobrosAdicionales.html',
  styleUrls:['./cobros-adicionales.component.scss']
})
export class agregarCobrosAdicionales implements OnInit {
  public status: string
  public agregarCobro: CobrosAdicionales;
  constructor() {
  }
  ngOnInit() {
    this.limpiarVariables();
  }
  limpiarVariables() {
    this.agregarCobro = new CobrosAdicionales(0, 0, '', '', '1', true);
  }
}

@Component({ //Editar
  selector: 'app-editarCobrosAdicionales',
  templateUrl: './editarCobrosAdicionales.html',
  styleUrls:['./cobros-adicionales.component.scss']
})
export class editarCobrosAdicionales implements OnInit {
  public editarCobro: CobrosAdicionales;
  public status: string
  constructor( public dialogRef: MatDialogRef<editarCobrosAdicionales>,
    @Inject(MAT_DIALOG_DATA) public data: CobrosAdicionales) { }
  displayedColumns: String[] = ['posicion', 'numero', 'descripcion'];
  title = 'Cobro Adicionales';
  selectedValue: string = "";
  ngOnInit() { 
  }
}

@Component({ //Eliminar
  selector: 'app-eliminarCobrosAdicionales',
  templateUrl: './eliminarCobrosAdicionales.html',
  styleUrls:['./cobros-adicionales.component.scss']
})
export class eliminarCobrosAdicionales implements OnInit {
  public editarCobro: CobrosAdicionales;
  public status: string
  constructor( public dialogRef: MatDialogRef<eliminarCobrosAdicionales>,
    @Inject(MAT_DIALOG_DATA) public data: CobrosAdicionales) { }
  

  ngOnInit() { 
  }
}


