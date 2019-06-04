import {MatTableDataSource} from '@angular/material';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component,OnInit, OnDestroy, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { InstitucionesCobrosAdicionalesService } from 'src/app/services/InstitucionesCobrosAdicionales';
import {InstitucionesCobrosAdicionales } from 'src/app/models/instituciones-cobros-Adicionales.model'; 
import { SelectionModel } from '@angular/cdk/collections';

@Component({ 
  selector: 'app-instituciones-cobros-adicionales',
  templateUrl: './instituciones-cobros-adicionales.component.html',
  styleUrls: ['./instituciones-cobros-adicionales.component.scss'],
  providers: [InstitucionesCobrosAdicionalesService]
})
export class  InstitucionesCobrosAdicionalesComponent implements OnInit {
  
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  public iCobrosAdicionalesGet: InstitucionesCobrosAdicionales[];
  public agregarICobro: InstitucionesCobrosAdicionales;
  public editarICobro: InstitucionesCobrosAdicionales;
  public status: string;
  public selectedCobroA: number;

  constructor(public dialog: MatDialog, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private _InsitucionescobrosAdicionalesService: InstitucionesCobrosAdicionalesService) {
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
  selection = new SelectionModel<InstitucionesCobrosAdicionales>(false, []); 
  dataSource = new MatTableDataSource<InstitucionesCobrosAdicionales>(this.iCobrosAdicionalesGet);

  limpiarVariables() {
    this.agregarICobro = new InstitucionesCobrosAdicionales(0, 0, '', '', '1', true);
  }

  public listarPagina() {
    this._InsitucionescobrosAdicionalesService.listPage(0, 10).subscribe(
      response => {
        this.iCobrosAdicionalesGet = response.content;
        console.table(this.iCobrosAdicionalesGet)
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
      this.iCobrosAdicionalesGet.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: InstitucionesCobrosAdicionales): string {
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
    const dialogRef = this.dialog.open(agregarICobrosAdicionales, {
      width: '720px',
      height: '400px',
      data: { codigo: this.agregarICobro.codigo, descripcion: this.agregarICobro.descripcion }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.agregarICobro.codigo = result.codigo;
      this.agregarICobro.descripcion = result.descripcion;
      
      this._InsitucionescobrosAdicionalesService.addICobrosA(this.agregarICobro).subscribe(
        response => { 
          console.log(this.agregarICobro)
          console.log(response)
          if (response) {
            console.log(response)
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

  openDialog2(): void {
    const dialogRef = this.dialog.open(editarICobrosAdicionales, {
      width: '720px',
      height: '400px',
      data: { codigo: this.editarICobro.codigo, descripcion: this.editarICobro.descripcion }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != undefined) {
        this.editarICobro.codigo = result.codigo;
        this.editarICobro.descripcion = result.descripcion;
        console.log(result);
        console.table(this.editarICobro);
        this.edit();
      }

    });
  }

  openDialog3(): void {
    const dialogRef = this.dialog.open(eliminarICobrosAdicionales, {
      width: '500px',
      height: '250px',
      data: { codigo: this.editarICobro.codigo, descripcion: this.editarICobro.descripcion }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != undefined) {
        this.editarICobro.codigo = result.codigo;
        this.editarICobro.descripcion = result.descripcion;
        console.log(result);
        console.table(this.editarICobro);
        this.delete(this.selectedCobroA);
      }
    });
  } 
  setCobro(id) {
    this._InsitucionescobrosAdicionalesService.getICobrosA(id).subscribe(
      response => {
        if(response.code == 0) {
          this.editarICobro = response;
          console.log(this.editarICobro);
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
    this._InsitucionescobrosAdicionalesService.editICobrosA(this.editarICobro).subscribe(
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
  delete(id){
  if(this.iCobrosAdicionalesGet == undefined) return;
    this._InsitucionescobrosAdicionalesService.deleteICobrosA(id).subscribe(
      response => {
        if (response.code == 0) {
          this.editarICobro = response;
          console.log(this.editarICobro)
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

}

@Component({ //Agregar
  selector: 'app-instituciones-cobros-adicionales',
  templateUrl: './agregarICobrosAdicionales.html',
  styleUrls: ['./instituciones-cobros-adicionales.component.scss'],
})
export class agregarICobrosAdicionales implements OnInit {
  public status: string
  public agregarICobro: InstitucionesCobrosAdicionales;
  constructor() {
  }
  ngOnInit() {
    this.limpiarVariables();
  }
  limpiarVariables() {
    this.agregarICobro = new InstitucionesCobrosAdicionales(0, 0, '', '', '1', true);
  }
}

@Component({ //Editar
  selector: 'app-instituciones-cobros-adicionales',
  templateUrl: './editarICobrosAdicionales.html',
  styleUrls: ['./instituciones-cobros-adicionales.component.scss']
})
export class editarICobrosAdicionales implements OnInit {
  public editarCobro: InstitucionesCobrosAdicionales;
  public status: string
  constructor( public dialogRef: MatDialogRef<editarICobrosAdicionales>,
    @Inject(MAT_DIALOG_DATA) public data: InstitucionesCobrosAdicionales) { }
  displayedColumns: String[] = ['posicion', 'numero', 'descripcion'];
  title = 'Cobro Adicionales';
  selectedValue: string = "";
  ngOnInit() { 
  }
}

@Component({ //Eliminar
  selector: 'app-instituciones-cobros-adicionales',
  templateUrl: './eliminarICobrosAdicionales.html',
  styleUrls: ['./instituciones-cobros-adicionales.component.scss']
})
export class eliminarICobrosAdicionales implements OnInit {
  public editarICobro: InstitucionesCobrosAdicionales;
  public status: string
  constructor( public dialogRef: MatDialogRef<eliminarICobrosAdicionales>,
    @Inject(MAT_DIALOG_DATA) public data: InstitucionesCobrosAdicionales) { }
  

  ngOnInit() { 
  }
}