import { MatTableDataSource, MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { AlmacenadorasService } from 'src/app/services/almacenadoras.service';
import { Almacenadora } from 'src/app/models/almacenadoras.model';
import { inject } from '@angular/core/testing';

@Component({
  selector: 'app-almacenadora',
  templateUrl: './almacenadora.component.html',
  styleUrls: ['./almacenadora.component.scss'],
  providers: [AlmacenadorasService]
})
export class AlmacenadoraComponent implements OnInit, OnDestroy {
 
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  public almacenadoraGet: Almacenadora[];
  public agregarAlmacenadora: Almacenadora;
  public editarAlmacenadora: Almacenadora;
  public status: string;
  public selectedAlmacenadora: number;

  constructor(public dialog: MatDialog, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private _almacenadorasService: AlmacenadorasService) {
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
  selection = new SelectionModel<Almacenadora>(false, []); 
  dataSource = new MatTableDataSource<Almacenadora>(this.almacenadoraGet);

  limpiarVariables() {
    this.agregarAlmacenadora = new Almacenadora(0, 0, '', '', '1', true);
  }

  public listarPagina() {
    this._almacenadorasService.listPage(0, 10).subscribe(
      response => {
        this.almacenadoraGet = response.content;
        console.table(this.almacenadoraGet)
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
      this.almacenadoraGet.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Almacenadora): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.codigo + 1}`;
  }

  imprimir() {
    this.selectedAlmacenadora = this.selection.selected.map(row => row.codigo)[0];
    console.log(this.selectedAlmacenadora);
    if(this.selectedAlmacenadora) {
      this.setAlmacenadora(this.selectedAlmacenadora);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(aAlmacenadora, {
      width: '500px',
      // height: '350px',
      data: { codigo: this.editarAlmacenadora.codigo, descripcion: this.editarAlmacenadora.descripcion }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != undefined) {
        this.editarAlmacenadora.codigo = result.codigo;
        this.editarAlmacenadora.descripcion = result.descripcion;
        console.log(result);
        console.table(this.editarAlmacenadora);
        this.edit();
      }

    });
  }
  openDialog2(): void {
    const dialogRef = this.dialog.open(bAlmacenadora, {
      width: '500px',
      // height: '350px',
      data: { codigo: this.agregarAlmacenadora.codigo, descripcion: this.agregarAlmacenadora.descripcion }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.agregarAlmacenadora.codigo = result.codigo;
      this.agregarAlmacenadora.descripcion = result.descripcion;
      
      this._almacenadorasService.addAlmacenadora(this.agregarAlmacenadora).subscribe(
        response => { 
          console.log(this.agregarAlmacenadora)
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

  openDialog3(): void {
    const dialogRef = this.dialog.open(eAlmacenadora, {
      width: '500px',
      height: '350px',
      data: {codigo: this.editarAlmacenadora.codigo, descripcion: this.editarAlmacenadora.descripcion}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != undefined) {
        this.editarAlmacenadora.codigo = result.codigo;
        this.editarAlmacenadora.descripcion = result.descripcion;
        console.log(result);
        console.table(this.editarAlmacenadora);
        this.delete(this.selectedAlmacenadora);
      }
    });
  }

  setAlmacenadora(id) {
    this._almacenadorasService.getAlmacenadora(id).subscribe(
      response => {
        if(response.code == 0) {
          this.editarAlmacenadora = response;
          console.log(this.editarAlmacenadora);
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
    this._almacenadorasService.editAlmacenadora(this.editarAlmacenadora).subscribe(
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
  if(this.almacenadoraGet == undefined) return;
    this._almacenadorasService.deleteAlmacenadora(id).subscribe(
      response => {
        if (response.code == 0) {
          this.editarAlmacenadora = response;
          console.log(this.editarAlmacenadora)
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
 


@Component({
  selector: 'app-aalmacenadora',
  templateUrl: './aAlmacenadora.html',
})
export class aAlmacenadora implements OnInit {
  public editarAlmacenadora: Almacenadora; 
  public status: string
  constructor( public dialogRef: MatDialogRef<aAlmacenadora>,
    @Inject(MAT_DIALOG_DATA) public data: Almacenadora) { }
  displayedColumns: String[] = ['posicion', 'numero', 'descripcion'];
  title = 'Almacenadora';
  selectedValue: string = "";
  ngOnInit() { 
    
  }  

  
}

@Component({
  selector: 'app-balmacenadora',
  templateUrl: './balmacenadora.html'

})
export class bAlmacenadora implements OnInit {
  public status: string
  public agregarAlmacenadora: Almacenadora;
  constructor() {
  }
  ngOnInit() {
    this.limpiarVariables();
  }
  limpiarVariables() {
    this.agregarAlmacenadora = new Almacenadora(0, 0, '', '', '1', true);
  }
} 

@Component({
  selector: 'app-eAlmacenadora',
  templateUrl: './eAlmacenadora.html',
})
export class eAlmacenadora implements OnInit {
 
  public editarAlmacenadora: Almacenadora; 
  public status: string
  constructor( public dialogRef: MatDialogRef<eAlmacenadora>,
    @Inject(MAT_DIALOG_DATA) public data: Almacenadora) { }


  ngOnInit() {
    //this.limpiarVariables();
  }
 //limpiarVariables() {
   // this.editarAlmacenadora = new Almacenadora(0, 0, '', '', '1', true);
 // } 

  
}  