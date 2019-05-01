import {MatTableDataSource} from '@angular/material';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component,OnInit, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-medios-de-contacto',
  templateUrl: './medios-de-contacto.component.html',
  styleUrls: ['./medios-de-contacto.component.scss']
})

export class MediosDeContactoComponent implements OnInit, OnDestroy {
  displayedColumns: String[] =['posicion', 'medios',  'descripcion'];
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
  posicion: number;
  medios: number;
  descripcion: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { posicion: 1, medios: 1, descripcion: 'Gerencia General'},
  { posicion: 2, medios: 2, descripcion: 'Promociones'},
  { posicion: 3, medios: 3, descripcion: 'Iniciativa del cliente'},
  { posicion: 4, medios: 4, descripcion: 'Departamento de creditos'},
  { posicion: 5, medios: 5, descripcion: 'Jefes de Agencia'},
  { posicion: 6, medios: 6, descripcion: 'Educadores'},
  { posicion: 7, medios: 7, descripcion: 'Dirigentes'},
  { posicion: 8, medios: 8, descripcion: 'Oficiales de Credito'},
];