import { Component, OnInit } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {PeriodicElement} from '../interfaces/periodic-element';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';
import {ChangeDetectorRef, OnDestroy} from '@angular/core';
export interface PeriodicElement {
  descripcion: string;
  codigo: number;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {codigo: 1, descripcion: 'Hydrogen'},
  {codigo: 2, descripcion: 'Helium'},
  {codigo: 3, descripcion: 'Lithium'},
  {codigo: 4, descripcion: 'Beryllium'},
  {codigo: 5, descripcion: 'Boron'},
];

@Component({
  selector: 'app-notarios',
  templateUrl: './notarios.component.html',
  styleUrls: ['./notarios.component.scss']
})
export class NotariosComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  showFiller = false;

  private _mobileQueryListener: () => void;

  
  
   fillerContent = Array.from({length: 50}, () =>
   `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
    voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);


    constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
     }
    
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit() {
  }
  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);
 
  displayedColumns: string[] = ['select', 'codigo', 'descripcion'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

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
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.codigo + 1}`;
  }
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
}

@Component({
  selector: 'app-notarios',
  templateUrl: './agregarNotario.html',

})


export class agregarDiasInhabiles implements OnInit {

  constructor() { }
  displayedColumns: String[] =['posicion',  'numero',  'descripcion'];
  title = 'Notarios';
  selectedValue: string = "";
  dataSource = ELEMENT_DATA;
  ngOnInit() {
  }
}