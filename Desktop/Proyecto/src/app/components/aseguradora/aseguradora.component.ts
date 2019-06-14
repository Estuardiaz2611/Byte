import {MatTableDataSource, MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component,OnInit, OnDestroy, Inject} from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { AseguradoraService } from 'src/app/services/aseguradora.service';
import { Aseguradora } from 'src/app/models/aseguradoras.model';

@Component({
  selector: 'app-aseguradora',
  templateUrl: './aseguradora.component.html',
  styleUrls: ['./aseguradora.component.scss'],
  providers: [AseguradoraService]
})

export class AseguradoraComponent implements OnInit, OnDestroy { 

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void; 
  public aseguradoraGet: Aseguradora[];
  public aseguradoras: Aseguradora[]; 
  public agregarAseguradora: Aseguradora;
  public editarAseguradora: Aseguradora; 
  public status: string;
  public selectedAseguradora: number;
  public numeroDePagina: number = 0;
  public lastPage: boolean;
  public firstPage: boolean;
  public elementosPorPagina;
  public cantidadDefinidaDeElementos: number = 10;

  constructor(public dialog: MatDialog, public snackBar: MatSnackBar, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private _aseguradoraService: AseguradoraService) { 
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  ngOnInit() { 
    this.listarPagina() 
    this.limpiarVariables()
  }
  displayedColumns: string[] = ['select', 'codigo', 'descripcion'];
  dataSource = new MatTableDataSource<Aseguradora>(this.aseguradoraGet);
  selection = new SelectionModel<Aseguradora>(false, []);
  
  limpiarVariables() {
    this.agregarAseguradora = new Aseguradora(0, 0, '', '', '1', true);
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
    this._aseguradoraService.listPage(this.numeroDePagina, this.cantidadDefinidaDeElementos).subscribe(
      response => {
        this.aseguradoraGet = response.content;
        this.aseguradoras = this.aseguradoraGet;
        this.lastPage = response.last;
        this.firstPage = response.first;
        this.elementosPorPagina = response.numberOfElements;
        console.table(this.aseguradoraGet)
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage)
      }
    )
  }

  applyFilter(filterValue: number) {
    if (filterValue) {
      this.aseguradoras = this.aseguradoraGet.filter(aseguradora => aseguradora.codigo == filterValue);
    } else {
      this.aseguradoras = this.aseguradoraGet;
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
        this.aseguradoraGet.forEach(row => this.selection.select(row));
  }
  
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Aseguradora): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.codigo + 1}`;
  } 
  imprimir() {
    this.selectedAseguradora = this.selection.selected.map(row => row.codigo)[0];
    console.log(this.selectedAseguradora);
    if(this.selectedAseguradora) {
      this.setAseguradora(this.selectedAseguradora);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(editAseguradora, {
      width: '500px',
      // height: '350px',
      data: { codigo: this.editarAseguradora.codigo, descripcion: this.editarAseguradora.descripcion }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != undefined) {
        this.editarAseguradora.codigo = result.codigo;
        this.editarAseguradora.descripcion = result.descripcion;
        console.log(result);
        console.table(this.editarAseguradora);
        this.edit();
      }

    });
  }

  openDialog2(): void {
    const dialogRef = this.dialog.open(aAseguradora, {
      width: '500px',
      height: '350px',
      data: { codigo:this.agregarAseguradora.codigo, descripcion: this.agregarAseguradora.descripcion,}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.agregarAseguradora.codigo = result.codigo; 
      this.agregarAseguradora.descripcion = result.descripcion; 

      this._aseguradoraService.addAseguradora(this.agregarAseguradora).subscribe(
        response => { 
          console.log(this.agregarAseguradora)
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
 
  openDialog3(): void {
    const dialogRef = this.dialog.open(elimAseguradora, {
      width: '500px',
      height: '350px',
      data: {codigo: this.editarAseguradora.codigo, descripcion: this.editarAseguradora.descripcion}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != undefined) {
        this.editarAseguradora.codigo = result.codigo;
        this.editarAseguradora.descripcion = result.descripcion;
        console.log(result);
        console.table(this.editarAseguradora);
        this.delete(this.selectedAseguradora);
      }
    });
  }
   
  setAseguradora(id) {
    this._aseguradoraService.getAseguradora(id).subscribe(
      response => {
        if(response.code == 0) {
          this.editarAseguradora = response;
          console.log(this.editarAseguradora);
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
    this._aseguradoraService.editAseguradora(this.editarAseguradora).subscribe(
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
    if(this.aseguradoraGet == undefined) return;
      this._aseguradoraService.deleteAseguradora(id).subscribe(
        response => {
          if (response.code == 0) {
            this.editarAseguradora = response;
            console.log(this.editarAseguradora)
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
  selector: 'app-aseguradora',
  templateUrl: './aAseguradora.html',
  styleUrls: ['./aseguradora.component.scss'],
})
export class aAseguradora implements OnInit {
  public status: string;
  public agregarAseguradora: Aseguradora;
  constructor() { }
  displayedColumns: String[] =['posicion',  'numero',  'descripcion'];
  title = 'Aseguradora';
  selectedValue: string = "";
 
  ngOnInit() {
    this.limpiarVariables();
  }
  limpiarVariables() {
    this.agregarAseguradora = new Aseguradora(0, 0, '', '', '1', true);
  }
}

@Component({
  selector: 'app-aseguradora',
  templateUrl: './editAseguradora.html',
  styleUrls: ['./aseguradora.component.scss'],
})
export class editAseguradora implements OnInit {
public editarAseguradora: Aseguradora;
public status: string;
  constructor( public dialogRef: MatDialogRef<editAseguradora>,
    @Inject(MAT_DIALOG_DATA) public data: Aseguradora) { }
  displayedColumns: String[] =['posicion',  'numero',  'descripcion'];
  title = 'Aseguradora';
  selectedValue: string = "";
 
  ngOnInit() {
  }
} 
@Component({
  selector: 'app-aseguradora',
  templateUrl: './elimAseguradora.html',
  styleUrls: ['./aseguradora.component.scss'],
})
export class elimAseguradora implements OnInit {
public editarAseguradora: Aseguradora;
public status: string;
  constructor( public dialogRef: MatDialogRef<editAseguradora>,
    @Inject(MAT_DIALOG_DATA) public data: Aseguradora) { }
  ngOnInit() { 
  }

}