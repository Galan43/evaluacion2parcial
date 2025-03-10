import { Component } from '@angular/core';
import { Producto } from '../../models/producto.models';
import { firstValueFrom } from 'rxjs';
import { ProductosService } from '../../services/productos.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-productos',
  imports: [FormsModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
  // Propiedades
  tiendaProductos: any;
  tiendaProducto = new Producto();

   constructor(private productosService: ProductosService) {
     this.getTiendaProductos();
   }

   // Método para obtener los productos de la tienda
   async getTiendaProductos(): Promise<void> {
    this.tiendaProductos = await firstValueFrom(this.productosService.getTiendaProductos());
  }

  // Método para insertar un producto desde el formulario
  insertarTiendaProducto() {
    this.productosService.agregarTiendaProducto(this.tiendaProducto);
    this.getTiendaProductos();
    this.tiendaProducto = new Producto();
  }

  // Método para seleccionar un producto de la tabla
  selectTiendaProducto(tiendaProductoSeleccionado: Producto) {
    this.tiendaProducto = tiendaProductoSeleccionado; // Clonamos el objeto para evitar cambios directos
  }

  // Método para modificar un producto
  updateTiendaProducto() {
    this.productosService.modificarTiendaProducto(this.tiendaProducto);
    this.tiendaProducto = new Producto();
    this.getTiendaProductos();
  }

  // Método para eliminar un producto
  deleteTiendaProducto() {
    this.productosService.eliminarTiendaProducto(this.tiendaProducto);
    this.tiendaProducto = new Producto();
    this.getTiendaProductos();
  }
}

