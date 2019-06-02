import {MatTableDataSource, MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component,OnInit, OnDestroy, Inject} from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { LugarService } from 'src/app/services/lugar.service';
import { Lugar } from 'src/app/models/lugar.model';

@Component({
  selector: 'app-lugar-de-inversion',
  templateUrl: './lugar-de-inversion.component.html',
  styleUrls: ['./lugar-de-inversion.component.scss'],
  providers: [LugarService]
})
export class LugarDeInversionComponent implements OnInit, OnDestroy{
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;  
  public lugarGet: Lugar[];
  public agregarLugar: Lugar;
  public editarLugar: Lugar;
  public status: string;
  public selectedLugar: number;

  constructor(public dialog:MatDialog,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private _lugarService : LugarService) { 
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  ngOnInit() {
  }
  displayedColumns: string[] = ['select', 'codigo', 'descripcion', 'equibalente'];
  dataSource = new MatTableDataSource<Lugar>(this.lugarGet);
  selection = new SelectionModel<Lugar>(false, []); 

  limpiarVariables() {
    this.agregarLugar = new Lugar(0, 0, '', '', '1','', true);
  }
  public listarPagina() {
    this._lugarService.listPage(0, 10).subscribe(
      response => {
        this.lugarGet = response.content;
        console.table(this.lugarGet)
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
    return numSelected === numRows; 
  }
  
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
  
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Lugar): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.codigo + 1}`; 
  }  
  imprimir() {
    this.selectedLugar = this.selection.selected.map(row => row.codigo)[0];
    console.log(this.selectedLugar);
    if(this.selectedLugar) {
      this.setLugar(this.selectedLugar);
    }
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(aLuagrInv, {
      width: '500px',
      height: '350px',
      data: { codigo:this.agregarLugar.codigo, descripcion: this.agregarLugar.descripcion, equivalencia: this.agregarLugar.equivalencia}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.agregarLugar.codigo = result.codigo; 
      this.agregarLugar.descripcion = result.descripcion;
      this.agregarLugar.equivalencia = result.equivalencia; 
    
      this._lugarService.addLugar(this.agregarLugar).subscribe(
        response => { 
          console.log(this.agregarLugar)
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
   
  setLugar(id) {
    this._lugarService.getLugar(id).subscribe(
      response => {
        if(response.code == 0) {
          this.editarLugar = response;
          console.log(this.editarLugar);
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
  openDialog2(): void {
    const dialogRef = this.dialog.open(editLugarInv, {
      width: '500px',
      // height: '350px',
      data: { codigo: this.editarLugar.codigo, descripcion: this.editarLugar.descripcion, equivalencia: this.editarLugar.equivalencia }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != undefined) {
        this.editarLugar.codigo = result.codigo;
        this.editarLugar.descripcion = result.descripcion; 
        this.editarLugar.equivalencia = result.equibalecia
        console.log(result);
        console.table(this.editarLugar);
        this.edit();
      }

    });
  }  

  openDialog3(): void {
    const dialogRef = this.dialog.open(elimLugarInv, {
      width: '500px',
      height: '350px',
      data: { codigo: this.editarLugar.codigo, descripcion: this.editarLugar.descripcion, equivalencia: this.editarLugar.equivalencia }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != undefined) {
        this.editarLugar.codigo = result.codigo;
        this.editarLugar.descripcion = result.descripcion; 
        this.editarLugar.equivalencia = result.equibalecia
        console.log(result);
        console.table(this.editarLugar);
        this.delete(this.selectedLugar);
      }
    });
  }

  edit() {
    this._lugarService.editLugar(this.editarLugar).subscribe(
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
    if(this.lugarGet == undefined) return;
      this._lugarService.deleteLugar(id).subscribe(
        response => {
          if (response.code == 0) {
            this.editarLugar= response;
            console.log(this.editarLugar)
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
  selector: 'app-lugar-de-inversion',
  templateUrl: './aLugarInv.html',
})
export class aLuagrInv implements OnInit {
  public agregarLugar: Lugar 
  public status: string
  constructor() { }
  displayedColumns: String[] =['posicion',  'numero',  'descripcion'];
  title = 'Notarios';
  selectedValue: string = "";
 
  ngOnInit() { 
    this.limpiarVariables()
  } 
  limpiarVariables() {
    this.agregarLugar= new Lugar(0, 0, '', '', '1','', true);
  }
} 

@Component({
  selector: 'app-lugar-de-inversion',
  templateUrl: './editLugarInv.html',
})
export class editLugarInv implements OnInit {
   public editarLugar: Lugar
   public status: string
  constructor(public dialogRef: MatDialogRef<editLugarInv>,
    @Inject(MAT_DIALOG_DATA) public data: Lugar

  ) { }
  displayedColumns: String[] =['posicion',  'numero',  'descripcion'];
  title = 'Lugar';
  selectedValue: string = "";
 
  ngOnInit() { 

  } 
  limpiarVariables() {
    this.editarLugar = new Lugar(0, 0, '', '', '1', '',true);
  } 
  
}

@Component({
  selector: 'app-lugar-de-inversion',
  templateUrl: './elimLugarInv.html',
})
export class elimLugarInv implements OnInit {
   public editarLugar: Lugar
   public status: string
  constructor(public dialogRef: MatDialogRef<elimLugarInv>,
    @Inject(MAT_DIALOG_DATA) public data: Lugar

  ) { }

  ngOnInit() { 

  } 
  //limpiarVariables() {
    //this.editarLugar = new Lugar(0, 0, '', '', '1', '',true);
  //} 
  
}