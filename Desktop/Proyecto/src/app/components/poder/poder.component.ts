import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import {poderService} from 'src/app/services/poder.service';
import {Poder} from 'src/app/models/poder.model';
import { MatTableDataSource, MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { resource } from 'selenium-webdriver/http';

@Component({
  selector: 'app-poder',
  templateUrl: './poder.component.html',
  styleUrls: ['./poder.component.scss'],
  providers:[poderService]
})
export class PoderComponent implements OnInit,OnDestroy {

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  public poderGet: Poder[];
  public agregarPoder: Poder;
  public editarPoder: Poder;
  public status: string;
  public selectedPoder: number;
  constructor(public dialog: MatDialog, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private _poderService: poderService) {
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
  selection = new SelectionModel<Poder>(false,[]);
  dataSource = new MatTableDataSource<Poder>(this.poderGet);

  limpiarVariables(){
    this.agregarPoder = new Poder(0,'','1')
  }

  public listarPagina(){
    this._poderService.listPage(1,10).subscribe(
      response =>{
        this.poderGet = response.content;
        console.table(this.poderGet)
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
      this.poderGet.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Poder): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.codigo + 1}`;
  }

  imprimir(){
    this.selectedPoder = this.selection.selected.map(row => row.codigo)[0];
    console.log(this.selectedPoder);
    if(this.selectedPoder){
      this.setPoder(this.selectedPoder);
    }
  }

  ///ACTUALIZAR DIALOG

  openDialog(): void{
    const dialogRef = this.dialog.open(aPoder,{
      width: '500px',
      data:{codigo: this.editarPoder.codigo, descripcion: this.editarPoder.descripcion}
    });

    dialogRef.afterClosed().subscribe(result =>{
      console.log('the dialog was closed');
      if(result !=undefined){
        this.editarPoder.codigo = result.codigo;
        this.editarPoder.descripcion = result.descripcion;
        console.log(result);
        console.table(this.editarPoder);
        this.edit();
      }
    });
  }
  ///AGREGAR DIALOG
  openDialog2():void{
    const dialogRef = this.dialog.open(bPoder,{
      width: '500px',
      data: {codigo: this.agregarPoder.codigo, descripcion: this.agregarPoder.descripcion}

    });
    dialogRef.afterClosed().subscribe(result =>{
      console.log('the dialog was closed');
      console.log(result);
      this.agregarPoder.codigo = result.codigo;
      this.agregarPoder.descripcion = result.descripcion;

      this._poderService.addPoder(this.agregarPoder).subscribe(
        response =>{
          console.log(this.agregarPoder)
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
    const dialogRef = this.dialog.open(ePoder,{
      width: '500px',
      height: '350px',
      data: {codigo: this.editarPoder.codigo, descripcion: this.editarPoder.descripcion}

    });

    dialogRef.afterClosed().subscribe(result =>{
      console.log('the dialog was closed');
      if(result !=undefined){
        this.editarPoder.codigo = result.codigo;
        this.editarPoder.descripcion = result.descripcion;
        console.log(result);
        console.table(this.editarPoder);
        this.delete(this.selectedPoder);
      }
    });
  }

  setPoder(id){
    this._poderService.getPoder(id).subscribe(
      response =>{
        if(response.code ==0){
          this.editarPoder = response;
          console.log(this.editarPoder);
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
     this._poderService.editPoder(this.editarPoder).subscribe(
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
    if(this.poderGet ==undefined) return;
    this._poderService.deletePoder(id).subscribe(
      response =>{
        if(response.code == 0){
          this.editarPoder = response;
          console.log(this.editarPoder)
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
  selector: 'app-apoder',
  templateUrl: './apoder.html',
})
export class aPoder  implements OnInit{
  public editarPoder: Poder;
  public status: string
  constructor(public dialogRef: MatDialogRef<aPoder>,
    @Inject(MAT_DIALOG_DATA) public data: Poder) { }
    displayedColumns: String[] = ['posicion', 'numero', 'descripcion'];
    title = 'Poder';
    selectedValue: string = "";
    ngOnInit() { 
      
    }  
    
}

@Component({
  selector: 'app-bpoder',
  templateUrl: './bpoder.html'
})
export class bPoder  implements OnInit{
  public status: string
  public agregarPoder: Poder;
  constructor(){

  }
  ngOnInit(){
    this.limpiarVariables();
  }
  limpiarVariables(){
    this.agregarPoder = new Poder(0,'','1');
  }
}

@Component({
  selector: 'app-ePoder',
  templateUrl:'./ePoder.html',
})
export class ePoder implements OnInit{

  public editarPoder:  Poder;
  public status: string
  constructor(public dialogRef: MatDialogRef<ePoder>,
    @Inject(MAT_DIALOG_DATA) public data: Poder){}
    ngOnInit(){

    }
}