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
    {path: 'Tipos-de-canales-de-distribución', component: TiposDeCanalesDeDistribucionComponent}
]
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
