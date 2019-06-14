import { Component, OnInit,OnDestroy ,Inject,ChangeDetectorRef} from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import {MediaMatcher} from '@angular/cdk/layout';
import { MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Notarios } from 'src/app/models/notarios.model';
import {notariosService} from 'src/app/services/notarios.service';



@Component({
  selector: 'app-notarios',
  templateUrl: './notarios.component.html',
  styleUrls: ['./notarios.component.scss'],
  providers: [notariosService]
})
export class NotariosComponent implements OnInit, OnDestroy{
mobileQuery: MediaQueryList;
private _mobileQueryListener:() => void;
  public notarios: Notarios[];
  public notarioSeleccionado: number[];
  public status: string;
  public numeroPagina: number = 0;
  public numeroItems: number = 7;
  public primeraPagina: boolean;
  public ultimaPagina: boolean;
  public listarNumeroPagina: number = 0;
  public cantidadActual: number;
  public notarioModel: Notarios;
  public notarioEditable: Notarios;
  mostrar: Boolean;
  centered = false;
  disabled = false;
  unbounded = false;

  radius: number;
  color: string;
  public dataSource2;

  timeLeft: number;
  interval;
  dialog: any;

  constructor( public changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, dialog: MatDialog, private _notarioService: notariosService) {
    this.limpiarVariables();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
 
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  limpiarVariables() {
    this.notarioEditable = new Notarios('',0,0,'','','','','','1',true,'','','','',0,'',0);
    this.notarioModel = new Notarios('',0,0,'','','','','','1',true,'','','','',0,'',0);
  }


  setNotario(id) {
    if(this.notarioSeleccionado == undefined) return;
    this._notarioService.getNotarios(id).subscribe(
      response => {
        if (response.code == 0) {
          this.notarioEditable = response;
          console.log(this.notarioEditable)
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
  
startTimer() {
  this.timeLeft = 2;
    this.interval = setInterval(() => {
      if(this.timeLeft >0 && this.timeLeft < 10){
        this.mostrar = true;
        this.timeLeft--;
      }
      else if( this.timeLeft > 0) {
        this.timeLeft--;
        
      } else if (this.timeLeft == 0) {
        this.mostrar = false;
        this.openDialog();
        this.timeLeft = 10000;
      }
    },1000)
  }
  
  openDialogDelete(): void {
    const dialogRef = this.dialog.open(DialogEliminarNotario, {
      width: '500px',
      data: { codigo: this.notarioEditable.codigo, direccion: this.notarioEditable.direccion,
        nombre: this.notarioEditable.nombre, cheque: this.notarioEditable.cheque,
        colegiado: this.notarioEditable.colegiado, identificacion: this.notarioEditable.identificacion,
        telefono: this.notarioEditable.telefono, fax: this.notarioEditable.fax}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != undefined) {
        this.notarioEditable.codigo  = result.codigo;
        this.notarioEditable.direccion = result.direccion;
        this.notarioEditable.nombre = result.nombre;
        this.notarioEditable.cheque = result.cheque;
        this.notarioEditable.colegiado = result.colegiado;
        this.notarioEditable.identificacion = result.identificacion;
        this.notarioEditable.telefono = result.telefono;
        this.notarioEditable.fax = result.fax;
        console.log(result);
        console.table(this.notarioEditable);
        this.eliminar(this.notarioSeleccionado[0]);
      }
    });
  }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogNotario, {
      width: '500px',
      data: {codigo: this.notarioModel.codigo, direccion: this.notarioModel.direccion, nombre:this.notarioModel.nombre, cheque:this.notarioModel.cheque, colegiado:this.notarioModel.colegiado,
      identificacion:this.notarioModel.identificacion, telefono:this.notarioModel.telefono, fax:this.notarioModel.fax
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != undefined) {
        this.notarioModel.codigo  = result.codigo;
        this.notarioModel.direccion = result.direccion;
        this.notarioModel.nombre = result.nombre;
        this.notarioModel.cheque = result.cheque;
        this.notarioModel.colegiado = result.colegiado;
        this.notarioModel.identificacion = result.identificacion;
        this.notarioModel.telefono = result.telefono;
        this.notarioModel.fax = result.fax;
        console.log(result);
        console.table(this.notarioModel);
        this.agregar();
      }
    });
  }

  openDialogEdit(): void {
    const dialogRef = this.dialog.open(DialogActualizarNotario, {
      width: '500px',
      data: { codigo: this.notarioEditable.codigo, direccion: this.notarioEditable.direccion,
              nombre: this.notarioEditable.nombre, cheque: this.notarioEditable.cheque,
              colegiado: this.notarioEditable.colegiado, identificacion: this.notarioEditable.identificacion,
              telefono: this.notarioEditable.telefono, fax: this.notarioEditable.fax }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != undefined) {
        this.notarioEditable.codigo  = result.codigo;
        this.notarioEditable.direccion = result.direccion;
        this.notarioEditable.nombre = result.nombre;
        this.notarioEditable.cheque = result.cheque;
        this.notarioEditable.colegiado = result.colegiado;
        this.notarioEditable.identificacion = result.identificacion;
        this.notarioEditable.telefono = result.telefono;
        this.notarioEditable.fax = result.fax;
        console.log(result);
        console.table(this.notarioEditable);
        this.editar();
      }
    });
  }

  editar() {
    this._notarioService.editNotarios(this.notarioEditable).subscribe(
      response => {
        console.log(response);
        this.listarNotariosParaTabla();
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

  agregar() {
    this._notarioService.addNotarios(this.notarioModel).subscribe(
      response => {
        console.log(response)
        this.listarNotariosParaTabla();
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

  eliminar(id){
    if(this.notarioSeleccionado == undefined) return;
    this._notarioService.deleteNotarios(id).subscribe(
      response => {
        if (response.code == 0) {
          this.listarNotariosParaTabla();
          this.notarioEditable = response;
          console.log(this.notarioEditable)
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

  ngOnInit() {
    this.listarNotariosParaTabla();
    this.listarPagina();
    this.limpiarVariables();
  }

  public listarPagina(){
    this._notarioService.listPage(1,10).subscribe(
      response =>{
        this.notarioSeleccionado = response.content;
        console.table(this.notarioSeleccionado)
      },
      error =>{
        var errorMessage = <any>error;
        console.log(errorMessage)
      }
    )
  }
  
  siguientePagina(){
    if(!this.ultimaPagina){
      ++this.listarNumeroPagina;
      this.listarNotariosParaTabla()
    }
  }

  anteriorPagina(){
    if(!this.primeraPagina){
      --this.listarNumeroPagina;
      this.listarNotariosParaTabla()
    }
  }

  listarNotariosParaTabla() {
    this._notarioService.listPage(this.numeroPagina, this.numeroItems).subscribe(
      response => {
        if (response.content) {
          this.notarios = response.content;
          this.dataSource2 = new MatTableDataSource<Notarios>(this.notarios);
          console.log(this.notarios);
          this.primeraPagina = response.first;
          this.ultimaPagina = response.last;
          this.cantidadActual = response.numberOfElements;
          this.status = 'ok';
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


  displayedColumns: string[] = ['select', 'codigo', 'descripcion'];
  dataSource = new MatTableDataSource<Notarios>(this.notarios);
  selection = new SelectionModel<Notarios>(false, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  imprimir() {
    this.notarioSeleccionado = this.selection.selected.map(row => row.codigo);
    console.log(this.notarioSeleccionado[0]);
    if (this.notarioSeleccionado[0]) {
      this.setNotario(this.notarioSeleccionado[0]);
    }
    //    console.table(this.selection.selected)
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource2.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Notarios): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.codigo + 1}`;
  }

}
//----------------------------------------- COMPONENTE DEL DIALOG --------------------------------------- 



@Component({
  selector: 'app-agregarNotario',
  templateUrl: './agregarNotario.html',
  styleUrls: ['./notarios.component.scss'],
  providers: [notariosService]
})
export class DialogNotario implements OnInit {

  public notarios: Notarios[];
  public status: string;
  public numeroPagina: number = 0;
  public numeroItems: number = 5;
  public primeraPagina: boolean;
  public ultimaPagina: boolean;
  public cantidadActual: number;
  public notarioModel: Notarios;
  public notarioEditable: Notarios;
  constructor(
    public dialogRef: MatDialogRef<DialogNotario>,
    @Inject(MAT_DIALOG_DATA) public data: Notarios, private _notarioService: notariosService) {
    
  }
  displayedColumns: String[] = ['posicion', 'numero', 'descripcion'];
  ngOnInit() { 
    this.limpiarVariables();
  } 
  limpiarVariables(){
    this.notarioModel = new Notarios('',0,0,'','','','','','1',true,'','','','',0,'',0);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }  
}

@Component({
  selector: 'app-editarNotario',
  templateUrl: './editarNotario.html',
  styleUrls: ['./notarios.component.scss']
})
export class DialogActualizarNotario implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogActualizarNotario>,
    @Inject(MAT_DIALOG_DATA) public data: Notarios) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(){
   
  }
}


@Component({
  selector: 'app-eliminarNotario',
  templateUrl: 'eliminarNotario.html',
  styleUrls: ['./notarios.component.scss']
})
export class DialogEliminarNotario {

  constructor(
    public dialogRef: MatDialogRef<DialogEliminarNotario>,
    @Inject(MAT_DIALOG_DATA) public data: Notarios) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}