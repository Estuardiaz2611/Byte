import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import {} from './components/pricipal/pricipal.component';
import { MotivosDeAjustesComponent } from './components/motivos-de-ajustes/motivos-de-ajustes.component';
import { DiasInhabilesComponent, agregarDiasInhabiles } from './components/dias-inhabiles/dias-inhabiles.component';
import { CobrosAdicionalesComponent, Agregar } from './components/cobros-adicionales/cobros-adicionales.component';
import { InstitucionesCobrosAdicionalesComponent } from './components/instituciones-cobros-adicionales/instituciones-cobros-adicionales.component';
import { LimpiezaDeArchivosComponent } from './components/limpieza-de-archivos/limpieza-de-archivos.component';
import { routing, appRoutingProviders } from './app.routing';
import { ProductosComponent } from './components/productos/productos.component';

//***********************SAMUEL***************************

import { MotivoDeReversaComponent } from './components/motivo-de-reversa/motivo-de-reversa.component';
import { FormasDeDesembolsoComponent } from './components/formas-de-desembolso/formas-de-desembolso.component';
import { MotivosReferenciasClientesComponent } from './components/motivos-referencias-clientes/motivos-referencias-clientes.component';
import { RelacionTransaccionesDepositosComponent } from './components/relacion-transacciones-depositos/relacion-transacciones-depositos.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ParametrosAdicionalPorProductoComponent } from './components/parametros-adicional-por-producto/parametros-adicional-por-producto.component';
import { EventosDeSolicitudesComponent } from './components/eventos-de-solicitudes/eventos-de-solicitudes.component';
import { DocumentosAPresentarPorProductoComponent } from './components/documentos-a-presentar-por-producto/documentos-a-presentar-por-producto.component';
import { MontosPorPlazoComponent } from './components/montos-por-plazo/montos-por-plazo.component';

//----------------------- ANGULAR MATERIAL

import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';
import { PricipalComponent } from './components/pricipal/pricipal.component';
import { from } from 'rxjs';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { AgrupacionesDeCreditoComponent, agregarACredito } from './components/agrupaciones-de-credito/agrupaciones-de-credito.component';
import { AlmacenadoraComponent, aAlmacenadora } from './components/almacenadora/almacenadora.component';
import { AseguradoraComponent, aAseguradora } from './components/aseguradora/aseguradora.component';
import { AsesorDePrestamosComponent, agregarAprestamos } from './components/asesor-de-prestamos/asesor-de-prestamos.component';
import { BancosComponent } from './components/bancos/bancos.component';
import { LugarDeInversionComponent, aLuagrInv } from './components/lugar-de-inversion/lugar-de-inversion.component';
import { TipoDeDeduccionComponent, aTipoDeduc } from './components/tipo-de-deduccion/tipo-de-deduccion.component';
import { TipoDePrestamoComponent, aTipoP } from './components/tipo-de-prestamo/tipo-de-prestamo.component';


@NgModule({
  declarations: [
    AppComponent,
    MotivosDeAjustesComponent,
    DiasInhabilesComponent,
    CobrosAdicionalesComponent,
    InstitucionesCobrosAdicionalesComponent,
    Agregar,
    agregarDiasInhabiles,
    LimpiezaDeArchivosComponent,
    ProductosComponent,

    MotivoDeReversaComponent,
    FormasDeDesembolsoComponent,
    MotivosReferenciasClientesComponent,
    RelacionTransaccionesDepositosComponent,
    ParametrosAdicionalPorProductoComponent,
    EventosDeSolicitudesComponent,
    DocumentosAPresentarPorProductoComponent,
    MontosPorPlazoComponent,
    PricipalComponent,
    SidenavComponent,
    AgrupacionesDeCreditoComponent,
    agregarACredito,
    AlmacenadoraComponent, 
    aAlmacenadora,
    AseguradoraComponent,
    aAseguradora,
    AsesorDePrestamosComponent,
    agregarAprestamos,
    BancosComponent,
    LugarDeInversionComponent, 
    aLuagrInv,
    TipoDeDeduccionComponent,
    aTipoDeduc,
    TipoDePrestamoComponent, 
    aTipoP,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatCheckboxModule,
    MatTableModule,
    MatSidenavModule,
    MatToolbarModule,
    //
    //A11yModule,
    //CdkStepperModule,
    //CdkTableModule,
    //CdkTreeModule,
    //DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    //PortalModule,
    //ScrollingModule,
    //
    routing,
    LayoutModule
  ],

  exports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatCheckboxModule,
    MatTableModule,
    MatDialogModule,
  ],

  entryComponents: [
    Agregar,
    agregarDiasInhabiles,
    agregarACredito,
    aAlmacenadora,
    aAseguradora,   
    aLuagrInv,
    agregarAprestamos,
    aTipoDeduc,
    aTipoP,
  ],

  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})

export class AppModule { }
