import {MatTableDataSource} from '@angular/material';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component,OnInit, OnDestroy, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Destino } from 'src/app/models/destinos.model';
import { DestinoService } from 'src/app/services/destino.service';

@Component({
  selector: 'app-destinos',
  templateUrl: './destinos.component.html',
  styleUrls: ['./destinos.component.scss'],
  providers: [DestinoService]
})

export class DestinosComponent implements OnInit {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  public destinoGet: Destino[];
  public agregardestino:  Destino;
  public editarDestino: Destino;
  public status: string;
  public selectedDestino: number;

  constructor(public dialog: MatDialog, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private _destinoService: DestinoService) {
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
  selection = new SelectionModel<Destino>(false, []); 
  dataSource = new MatTableDataSource<Destino>(this.destinoGet);

  limpiarVariables() {
    this.agregardestino = new Destino(0, 0, '', '', '1', true);
  }

  public listarPagina() {
    this._destinoService.listPage(0, 10).subscribe(
      response => {
        this.destinoGet = response.content;
        console.table(this.destinoGet)
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
      this.destinoGet.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Destino): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.codigo + 1}`;
  }
  
  imprimir() {
    this.selectedDestino = this.selection.selected.map(row => row.codigo)[0];
    console.log(this.selectedDestino);
    if(this.selectedDestino) {
      this.setCobro(this.selectedDestino);
    }
  }

  openDialog1(): void {
    const dialogRef = this.dialog.open(agregarDestinos, {
      width: '720px',
      height: '400px',
      data: { codigo: this.agregardestino.codigo, descripcion: this.agregardestino.descripcion }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.agregardestino.codigo = result.codigo;
      this.agregardestino.descripcion = result.descripcion;
      
      this._destinoService.addDestino(this.agregardestino).subscribe(
        response => { 
          console.log(this.agregardestino)
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
    const dialogRef = this.dialog.open(editarDestinos, {
      width: '720px',
      height: '400px',
      data: { codigo: this.editarDestino.codigo, descripcion: this.editarDestino.descripcion }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != undefined) {
        this.editarDestino.codigo = result.codigo;
        this.editarDestino.descripcion = result.descripcion;
        console.log(result);
        console.table(this.editarDestino);
        this.edit();
      }

    });
  }

  openDialog3(): void {
    const dialogRef = this.dialog.open(eliminarDestinos, {
      width: '500px',
      height: '250px',
      data: { codigo: this.editarDestino.codigo, descripcion: this.editarDestino.descripcion }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != undefined) {
        this.editarDestino.codigo = result.codigo;
        this.editarDestino.descripcion = result.descripcion;
        console.log(result);
        console.table(this.editarDestino);
        this.delete(this.selectedDestino);
      }
    });
  } 
  setCobro(id) {
    this._destinoService.getDestino(id).subscribe(
      response => {
        if(response.code == 0) {
          this.editarDestino = response;
          console.log(this.editarDestino);
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
    this._destinoService.editDestino(this.editarDestino).subscribe(
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
  if(this.destinoGet == undefined) return;
    this._destinoService.deleteDestino(id).subscribe(
      response => {
        if (response.code == 0) {
          this.editarDestino = response;
          console.log(this.editarDestino)
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

@Component({//AGREGAR
  selector: 'app-destinos',
  templateUrl: './agregar-destinos.html',
  styleUrls: ['./destinos.component.scss']
})

export class agregarDestinos implements OnInit {
  public status: string
  public agregardestino: Destino
  constructor(){
  }
  
  ngOnInit(){ 
    this.limpiarVariables()
  }
  limpiarVariables() {
    this.agregardestino = new Destino(0, 0, '', '', '1', true);
  }
}

@Component({//EDITAR
  selector: 'app-destinos',
  templateUrl: './editar-destinos.html',
  styleUrls: ['./destinos.component.scss']
})

export class editarDestinos implements OnInit {
  public editarDestino: Destino 
  public status: string 


  constructor(public dialogRef: MatDialogRef<editarDestinos>,
    @Inject(MAT_DIALOG_DATA) public data: Destino) { }
 
  ngOnInit() {
  }
}

@Component({ //ELIMINAR
  selector: 'app-destinos',
  templateUrl: './eliminar-destinos.html',
  styleUrls: ['./destinos.component.scss']
})
export class eliminarDestinos implements OnInit {
  public editarDestino: Destino 
  public status: string 


  constructor(public dialogRef: MatDialogRef<eliminarDestinos>,
    @Inject(MAT_DIALOG_DATA) public data: Destino) { }
 
  ngOnInit() {
  }
}