import {MatTableDataSource} from '@angular/material';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component,OnInit, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-acercamientos',
  templateUrl: './acercamientos.component.html',
  styleUrls: ['./acercamientos.component.scss']
})

export class AcercamientosComponent implements OnInit, OnDestroy {
  displayedColumns = ['position', 'codigo', 'descripcion'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  mobileQuery: MediaQueryList;
  showFiller = false;
  
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
  }
  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

  fillerContent = Array.from({length: 50}, () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
}

export interface PeriodicElement {
  position: number;
  codigo: number;
  descripcion: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, codigo: 1, descripcion: "Sin acercamiento"},
  {position: 2, codigo: 2, descripcion: "Sin acercamiento"},
  {position: 3, codigo: 1, descripcion: "Sin acercamiento"},
  {position: 4, codigo: 1, descripcion: "Sin acercamiento"},
  {position: 5, codigo: 1, descripcion: "Sin acercamiento"},
  {position: 6, codigo: 1, descripcion: "Sin acercamiento"}
];