import { MatTableDataSource } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { CategoriaService } from 'src/app/services/categoria-sib.service';
import { CategoriaSib } from 'src/app/models/Categoria-sib.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-categoria-sib',
  templateUrl: './categoria-sib.component.html',
  styleUrls: ['./categoria-sib.component.scss'],
  providers: [CategoriaService]
})
export class CategoriaSibComponent implements OnInit, OnDestroy {

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  public categoriaGet: CategoriaSib[];
  public categorias: CategoriaSib[];
  public agregarCategoria: CategoriaSib;
  public editarCategoria: CategoriaSib;
  public status: string;
  public selectedCategoria: string;
  public numeroDePagina: number = 0;
  public lastPage: boolean;
  public firstPage: boolean;
  public elementosPorPagina;
  public cantidadDefinidaDeElementos: number = 10;

  constructor(public dialog: MatDialog, public snackBar: MatSnackBar, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private _categoriasService: CategoriaService) {
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
  selection = new SelectionModel<CategoriaSib>(false, []);
  dataSource = new MatTableDataSource<CategoriaSib>(this.categoriaGet);

  limpiarVariables() {
    this.agregarCategoria = new CategoriaSib(0, '', '', '', '1', true);
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
    this._categoriasService.listPage(this.numeroDePagina, this.cantidadDefinidaDeElementos).subscribe(
      response => {
        this.categoriaGet = response.content;
        this.categorias = this.categoriaGet;
        this.lastPage = response.last;
        this.firstPage = response.first;
        this.elementosPorPagina = response.numberOfElements;
        console.table(this.categoriaGet)
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage)
      }
    )
  }


  //applyFilter(filterValue: number) {
  //  if (filterValue) {
  //    this.categorias = this.categoriaGet.filter(categoria => categoria.codigo == filterValue);
  //  } else {
  //    this.categorias = this.categoriaGet;
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
      this.categoriaGet.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: CategoriaSib): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.codigo + 1}`;
  }

  imprimir() {
    this.selectedCategoria = this.selection.selected.map(row => row.codigo.toString())[0];
    console.log(this.selectedCategoria);
    if (this.selectedCategoria) {
      this.setEstatus(this.selectedCategoria);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(editarCategoria, {
      width: '500px',
      // height: '350px',
      data: { codigo: this.editarCategoria.codigo, descripcion: this.editarCategoria.descripcion }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != undefined) {
        this.editarCategoria.codigo = result.codigo;
        this.editarCategoria.descripcion = result.descripcion;
        console.log(result);
        console.table(this.editarCategoria);
        this.edit();
      }

    });
  }
  openDialog2(): void {
    const dialogRef = this.dialog.open(agregarCategoria, {
      width: '500px',
      // height: '350px',
      data: { codigo: this.agregarCategoria.codigo, descripcion: this.agregarCategoria.descripcion }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.agregarCategoria.codigo = result.codigo;
      this.agregarCategoria.descripcion = result.descripcion;

      this._categoriasService.addCategoria(this.agregarCategoria).subscribe(
        response => {
          console.log(this.agregarCategoria);
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
    const dialogRef = this.dialog.open(eliminarCategoria, {
      width: '500px',
      height: '350px',
      data: { codigo: this.editarCategoria.codigo, descripcion: this.editarCategoria.descripcion }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != undefined) {
        console.log(result)
        this.delete(this.selectedCategoria);
      }
    });
  }
  
  setEstatus(id) {
    this._categoriasService.getCategoria(id).subscribe(
      response => {
        if (response.code == 0) {
          this.editarCategoria = response;
          console.log(this.editarCategoria);
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
      this._categoriasService.editCategoria(this.editarCategoria).subscribe(
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
        // if (this.categoriaGet == undefined) return;
        this._categoriasService.deleteCategoria(id).subscribe(
          response => {
            if (response.code == 0) {
              this.editarCategoria = response;
              console.log(this.editarCategoria);
              this.status = 'ok';
              this.listarPagina();
              this.snackBar.open('Eliminado correctamente','',{duration: 2500});
            } else {
              this.snackBar.open(response.description, '',{duration: 2500});
              console.log(response.description)
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
  selector: 'app-editarCategoria',
  templateUrl: './editarCategoria.html',
})
export class editarCategoria implements OnInit {
  public editarCategoria: CategoriaSib;
  public status: string
  constructor(public dialogRef: MatDialogRef<editarCategoria>,
    @Inject(MAT_DIALOG_DATA) public data: CategoriaSib) { }
  displayedColumns: String[] = ['posicion', 'numero', 'descripcion'];
  title = 'Mantenimiento a Categorias';
  selectedValue: string = "";
  ngOnInit() {
  }
}

@Component({
  selector: 'app-agregarCategoria',
  templateUrl: './agregarCategoria.html'

})
export class agregarCategoria implements OnInit {
  public status: string
  public agregarCategoria: CategoriaSib;
  constructor() {
  }
  ngOnInit() {
    this.limpiarVariables();
  }
  limpiarVariables() {
    this.agregarCategoria = new CategoriaSib(0, '', '', '', '1', true);
  }
}

@Component({
  selector: 'app-eliminarCategoria',
  templateUrl: './eliminarCategoria.html',
})
export class eliminarCategoria implements OnInit {

  public editarCategoria: CategoriaSib;
  public status: string
  constructor(public dialogRef: MatDialogRef<eliminarCategoria>,
    @Inject(MAT_DIALOG_DATA) public data: CategoriaSib) { }


  ngOnInit() {
    //this.limpiarVariables();
  }
  //limpiarVariables() {
  // this.editarAlmacenadora = new Almacenadora(0, 0, '', '', '1', true);
  // } 
}