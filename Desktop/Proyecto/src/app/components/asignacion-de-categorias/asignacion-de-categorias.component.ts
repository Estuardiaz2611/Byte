import {MatTableDataSource} from '@angular/material';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component,OnInit, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-asignacion-de-categorias',
  templateUrl: './asignacion-de-categorias.component.html',
  styleUrls: ['./asignacion-de-categorias.component.scss']
})

export class AsignacionDeCategoriasComponent implements OnInit, OnDestroy {
  displayedColumns: String[] =['posicion', 'usuario', 'categoria', 'descripcion'];
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
  usuario: string;
  categoria: number;
  descripcion: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { posicion: 1, usuario: "Avasquez", categoria: 1, descripcion: 'Gerente'},
  { posicion: 2, usuario: "Bytecap", categoria: 1, descripcion: 'Gerente'},
  { posicion: 3, usuario: "Bytesef", categoria: 1, descripcion: 'Gerente'},
  { posicion: 4, usuario: "Cestevez", categoria: 4, descripcion: 'Prueba'},
  { posicion: 5, usuario: "Eduarte", categoria: 1, descripcion: 'Gerente'},
  { posicion: 6, usuario: "Rchavez", categoria: 1, descripcion: 'Gerente'},
];