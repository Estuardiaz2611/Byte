import { Component, OnInit,ChangeDetectorRef,OnDestroy,Inject} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {Notarios} from 'src/app/models/notarios.model';
import {notariosService} from 'src/app/services/notarios.service';
import {PeriodicElement} from '../interfaces/periodic-element';
import {MatTableDataSource,MatDialog,MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

export interface PeriodicElement {
  descripcion: string;
  codigo: number;
}

@Component({
  selector: 'app-notarios',
  templateUrl: './notarios.component.html',
  styleUrls: ['./notarios.component.scss'],
  providers: [notariosService]
})
export class NotariosComponent implements OnInit, OnDestroy {
 
mobileQuery: MediaQueryList;
private _mobileQueryListener:() => void;
public notariosGet: Notarios[];
public agregarNotarios: Notarios;
public editarNotarios: Notarios;
public status: string;
public selectedNotario: number;


constructor(public dialog: MatDialog, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private _notariosService: notariosService){
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

displayedColumns: string[] = ['select','cheque','codigo','colegiado','direccion','direccionDos','email','empresa','fax','identificacion','isr','nombre','numeroCuenta','telefono','tipoCuenta']
selection = new SelectionModel<Notarios>(false,[]);
dataSource = new MatTableDataSource<Notarios>(this.notariosGet);

limpiarVariables(){
  this.agregarNotarios = new Notarios('',0,0,'','','','','','',true,'','','','',0,'','');
}

public listarPagina(){
  this._notariosService.listPage(1,10).subscribe(
    response =>{
      this.notariosGet = response.content;
      console.table(this.notariosGet)
    },
    error =>{
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
      this.notariosGet.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Notarios): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.codigo + 1}`;
  }

 
imprimir() {
  this.selectedNotario = this.selection.selected.map(row => row.codigo)[0];
  console.log(this.selectedNotario);
  if(this.selectedNotario){
    this.setNotario(this.selectedNotario);
  }
}

openDialog(): void{///EDITAR
  const dialogRef = this.dialog.open(editarNotario,{
    width: '500px',
    data: {
      cheque: this.editarNotarios.cheque,
     codigo: this.editarNotarios.codigo,
     colegiado: this.editarNotarios.colegiado,
     direccion: this.editarNotarios.direccion,
     direccionDos: this.editarNotarios.direccionDos,
     email: this.editarNotarios.email,
     empresa: this.editarNotarios.empresa,
     fax: this.editarNotarios.fax,
    identificacion: this.editarNotarios.identificacion,
     isr: this.editarNotarios.isr,
     nombre: this.editarNotarios.nombre,
     numeroCuenta: this.editarNotarios.numeroCuenta,
     telefono: this.editarNotarios.telefono,
     tipoCuenta: this.editarNotarios.tipoCuenta
    }
  });

  dialogRef.afterClosed().subscribe(result =>{
    console.log('the dialog se cerro');
    if(result !=undefined){
      this.editarNotarios.cheque
      this.editarNotarios.codigo,
     this.editarNotarios.colegiado,
       this.editarNotarios.direccion,
       this.editarNotarios.direccionDos,
      this.editarNotarios.email,
       this.editarNotarios.empresa,
      this.editarNotarios.fax,
       this.editarNotarios.identificacion,
      this.editarNotarios.isr,
      this.editarNotarios.nombre,
      this.editarNotarios.numeroCuenta,
      this.editarNotarios.telefono,
      this.editarNotarios.tipoCuenta
      console.log(result);
      console.table(this.editarNotarios);
      this.edit();
      
    }
  });
}

openDialog2():void{///AGREGAR
  const dialogRef = this.dialog.open(agregarNotarios,{
    width: '500px',
    data: {
      cheque: this.agregarNotarios.cheque,
      codigo: this.agregarNotarios.codigo,
      colegiado: this.agregarNotarios.colegiado,
      direccion: this.agregarNotarios.direccion,
      direccionDos: this.agregarNotarios.direccionDos,
      email: this.agregarNotarios.email,
      empresa: this.agregarNotarios.empresa,
      fax: this.agregarNotarios.fax,
       identificacion: this.agregarNotarios.identificacion,
      isr: this.agregarNotarios.isr,
      nombre: this.agregarNotarios.nombre,
      numeroCuenta: this.agregarNotarios.numeroCuenta,
      telefono: this.agregarNotarios.telefono,
      tipoCuenta: this.agregarNotarios.tipoCuenta

    }
  });

    dialogRef.afterClosed().subscribe(result =>{
      console.log('the dialog se cerro');
      console.log(result);
      this.agregarNotarios.cheque
      this.agregarNotarios.codigo,
     this.agregarNotarios.colegiado,
       this.agregarNotarios.direccion,
       this.agregarNotarios.direccionDos,
      this.agregarNotarios.email,
       this.agregarNotarios.empresa,
      this.agregarNotarios.fax,
       this.agregarNotarios.identificacion,
      this.agregarNotarios.isr,
      this.agregarNotarios.nombre,
      this.agregarNotarios.numeroCuenta,
      this.agregarNotarios.telefono,
      this.agregarNotarios.tipoCuenta
      this._notariosService.addNotarios(this.agregarNotarios).subscribe(
        response =>{
          console.log(this.agregarNotarios)
          console.log(response)
          if(response){
            console.log(response)
            this.status = 'ok';
            this.listarPagina();
          }
        },
        error =>{
          var errorMessage = <any>error;
          console.log(errorMessage)

        }
      )
    });
}
  openDialog3(): void{
    const dialogRef = this.dialog.open(eliminarNotarios,{
      width: '500px',
      height: '350px',
      data: { 
        cheque: this.editarNotarios.cheque,
        codigo: this.editarNotarios.codigo,
        colegiado: this.editarNotarios.colegiado,
        direccion: this.editarNotarios.direccion,
        direccionDos: this.editarNotarios.direccionDos,
        email: this.editarNotarios.email,
        empresa: this.editarNotarios.empresa,
        fax: this.editarNotarios.fax,
         identificacion: this.editarNotarios.identificacion,
        isr: this.editarNotarios.isr,
        nombre: this.editarNotarios.nombre,
        numeroCuenta: this.editarNotarios.numeroCuenta,
        telefono: this.editarNotarios.telefono,
        tipoCuenta: this.editarNotarios.tipoCuenta
      }
    });

    dialogRef.afterClosed().subscribe(result =>{
      console.log('the dialog se cerro otra vez, que aburrido va, siempre vive cerrandose');
      if(result !=undefined){
        this.editarNotarios.cheque
        this.editarNotarios.codigo,
       this.editarNotarios.colegiado,
         this.editarNotarios.direccion,
         this.editarNotarios.direccionDos,
        this.editarNotarios.email,
         this.editarNotarios.empresa,
        this.editarNotarios.fax,
         this.editarNotarios.identificacion,
        this.editarNotarios.isr,
        this.editarNotarios.nombre,
        this.editarNotarios.numeroCuenta,
        this.editarNotarios.telefono,
        this.editarNotarios.tipoCuenta
        console.log(result);
        console.table(this.editarNotarios);
        this.delete(this.selectedNotario);
      }
    });
  }

    setNotario(id){
     this._notariosService.getNotarios(id).subscribe(
       response =>{
         if(response.code ==0){
           this.editarNotarios = response;
           console.log(this.editarNotarios);
          this.status = 'ok';
         }else{
           this.status = 'error';
         }
       }
     );
  }

  edit(){
    this._notariosService.editNotarios(this.editarNotarios).subscribe(
      response =>{
        console.log(response);
        this.listarPagina();
        if(response.code ==0){
          this.status = 'ok';
        }else{
          alert(response.description);
        }
      },error =>{
        let errorMessage = <any> error;
        console.log(errorMessage);
        if(errorMessage !=null){
          alert(error.description);
          this.status = 'error';
        }
      }
    );
  }
  delete(id){
    if(this.notariosGet == undefined) return;
    this. _notariosService.deleteNotarios(id).subscribe(
      response =>{
        if(response.code ==0){
          this.editarNotarios = response;
          console.log(this.editarNotarios);
          this.status = 'ok';
          this.listarPagina();
        }else{
          this.status = 'error';
        }
      }, error =>{
        let errorMessage =<any>error;
        console.log(errorMessage);
        if(errorMessage !=null){
          this.status = 'error';
        }
      }
    );
  }
}

@Component({
  selector: 'app-editarNotario',
  templateUrl: './editarNotario.html',
})
export class editarNotario implements OnInit{
public editarNotarios: Notarios;
public status: string;
 constructor(public dialogRef: MatDialogRef<editarNotario>,
  @Inject(MAT_DIALOG_DATA) public data: Notarios){}
  displayedColumns: String[] = ['cheque','codigo','colegiado','direccion','direccionDos','email','empresa','fax','identificacion','isr','nombre','numeroCuenta','telefono','tipoCuenta'];
  title = 'Notarios';
  selectedValue: string = "";
  ngOnInit(){

  }
}

@Component({ //Agregar

  selector: 'app-notarios',
  templateUrl: './agregarNotario.html',
  styleUrls:['./notarios.component.scss']

})

export class agregarNotarios implements OnInit {
  public status: string
  public agregarNotarios: Notarios;
  constructor(){

  }
  ngOnInit(){
    this.limpiarVariables();
  }
  limpiarVariables(){
    this.agregarNotarios = new Notarios('',0,0,'','','','','','',true,'','','','',0,'','');
  }
}


@Component({
  selector: 'app-eliminarNotarios',
  templateUrl: './eliminarNotarios.html',
})

export class eliminarNotarios implements OnInit{
  public eliminarNotarios: Notarios;
  public status: string
  constructor(public dialogRef: MatDialogRef<eliminarNotarios>,
    @Inject(MAT_DIALOG_DATA)public data: Notarios){}

    ngOnInit(){

    }
}

  