import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import {} from './components/pricipal/pricipal.component';

import { MotivosDeAjustesComponent, agregarMotivosDeAjustes, editarMotivosDeAjustes, eliminarMotivosDeAjustes } from './components/motivos-de-ajustes/motivos-de-ajustes.component';
import { DiasInhabilesComponent, agregarDiasInhabiles, editarDiasInhabiles, eliminarDiasInhabiles } from './components/dias-inhabiles/dias-inhabiles.component';
import { CobrosAdicionalesComponent, agregarCobrosAdicionales, editarCobrosAdicionales, eliminarCobrosAdicionales } from './components/cobros-adicionales/cobros-adicionales.component';
import { InstitucionesCobrosAdicionalesComponent, eliminarICobrosAdicionales, editarICobrosAdicionales, agregarICobrosAdicionales } from './components/instituciones-cobros-adicionales/instituciones-cobros-adicionales.component';
import { LimpiezaDeArchivosComponent } from './components/limpieza-de-archivos/limpieza-de-archivos.component';
import { routing, appRoutingProviders } from './app.routing';
import { ProductosComponent } from './components/productos/productos.component';

//***********************SAMUEL***************************

import { MotivoDeReversaComponent, agregarMotivoDeReversa, editarMotivoDeReversa, eliminarMotivoDeReversa } from './components/motivo-de-reversa/motivo-de-reversa.component';
import { FormasDeDesembolsoComponent, agregarFormasDeDesembolso, editarFormasDeDesembolso, eliminarFormasDeDesembolso } from './components/formas-de-desembolso/formas-de-desembolso.component';
import { MotivosReferenciasClientesComponent, agregarMotivosReferenciasClientes, editarMotivosReferenciasClientes } from './components/motivos-referencias-clientes/motivos-referencias-clientes.component';
import { RelacionTransaccionesDepositosComponent, agregarRelacionTransaccionesDepositos, editarRelacionTransaccionesDepositos } from './components/relacion-transacciones-depositos/relacion-transacciones-depositos.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ParametrosAdicionalPorProductoComponent } from './components/parametros-adicional-por-producto/parametros-adicional-por-producto.component';
import { EventosDeSolicitudesComponent } from './components/eventos-de-solicitudes/eventos-de-solicitudes.component';
import { DocumentosAPresentarPorProductoComponent } from './components/documentos-a-presentar-por-producto/documentos-a-presentar-por-producto.component';
import { MontosPorPlazoComponent } from './components/montos-por-plazo/montos-por-plazo.component';
///
import { SeleccionDeAgenciasPorEmpresaComponent } from './components/seleccion-de-agencias-por-empresa/seleccion-de-agencias-por-empresa.component';
import { RegistroDeTipoDeDocumentoComponent } from './components/registro-de-tipo-de-documento/registro-de-tipo-de-documento.component';
//
//*********************DANIEL OVANDO************************
import { MediosDeContactoComponent, agregarMediosdeContacto, editarMediosdeContacto, eliminarMediosdeContacto } from './components/medios-de-contacto/medios-de-contacto.component';
import { EstatusGarantiasRealesComponent, agregarEstatus, editarEstatus, eliminarEstatus } from './components/estatus-garantias-reales/estatus-garantias-reales.component';
import { IngenierosValuadoresComponent, agregarIngenieros, editarIngenieros, eliminarIngenieros } from './components/ingenieros-valuadores/ingenieros-valuadores.component';
import { CategoriaSibComponent, agregarCategoria, editarCategoria, eliminarCategoria } from './components/categoria-sib/categoria-sib.component';
import { EstatusAvaluoComponent, agregarAvaluo, editarAvaluo, eliminarAvaluo } from './components/estatus-avaluo/estatus-avaluo.component';
import { AcercamientosComponent, agregarAcercamientos, editarAcercamientos } from './components/acercamientos/acercamientos.component';
import { AsignacionDeCategoriasComponent, agregarAsignaciondeCategorias, editarAsignaciondeCategorias } from './components/asignacion-de-categorias/asignacion-de-categorias.component';
import { CanalesDeVentaComponent, agregarCanalesdeVenta, editarCanalesdeVenta } from './components/canales-de-venta/canales-de-venta.component';
import { PorcentajesDeFinanciamientoComponent, agregarPorcentajes, editarPorcentajes } from './components/porcentajes-de-financiamiento/porcentajes-de-financiamiento.component';
import { RangosDePlazosComponent, agregarRangodePlazos, editarRangodePlazos } from './components/rangos-de-plazos/rangos-de-plazos.component';
import { TipoDeProductoComponent, agregarTipoProducto, editarTipoProducto } from './components/tipo-de-producto/tipo-de-producto.component';
import { TiposDeCanalesDeDistribucionComponent, agregarTiposdeCanalesdeDistribucion, editarTiposdeCanalesdeDistribucion } from './components/tipos-de-canales-de-distribucion/tipos-de-canales-de-distribucion.component';

//********************************MUÑOZ*******************/
import { InstanciasComponent,aInstancia,bInstancia,eInstancia } from './components/instancias/instancias.component';
import { PasosCierreAltasComponent } from './components/pasos-cierre-altas/pasos-cierre-altas.component';
import { SidebarsComponent } from './components/sidebars/sidebars.component';
import { NotariosComponent,DialogNotario,DialogActualizarNotario,DialogEliminarNotario } from './components/notarios/notarios.component';
import { AltasComponent } from './components/altas/altas.component';
import { EstadosPrestamosComponent } from './components/estados-prestamos/estados-prestamos.component';
import { NumeroPrestamosComponent,agregarNumeroPrestamos } from './components/numero-prestamos/numero-prestamos.component';
import { PasosCierreComponent,agregarPasosCierre } from './components/pasos-cierre/pasos-cierre.component';
import { AjustesAltasComponent } from './components/ajustes-altas/ajustes-altas.component';
import { CobrosAdicionalesAltasComponent } from './components/cobros-adicionales-altas/cobros-adicionales-altas.component';
import { DiasInhabilesAltasComponent } from './components/dias-inhabiles-altas/dias-inhabiles-altas.component';
import { SubEstadosComponent,agregarSubEstados } from './components/sub-estados/sub-estados.component';
import { SubEstadosAltasComponent } from './components/sub-estados-altas/sub-estados-altas.component';
import { NumeroPrestamosAltasComponent } from './components/numero-prestamos-altas/numero-prestamos-altas.component';
import {ContabilizacionComponent,agregarcontabilizacion } from './components/contabilizacion/contabilizacion.component';
import {PoderComponent,aPoder,bPoder,ePoder} from './components/poder/poder.component';
//********************************CHINO*******************/
import { AgrupacionesDeCreditoComponent, agregarACredito } from './components/agrupaciones-de-credito/agrupaciones-de-credito.component';
import { AlmacenadoraComponent, aAlmacenadora, bAlmacenadora, eAlmacenadora } from './components/almacenadora/almacenadora.component';
import { AseguradoraComponent, aAseguradora, editAseguradora, elimAseguradora } from './components/aseguradora/aseguradora.component';
import { AsesorDePrestamosComponent, agregarAprestamos } from './components/asesor-de-prestamos/asesor-de-prestamos.component';
import { BancosComponent } from './components/bancos/bancos.component';
import { LugarDeInversionComponent, aLuagrInv, editLugarInv, elimLugarInv } from './components/lugar-de-inversion/lugar-de-inversion.component';
import { TipoDeDeduccionComponent, aTipoDeduc } from './components/tipo-de-deduccion/tipo-de-deduccion.component';
import { TipoDePrestamoComponent, aTipoP } from './components/tipo-de-prestamo/tipo-de-prestamo.component'; 
import { ContenidosContablesComponent, contenido1, contenido2 } from './components/contenidos-contables/contenidos-contables.component';
//*****************************EDUARDO****************/
import { OrigenDeFondosComponent, agregarOrigenDeFondos, editarOrigenDeFondos, eliminarOrigenDeFondos } from './components/origen-de-fondos/origen-de-fondos.component';
import { UbicacionDeGarantiaComponent, agregarUbicacionDeGarantia, editarUbicacionDeGarantia, eliminarUbicacionDeGarantia } from './components/ubicacion-de-garantia/ubicacion-de-garantia.component';
import { FormasDePagoComponent, agregarFormasDePago, editarFormasDePago, eliminarFormasDePago } from './components/formas-de-pago/formas-de-pago.component';
import { DestinosComponent, agregarDestinos, editarDestinos, eliminarDestinos } from './components/destinos/destinos.component';
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



@NgModule({
  declarations: [
    AppComponent,
    MotivosDeAjustesComponent,
    agregarMotivosDeAjustes,
    editarMotivosDeAjustes,
    eliminarMotivosDeAjustes,
    DiasInhabilesComponent,
    agregarDiasInhabiles,
    editarDiasInhabiles,
    eliminarDiasInhabiles,
    CobrosAdicionalesComponent,
    agregarCobrosAdicionales,
    editarCobrosAdicionales,
    eliminarCobrosAdicionales,
    InstitucionesCobrosAdicionalesComponent,
    LimpiezaDeArchivosComponent,
    ProductosComponent, 
//SAMUEL
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
    SeleccionDeAgenciasPorEmpresaComponent, 
    RegistroDeTipoDeDocumentoComponent,

    agregarMotivoDeReversa,
    editarMotivoDeReversa,
    eliminarMotivoDeReversa,
    agregarFormasDeDesembolso,
    editarFormasDeDesembolso,
    eliminarFormasDeDesembolso,
    agregarMotivosReferenciasClientes,
    editarMotivosReferenciasClientes,
    agregarRelacionTransaccionesDepositos,
    editarRelacionTransaccionesDepositos,
//
    AgrupacionesDeCreditoComponent,
    agregarACredito,
    AlmacenadoraComponent, 
    aAlmacenadora, 
    bAlmacenadora,
    eAlmacenadora,
    AseguradoraComponent,
    aAseguradora, 
    elimAseguradora,
    editAseguradora,
    AsesorDePrestamosComponent,
    agregarAprestamos,
    BancosComponent,
    LugarDeInversionComponent, 
    aLuagrInv,
    editLugarInv,
    elimLugarInv,
    elimAseguradora,
    TipoDeDeduccionComponent,
    aTipoDeduc,
    TipoDePrestamoComponent, 
    aTipoP, 

// DANIEL OVANDO
    AcercamientosComponent,
    AsignacionDeCategoriasComponent,
    CanalesDeVentaComponent,
    MediosDeContactoComponent,
    CategoriaSibComponent,
    EstatusAvaluoComponent,
    PorcentajesDeFinanciamientoComponent,
    RangosDePlazosComponent,
    TipoDeProductoComponent,
    TiposDeCanalesDeDistribucionComponent,
    EstatusGarantiasRealesComponent,
    IngenierosValuadoresComponent,
//
    agregarAcercamientos,
    editarAcercamientos,
    agregarMediosdeContacto,
    editarMediosdeContacto,
    eliminarMediosdeContacto,
    agregarCanalesdeVenta,
    editarCanalesdeVenta,
    agregarTiposdeCanalesdeDistribucion,
    editarTiposdeCanalesdeDistribucion,
    agregarAsignaciondeCategorias,
    editarAsignaciondeCategorias,
    agregarPorcentajes,
    editarPorcentajes,
    agregarRangodePlazos, 
    editarRangodePlazos,
    agregarTipoProducto, 
    editarTipoProducto,
    agregarEstatus,
    editarEstatus,
    eliminarEstatus,
    agregarIngenieros,
    editarIngenieros,
    eliminarIngenieros,
    agregarCategoria, 
    editarCategoria, 
    eliminarCategoria,
    agregarAvaluo, 
    editarAvaluo, 
    eliminarAvaluo,

//
    NotariosComponent,
    DialogNotario,
   DialogActualizarNotario,
    DialogEliminarNotario,
     AltasComponent,
    EstadosPrestamosComponent,
    NumeroPrestamosComponent,
    agregarNumeroPrestamos,
    PasosCierreComponent,
    AjustesAltasComponent,
    CobrosAdicionalesAltasComponent,
    DiasInhabilesAltasComponent,
    SubEstadosComponent,
    agregarSubEstados,
    SubEstadosAltasComponent,
    NumeroPrestamosAltasComponent,
    PasosCierreAltasComponent,
    SidebarsComponent,
    ContenidosContablesComponent,
    ContabilizacionComponent,
    contenido1,
    contenido2,
    agregarPasosCierre,
    SidebarsComponent,
    ContabilizacionComponent,
    agregarcontabilizacion,
    PoderComponent,
    aPoder,
    bPoder,
    ePoder,
    aInstancia,
    bInstancia,
    eInstancia,
    agregarcontabilizacion, 
    eliminarICobrosAdicionales,
    editarICobrosAdicionales,
    agregarICobrosAdicionales,
  //VILLATORO
    OrigenDeFondosComponent,
    agregarOrigenDeFondos,
    eliminarOrigenDeFondos,
    editarOrigenDeFondos,
    UbicacionDeGarantiaComponent,
    agregarUbicacionDeGarantia, 
    editarUbicacionDeGarantia, 
    eliminarUbicacionDeGarantia,
    FormasDePagoComponent, 
    agregarFormasDePago, 
    
    editarFormasDePago, 
    eliminarFormasDePago,
    DestinosComponent, 
    agregarDestinos, 
    editarDestinos, 
    eliminarDestinos, PoderComponent, InstanciasComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule, 
    HttpClientModule,
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
    //////Alan
    agregarDiasInhabiles,
    agregarMotivosDeAjustes,
    editarMotivosDeAjustes,
    eliminarMotivosDeAjustes,
    agregarDiasInhabiles,
    editarDiasInhabiles,
    eliminarDiasInhabiles,
    agregarCobrosAdicionales,
    eliminarCobrosAdicionales,
    editarCobrosAdicionales,
    agregarACredito,
    aAlmacenadora, 
    bAlmacenadora,
    eAlmacenadora, 
    elimAseguradora,
    editAseguradora, 
    elimLugarInv,
    editLugarInv, 
    contenido1,
    contenido2,
    aAseguradora,   
    aLuagrInv,
    agregarAprestamos,
    aTipoDeduc,
    aTipoP,
    //////Samuel
    agregarMotivoDeReversa,//
    editarMotivoDeReversa,
    eliminarMotivoDeReversa,
    agregarFormasDeDesembolso,//
    editarFormasDeDesembolso,
    eliminarFormasDeDesembolso,
    agregarMotivosReferenciasClientes,//
    editarMotivosReferenciasClientes,
    agregarRelacionTransaccionesDepositos,//
    editarRelacionTransaccionesDepositos,
     //////

     ////Ovando
    agregarAcercamientos,
    editarAcercamientos,
    agregarMediosdeContacto,
    editarMediosdeContacto,
    eliminarMediosdeContacto,
    agregarCanalesdeVenta,
    editarCanalesdeVenta,
    agregarTiposdeCanalesdeDistribucion,
    editarTiposdeCanalesdeDistribucion,
    agregarAsignaciondeCategorias,
    editarAsignaciondeCategorias,
    agregarPorcentajes,
    editarPorcentajes,
    agregarRangodePlazos, 
    editarRangodePlazos,
    agregarTipoProducto, 
    editarTipoProducto,
    agregarEstatus,
    editarEstatus,
    eliminarEstatus,
    agregarIngenieros,
    editarIngenieros,
    eliminarIngenieros,
    agregarCategoria, 
    editarCategoria, 
    eliminarCategoria,
    agregarAvaluo, 
    editarAvaluo, 
    eliminarAvaluo,

     ///Muñoz
     DialogNotario,
     DialogActualizarNotario,
      DialogEliminarNotario,
     agregarPasosCierre,
     agregarNumeroPrestamos,
     agregarSubEstados,
     agregarACredito,
     agregarcontabilizacion,     
     aPoder,
     bPoder,
     ePoder,
     aInstancia,
     bInstancia,
     eInstancia,
     //VILLATORO
    OrigenDeFondosComponent,
    agregarOrigenDeFondos,
    eliminarOrigenDeFondos,
    editarOrigenDeFondos,
    UbicacionDeGarantiaComponent,
    agregarUbicacionDeGarantia, 
    editarUbicacionDeGarantia, 
    eliminarUbicacionDeGarantia,
    FormasDePagoComponent, 
    agregarFormasDePago, 
    editarFormasDePago, 
    eliminarFormasDePago,
    DestinosComponent, 
    agregarDestinos, 
    editarDestinos, 
    eliminarDestinos ,
    eliminarICobrosAdicionales,
    editarICobrosAdicionales,
    agregarICobrosAdicionales,
  ],

  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})

export class AppModule { }
