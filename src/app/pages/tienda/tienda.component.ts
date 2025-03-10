import { Component } from '@angular/core';
import { TiendaService } from '../../services/tienda.service';
import { Producto } from '../../models/producto.models';
import { firstValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tienda',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tienda.component.html',
  styleUrl: './tienda.component.css'
})
export class TiendaComponent {

   // Propiedades
   productos: any;
   producto = new Producto();
 
   // Constructor
   constructor(private tiendaService: TiendaService) {
     this.getProductos();
   }
 
   // Método para obtener los productos de la tienda
   async getProductos(): Promise<void> {
     this.productos = await firstValueFrom(this.tiendaService.getProductos());
   }
 
   // Método para insertar un producto desde el formulario
   insertarProducto() {
     this.tiendaService.agregarProducto(this.producto);
     this.getProductos();
     this.producto = new Producto();
   }
 
   // Método para seleccionar un producto de la tabla
   selectProducto(productoSeleccionado: Producto) {
     this.producto = productoSeleccionado; // Clonamos el objeto para evitar cambios directos
   }
 
   // Método para modificar un producto
    updateProducto() {
     this.tiendaService.modificarProducto(this.producto);
     this.producto = new Producto();
     this.getProductos();
   }
 
   // Método para eliminar un producto
    deleteProducto() {
     this.tiendaService.eliminarProducto(this.producto);
     this.producto = new Producto();
     this.getProductos();
   }
}
