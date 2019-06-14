import {MatTableDataSource} from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component,OnInit, OnDestroy, Inject} from '@angular/core';
import {SelectionModel } from '@angular/cdk/collections';
import {MotivoDeAjusteService } from 'src/app/services/motivoDeAjustes.service'
import {MotivoDeAjuste } from 'src/app/models/motivosDeAjustes.model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-motivos-de-ajustes',
  templateUrl: './motivos-de-ajustes.component.html',
  styleUrls: ['./motivos-de-ajustes.component.scss'],
  providers: [MotivoDeAjusteService]
})
export class MotivosDeAjustesComponent implements OnInit, OnDestroy {
 
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  public MotivoAjusteGet: MotivoDeAjuste[];
  public MotivoAjustes: MotivoDeAjuste[];
  public agregarMotivoAjuste: MotivoDeAjuste;
  public editarMotivoAjuste: MotivoDeAjuste;
  public status: string;
  public selectedMotivoAjuste: number;
  public numeroDePagina: number = 0;
  public lastPage: boolean;
  public firstPage: boolean;
  public elementosPorPagina;
  public cantidadDefinidaDeElementos: number = 10;

  constructor(public dialog: MatDialog, public snackBar: MatSnackBar, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private _motivoDeAjusteService: MotivoDeAjusteService) {  
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

  displayedColumns: string[] = ['select', 'codigo', 'descripcion', 'afectaSaldoCapital', 'afectaSaldoInterez', 'afectaSaldoMora'];
  selection = new SelectionModel<MotivoDeAjuste>(true, []);
  dataSource = new MatTableDataSource<MotivoDeAjuste>(this.MotivoAjusteGet);
  
  limpiarVariables(){
    this.agregarMotivoAjuste = new MotivoDeAjuste('', '', '', 0, 0, '', '','','','1', true);
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
    this._motivoDeAjusteService.listPage(this.numeroDePagina, this.cantidadDefinidaDeElementos).subscribe(
      response => {
        this.MotivoAjusteGet = response.content;
        this.MotivoAjustes = this.MotivoAjusteGet;
        this.lastPage = response.last;
        this.firstPage = response.first;
        this.elementosPorPagina = response.numberOfElements;
        console.table(this.MotivoAjusteGet)
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage)
      }
    )
  }


  applyFilter(filterValue: number) {
    if (filterValue) {
      this.MotivoAjustes = this.MotivoAjusteGet.filter(motivoajuste => motivoajuste.codigo == filterValue);
    } else {
      this.MotivoAjustes = this.MotivoAjusteGet;
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
          this.dataSource.data.forEach(row => this.selection.select(row));
    }
    
    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: MotivoDeAjuste): string {
      if (!row) {
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.codigo + 1}`;
    } 

    imprimir(){
      this.selectedMotivoAjuste = this.selection.selected.map(row => row.codigo)[0];
      console.log(this.selectedMotivoAjuste);
      if (this.selectedMotivoAjuste){
        this.setMotivoAjuste(this.selectedMotivoAjuste)
      }
    }

openDialog(): void { ///editar
  const dialogRef = this.dialog.open(editarMotivosDeAjustes, {
    width: '720px',
    height: '455px',
    data: {codigo: this.editarMotivoAjuste.codigo, 
      descripcion: this.editarMotivoAjuste.descripcion,
      afectaSaldoCapita: this.editarMotivoAjuste.afectaSaldoCapital,
      afectaSaldoInterez: this.editarMotivoAjuste.afectaSaldoInterez,
      afectaSaldoMora: this.editarMotivoAjuste.afectaSaldoMora}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    if(result != undefined){
      this.editarMotivoAjuste.codigo = result.codigo;
      this.editarMotivoAjuste.descripcion = result.descripcion;
      this.editarMotivoAjuste.afectaSaldoCapital = result.afectaSaldoCapita;
      this.editarMotivoAjuste.afectaSaldoInterez = result.afectaSaldoInterez;
      this.editarMotivoAjuste.afectaSaldoMora = result.afectaSaldMora;
      console.log(result);
      console.table(this.editarMotivoAjuste);
      this.edit();  
    }
  });
}

openDialog2(): void { ///agregar
  const dialogRef = this.dialog.open(agregarMotivosDeAjustes, {
    width: '720px',
    height: '455px',
    data: {codigo: this.agregarMotivoAjuste.codigo, 
      descripcion: this.agregarMotivoAjuste.descripcion,
      afectaSaldoCapital: this.agregarMotivoAjuste.afectaSaldoCapital,
      afectaSaldoInterez: this.agregarMotivoAjuste.afectaSaldoInterez,
      afectaSaldoMora: this.agregarMotivoAjuste.afectaSaldoMora}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    console.log(result);

    this.agregarMotivoAjuste.codigo = result.codigo;
    this.agregarMotivoAjuste.descripcion = result.descripcion;
    this.agregarMotivoAjuste.afectaSaldoCapital = result.afectaSaldoCapita;
    this.agregarMotivoAjuste.afectaSaldoInterez = result.afectaSaldoInterez;
    this.agregarMotivoAjuste.afectaSaldoMora = result.afectaSaldMora;
    
    this._motivoDeAjusteService.addMotivoAjuste(this.agregarMotivoAjuste).subscribe(
      response =>{
        console.log(this.agregarMotivoAjuste)
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
      error =>{
        var errorMassage = <any>error;
        console.log(errorMassage)
      }
    )
  });
}

openDialog3(): void { ///ELIMINAR
  const dialogRef = this.dialog.open(eliminarMotivosDeAjustes, {
    width: '500px',
    height: '250px',
    data: {codigo: this.editarMotivoAjuste.codigo, 
      descripcion: this.editarMotivoAjuste.descripcion,
      afectaSaldoCapital: this.editarMotivoAjuste.afectaSaldoCapital,
      afectaSaldoInterez: this.editarMotivoAjuste.afectaSaldoInterez,
      afectaSaldoMora: this.editarMotivoAjuste.afectaSaldoMora}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    if (result != undefined){
      this.editarMotivoAjuste.codigo = result.codigo;
      this.editarMotivoAjuste.descripcion = result.descripcion;
      this.editarMotivoAjuste.afectaSaldoCapital = result.afectaSaldoCapital;
      this.editarMotivoAjuste.afectaSaldoInterez = result.afectaSaldoInterez;
      this.editarMotivoAjuste.afectaSaldoMora = result.afectaSaldMora;
      console.log(result);
      console.table(this.editarMotivoAjuste);
      this.delete(this.selectedMotivoAjuste);
    }
  });
}

setMotivoAjuste(id){
  this._motivoDeAjusteService.getMotivoAjuste(id).subscribe(
    response => {
      if (response.code == 0) {
        this.editarMotivoAjuste = response;
        console.log(this.editarMotivoAjuste);
        this.status = 'ok';
      } else {
        this.status = 'error';
      }
    },
    error => {
      let errorMassage = <any>error;
      console.log(errorMassage);
      if (errorMassage != null) {
        this.status = 'error';
      }  
    }
  );
}

edit() {
  this._motivoDeAjusteService.editMotivoAjuste(this.editarMotivoAjuste).subscribe(
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
  this._motivoDeAjusteService.deleteMotivoAjuste(id).subscribe(
    response => {
      if (response.code == 0) {
        this.editarMotivoAjuste = response;
        console.log(this.editarMotivoAjuste);
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

@Component({ ///EDITAR
  selector: 'app-editarMotivosDeAjustes',
  templateUrl: './editarMotivosDeAjustes.html',
  styleUrls: ['./motivos-de-ajustes.component.scss']
})
export class editarMotivosDeAjustes implements OnInit {
 public editarMotivoAjuste: MotivoDeAjuste;
 public status: string
  
  constructor(public dialogRef: MatDialogRef<editarMotivosDeAjustes>,
    @Inject(MAT_DIALOG_DATA) public data: MotivoDeAjuste) { }
  displayedColumns: String[] = ['codigo', 'descripcion', 'afectaSaldoCapital', 'afectaSaldoInterez', 'afectaSaldoMora'];
  title = 'Motivos de Ajustes';
  selectedValue: string = "";
  ngOnInit() {
  }
}

@Component({ ///AGREGAR
  selector: 'app-agregarMotivosDeAjustes',
  templateUrl: './agregarMotivosDeAjustes.html',
  styleUrls: ['./motivos-de-ajustes.component.scss']
})
export class agregarMotivosDeAjustes implements OnInit {
  public status: string
  public agregarMotivoAjustes: MotivoDeAjuste;
  constructor() { 
  }
  ngOnInit() {
    this.limpiarVariables();
  }
  limpiarVariables(){
    this.agregarMotivoAjustes = new MotivoDeAjuste('', '', '', 0, 0, '', '','','','1', true);
  }
}

@Component({ ///ELIMINAR
  selector: 'app-eliminarMotivosDeAjustes',
  templateUrl: './eliminarMotivosDeAjustes.html',
  styleUrls: ['./motivos-de-ajustes.component.scss']
})
export class eliminarMotivosDeAjustes implements OnInit {
  public editarMotivoAjuste: MotivoDeAjuste;
  public status: string
  constructor(public dialogRef: MatDialogRef<eliminarMotivosDeAjustes>,
    @Inject(MAT_DIALOG_DATA) public data: MotivoDeAjuste) { }
  ngOnInit() {
  }
}