import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router"
//Alan
import {CobrosAdicionalesComponent} from "./components/cobros-adicionales/cobros-adicionales.component";
import {DiasInhabilesComponent} from "./components/dias-inhabiles/dias-inhabiles.component";
import {InstitucionesCobrosAdicionalesComponent} from "./components/instituciones-cobros-adicionales/instituciones-cobros-adicionales.component";
import {MotivosDeAjustesComponent} from "./components/motivos-de-ajustes/motivos-de-ajustes.component";
import { LimpiezaDeArchivosComponent } from './components/limpieza-de-archivos/limpieza-de-archivos.component';
import { ProductosComponent } from './components/productos/productos.component';
import { PricipalComponent } from './components/pricipal/pricipal.component';
//Samuel
import { FormasDeDesembolsoComponent } from './components/formas-de-desembolso/formas-de-desembolso.component';
import { MotivoDeReversaComponent } from './components/motivo-de-reversa/motivo-de-reversa.component'
import { MotivosReferenciasClientesComponent } from './components/motivos-referencias-clientes/motivos-referencias-clientes.component';
import { RelacionTransaccionesDepositosComponent } from './components/relacion-transacciones-depositos/relacion-transacciones-depositos.component';
import { DocumentosAPresentarPorProductoComponent } from './components/documentos-a-presentar-por-producto/documentos-a-presentar-por-producto.component';
import { EventosDeSolicitudesComponent } from './components/eventos-de-solicitudes/eventos-de-solicitudes.component';
import { ParametrosAdicionalPorProductoComponent } from './components/parametros-adicional-por-producto/parametros-adicional-por-producto.component';
import { MontosPorPlazoComponent } from './components/montos-por-plazo/montos-por-plazo.component';
//Ovando
import { AcercamientosComponent } from './components/acercamientos/acercamientos.component';
import { AsignacionDeCategoriasComponent } from './components/asignacion-de-categorias/asignacion-de-categorias.component';
import { CanalesDeVentaComponent } from './components/canales-de-venta/canales-de-venta.component';
import { MediosDeContactoComponent } from './components/medios-de-contacto/medios-de-contacto.component';
import { PorcentajesDeFinanciamientoComponent } from './components/porcentajes-de-financiamiento/porcentajes-de-financiamiento.component';
import { RangosDePlazosComponent } from './components/rangos-de-plazos/rangos-de-plazos.component';
import { TipoDeProductoComponent } from './components/tipo-de-producto/tipo-de-producto.component';
import { TiposDeCanalesDeDistribucionComponent } from './components/tipos-de-canales-de-distribucion/tipos-de-canales-de-distribucion.component';
//Muñoz
import{NotariosComponent} from "./components/notarios/notarios.component";
import{AltasComponent} from "./components/altas/altas.component";
import {CobrosAdicionalesAltasComponent } from './components/cobros-adicionales-altas/cobros-adicionales-altas.component';
import{DiasInhabilesAltasComponent}from "./components/dias-inhabiles-altas/dias-inhabiles-altas.component";
import{AjustesAltasComponent} from "./components/ajustes-altas/ajustes-altas.component";
import { EstadosPrestamosComponent } from './components/estados-prestamos/estados-prestamos.component';
import { SubEstadosComponent } from './components/sub-estados/sub-estados.component';
import { SubEstadosAltasComponent } from './components/sub-estados-altas/sub-estados-altas.component';
import { NumeroPrestamosComponent } from './components/numero-prestamos/numero-prestamos.component';
import { NumeroPrestamosAltasComponent } from './components/numero-prestamos-altas/numero-prestamos-altas.component';
import { PasosCierreComponent } from './components/pasos-cierre/pasos-cierre.component';
import { PasosCierreAltasComponent } from './components/pasos-cierre-altas/pasos-cierre-altas.component';
import {ContabilizacionComponent} from './components/contabilizacion/contabilizacion.component';
//CHINO
import { AgrupacionesDeCreditoComponent } from './components/agrupaciones-de-credito/agrupaciones-de-credito.component';
import { AlmacenadoraComponent } from './components/almacenadora/almacenadora.component';
import { AseguradoraComponent } from './components/aseguradora/aseguradora.component';
import { LugarDeInversionComponent } from './components/lugar-de-inversion/lugar-de-inversion.component';
import { AsesorDePrestamosComponent } from './components/asesor-de-prestamos/asesor-de-prestamos.component';
import { TipoDeDeduccionComponent } from './components/tipo-de-deduccion/tipo-de-deduccion.component';
import { TipoDePrestamoComponent } from './components/tipo-de-prestamo/tipo-de-prestamo.component';
import { BancosComponent } from './components/bancos/bancos.component';

const appRoutes: Routes = [
//Alan
    {path: 'cobrosAdicionales', component: CobrosAdicionalesComponent},
    {path: 'diasInhabiles', component: DiasInhabilesComponent},
    {path: 'institucionesCobrosAdicionales', component: InstitucionesCobrosAdicionalesComponent},
    {path: 'motivosDeAjustes', component: MotivosDeAjustesComponent},
    {path: 'limpiezaDeArchivos', component: LimpiezaDeArchivosComponent},
    {path: 'productos', component: ProductosComponent},
    {path: 'principal', component: PricipalComponent},
//Samuel
    {path: 'Formas-de-desembolso', component: FormasDeDesembolsoComponent},
    {path: 'Motivo-de-reversa', component: MotivoDeReversaComponent},
    {path: 'Motivos-referencias-clientes', component: MotivosReferenciasClientesComponent},
    {path: 'Relacion-transacciones-depositos', component: RelacionTransaccionesDepositosComponent},
    {path: 'Documentos-a-Presentar-por-Producto', component: DocumentosAPresentarPorProductoComponent},
    {path: 'Eventos-de-solicitudes', component: EventosDeSolicitudesComponent},
    {path: 'Parametros-Adicional-por-Producto', component: ParametrosAdicionalPorProductoComponent},
    {path: 'Montos-por-Plazo', component: MontosPorPlazoComponent},
//Ovando
    {path: 'Acercamientos', component: AcercamientosComponent},
    {path: 'Asignación-de-categorias', component: AsignacionDeCategoriasComponent},
    {path: 'Canales-de-venta', component: CanalesDeVentaComponent},
    {path: 'Medios-de-contacto', component: MediosDeContactoComponent},
    {path: 'Porcentajes-de-financiamiento', component: PorcentajesDeFinanciamientoComponent},
    {path: 'Rangos-de-plazos', component: RangosDePlazosComponent},
    {path: 'Tipo-de-producto', component: TipoDeProductoComponent},
    {path: 'Tipos-de-canales-de-distribución', component: TiposDeCanalesDeDistribucionComponent},
//Muñoz
    {path: 'notarios',component:NotariosComponent},
    {path: 'notariosAltas',component:AltasComponent},
    {path: 'inhabiles',component:DiasInhabilesComponent},
    {path: 'inhabilesAltas',component:DiasInhabilesAltasComponent},
    {path: 'adicionales',component:CobrosAdicionalesComponent},
    {path: 'adicionalesAltas',component:CobrosAdicionalesAltasComponent},
    {path: 'ajustesinhabilesAltas',component:AjustesAltasComponent},
    {path: 'estadosPrestamos',component:EstadosPrestamosComponent},
    {path: 'subEstados',component:SubEstadosComponent},
    {path: 'subEstadosAltas',component:SubEstadosAltasComponent},
    {path: 'numeroPrestamos',component:NumeroPrestamosComponent},
    {path: 'numeroPrestamosAltas',component:NumeroPrestamosAltasComponent},
    {path: 'pasosCierre',component:PasosCierreComponent},
    {path: 'pasosCierreAltas',component:PasosCierreAltasComponent},
    {path: 'contabilizacion',component:ContabilizacionComponent},
    
//CHINO
    {path: 'agrupacionesDeCredito', component: AgrupacionesDeCreditoComponent},
    {path: 'almacenadora', component: AlmacenadoraComponent},
    {path: 'aseguradora', component:AseguradoraComponent},
    {path: 'lugarInversion', component:LugarDeInversionComponent},
    {path: 'asesorPrestamos',component:AsesorDePrestamosComponent}, 
    {path: 'tipoDeduccion',component: TipoDeDeduccionComponent},
    {path: 'tipoPrestamo',component: TipoDePrestamoComponent},
    {path: 'bancos', component: BancosComponent},
]
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
