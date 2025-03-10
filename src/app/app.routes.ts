import { Routes } from '@angular/router';
import { LibroComponent } from './pages/libro/libro.component';
import { TiendaComponent } from './pages/tienda/tienda.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { AcercadeComponent } from './pages/acercade/acercade.component';

export const routes: Routes = [
    {
        path:'home',
        component: LibroComponent
    },
    {
        path: 'tiendatec',
        component: TiendaComponent
    },
    {
        path: 'productos',
        component: ProductosComponent
    },
    {
        path:'acercade',
        component: AcercadeComponent
    },
    {
        path: '**',
        redirectTo: 'home'
    }

];
