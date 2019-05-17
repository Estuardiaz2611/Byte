import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component,OnInit, OnDestroy} from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  showFiller = false;
  displayedColumns: string[] = ['name'];
  dataSource = new MatTableDataSource(VISTAS_DATA);
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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
export class NestedMenuExample {}

export interface Vistas {
  name: string;
  link: string;
}
const VISTAS_DATA: Vistas[] = [
  ///SAMUEL
  {name: 'Formas de Desembolso',                    link: 'Formas-de-desembolso'},
  {name: 'Motivos de Reversa',                      link: 'Motivo-de-reversa'},
  {name: 'Motivos de Referencias de Clientes',      link: 'Motivos-referencias-clientes'},
  {name: 'Relación de Transacciones de Depósitos',  link: 'Relacion-transacciones-depositos'},
  {name: 'Parámetros Adicional por Producto',       link: 'Parametros-Adicional-por-Producto'},
  {name: 'Eventos de Solicitudes',                  link: 'Eventos-de-solicitudes'},
  {name: 'Documentos a Presentar por Producto',     link: 'Documentos-a-Presentar-por-Producto'},
  {name: 'Motivos por Plazo',                       link: 'Montos-por-Plazo'},
  ///ALAN
  {name: 'Motivos de Ajustes',                      link: 'motivosDeAjustes'},
  {name: 'Días Inhábiles',                          link: 'diasInhabiles'},
  {name: 'Cobros Adicionales',                      link: 'cobrosAdicionales'},
  {name: 'Instituciones Cobros Adicionales',        link: 'institucionesCobrosAdicionales'},
  {name: 'Limpieza de Archivos',                    link: 'limpiezaDeArchivos'},
  {name: 'Productos',                               link: 'productos'},
  ///OVANDO
  {name: 'Acercamientos',                           link: 'Acercamientos'},
  {name: 'Asignación de Categorias',                link: 'Asignación-de-categorias'},
  {name: 'Canales de Venta',                        link: 'Canales-de-venta'},
  {name: 'Medios de Contacto',                      link: 'Medios-de-contacto'},
  {name: 'Porcentajes de Financiamiento',           link: 'Porcentajes-de-financiamiento'},
  {name: 'Rangos por Plazo',                        link: 'Rangos-de-plazos'},
  {name: 'Tipos de Producto',                       link: 'Tipo-de-producto'},
  {name: 'Tipos de Canales de Distribución',        link: 'Tipos-de-canales-de-distribución'},
  ///MUÑOZ
  {name: 'Notarios',                                link: 'notarios'},
  {name: 'Inhábiles',                               link: 'inhabiles'},
  {name: 'Adicionales',                             link: 'adicionales'},
  {name: 'Estados Prestamos',                       link: 'estadosPrestamos'},
  {name: 'SubEstados',                              link: 'subEstados'},
  {name: 'Número Prestamos',                        link: 'numeroPrestamos'},
  {name: 'Pasos Cierre',                            link: 'pasosCierre'},
  {name: 'Contabilización',                         link: 'contabilizacion'},
  ///CHINO
  {name: 'Almacenadora',                            link: 'almacenadora'},
  {name: 'Aseguradora',                             link: 'aseguradora'},
  {name: 'Agrupaciones de Crédito',                 link: 'agrupacionesDeCredito'},
  {name: 'Lugar Inversión',                         link: 'lugarInversion'},
  {name: 'Asesor de Préstamos',                     link: 'asesorPrestamos'},
  {name: 'Tipo Deducción',                          link: 'tipoDeduccion'},
  {name: 'Tipo Préstamo',                           link: 'tipoPrestamo'},
  {name: 'Bancos',                                  link: 'bancos'},
]
