import { ChangeDetectorRef, Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { SelectionModel } from '@angular/cdk/collections';
import {instanciasService} from 'src/app/services/instancia.service';
import {Instancia} from 'src/app/models/instancias.model';
import { MatTableDataSource, MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
@Component({
  selector: 'app-instancias',
  templateUrl: './instancias.component.html',
  styleUrls: ['./instancias.component.scss'],
  providers: [instanciasService]
})
export class InstanciasComponent implements OnInit,OnDestroy {

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  public instanciaGet: Instancia[];
  public agregarInstancia: Instancia;
  public editarInstancia: Instancia;
  public status: string;
  public selectedInstancia: string;
  constructor(public dialog: MatDialog, changeDetectorRef:ChangeDetectorRef, media: MediaMatcher, private _instanciasService: instanciasService) { 
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }
  ngOnDestroy(): void{

    this.mobileQuery.removeListener(this._mobileQueryListener);

   }
  ngOnInit() {
    this.listarPagina();
    this.limpiarVariables();
  }
  displayedColumns: string[] =['select','codigo','descripcion'];
  selection = new SelectionModel<Instancia>(false,[]);
  dataSource = new MatTableDataSource<Instancia>(this.instanciaGet);
  limpiarVariables(){
    this.agregarInstancia = new Instancia(0,'','','','1',true)
  }

  public listarPagina(){
    this._instanciasService.listPage(1,10).subscribe(
      response =>{
        this.instanciaGet = response.content;
        console.table(this.instanciaGet)
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
      this.instanciaGet.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Instancia): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.codigoInstancia + 1}`;
  }

  imprimir(){
    this.selectedInstancia = this.selection.selected.map(row => row.codigoInstancia)[0];
    console.log(this.selectedInstancia);
    if(this.selectedInstancia){
      this.setInstancia(this.selectedInstancia);
    }
  }


  ///ACTUALIZAR DIALOG

  openDialog(): void{
    const dialogRef = this.dialog.open(aInstancia,{
      width: '500px',
      data:{codigoInstancia: this.editarInstancia.codigoInstancia, descripcion: this.editarInstancia.descripcion}
    });

    dialogRef.afterClosed().subscribe(result =>{
      console.log('the dialog was closed');
      if(result !=undefined){
        this.editarInstancia.codigoInstancia = result.codigo;
        this.editarInstancia.descripcion = result.descripcion;
        console.log(result);
        console.table(this.editarInstancia);
        this.edit();
      }
    });
  }

   ///AGREGAR DIALOG
   openDialog2():void{
    const dialogRef = this.dialog.open(bInstancia,{
      width: '500px',
      data: {codigoInstancia: this.agregarInstancia.codigoInstancia, descripcion: this.agregarInstancia.descripcion}

    });
    dialogRef.afterClosed().subscribe(result =>{
      console.log('the dialog was closed');
      console.log(result);
      this.agregarInstancia.codigoInstancia = result.codigoInstancia;
      this.agregarInstancia.descripcion = result.descripcion;

      this._instanciasService.addInstancia(this.agregarInstancia).subscribe(
        response =>{
          console.log(this.agregarInstancia)
          console.log(response)
          if(response){
            console.log(response)
            this.status = 'ok'
          }
          
        },
        error =>{
          var errorMessage =<any>error;
          console.log(errorMessage)
        }
      )
    });
  }

  
 //ELIMINAR  Dialog
 openDialog3(): void{
  const dialogRef = this.dialog.open(eInstancia,{
    width: '500px',
    height: '350px',
    data: {codigoInstancia: this.editarInstancia.codigoInstancia, descripcion: this.editarInstancia.descripcion}

  });

  dialogRef.afterClosed().subscribe(result =>{
    console.log('the dialog was closed');
    if(result !=undefined){
      this.editarInstancia.codigoInstancia = result.codigo;
      this.editarInstancia.descripcion = result.descripcion;
      console.log(result);
      console.table(this.editarInstancia);
      this.delete(this.selectedInstancia);
    }
  });
}

setInstancia(id){
  this._instanciasService.getInstancia(id).subscribe(
    response =>{
      if(response.code ==0){
        this.editarInstancia = response;
        console.log(this.editarInstancia);
        this.status = 'ok';

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

edit(){
  this._instanciasService.editInstancia(this.editarInstancia).subscribe(
    response =>{
      console.log(response);
      this.listarPagina();
      if (response.code ==0){
        this.status = 'ok';
      }else{
        alert(response.description);
      }
    },error =>{
      let errorMessage =<any>error;
      console.log(errorMessage);
      if(errorMessage ! =null){
        alert(error.description);
        this.status = 'error';
      }
    }
  );
}


delete(id){
  if(this.instanciaGet ==undefined) return;
  this._instanciasService.deleteInstancia(id).subscribe(
    response =>{
      if(response.code == 0){
        this.editarInstancia = response;
        console.log(this.editarInstancia)
        this.status = 'ok';
      }else{
        this.status = 'error';
      }
    }, error =>{
      let errorMessage =<any> error;
      console.log(errorMessage);
      if(errorMessage !=null){
        this.status = 'error';
      }
    }
  );
}
}
@Component({
  selector: 'app-ainstancia',
  templateUrl: './ainstancia.html',
})

export class aInstancia  implements OnInit{
  public editarInstancia: Instancia;
  public status: string
  constructor(public dialogRef: MatDialogRef<aInstancia>,
    @Inject(MAT_DIALOG_DATA) public data: Instancia) { }
    displayedColumns: String[] = ['posicion', 'numero', 'descripcion'];
    title = 'Instancia';
    selectedValue: string = "";
    ngOnInit() {
    }
}


@Component({
  selector: 'app-binstancia',
  templateUrl: './binstancia.html'
})

export class bInstancia  implements OnInit{
  public status: string
  public agregarInstancia: Instancia
  constructor(){

  }
  ngOnInit(){
    this.limpiarVariables();
  }
  limpiarVariables(){
    this.agregarInstancia = new Instancia(0,'','','','1',true);
  }
}

@Component({
  selector: 'app-eInstancia',
  templateUrl:'./eInstancia.html',
})

export class eInstancia implements OnInit{

  public editarInstancia: Instancia;
  public status: string
  constructor(public dialogRef: MatDialogRef<eInstancia>,
    @Inject(MAT_DIALOG_DATA) public data: Instancia){}
    ngOnInit(){

    }
}

