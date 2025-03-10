import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { first } from 'rxjs';
import { Producto } from '../models/producto.models';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private tiendaDb: Firestore = inject(Firestore);

  constructor() {}

   // Obtener todos los productos de la tienda
   getTiendaProductos() {
    const tiendaCollection = collection(this.tiendaDb, 'productos');
    return collectionData(tiendaCollection, { idField: 'id' }).pipe(first());
  }

  // Agregar un producto a la tienda
  agregarTiendaProducto(tiendaProducto: Producto) {
    const tiendaCollection = collection(this.tiendaDb, 'productos');
    const tiendaProductoData = {
      descripcion: tiendaProducto.descripcion,
      precio: tiendaProducto.precio
    };
    addDoc(tiendaCollection, tiendaProductoData);
  }

  // Modificar un producto de la tienda
  modificarTiendaProducto(tiendaProducto: Producto) {
    const tiendaDocumentRef = doc(this.tiendaDb, 'productos', tiendaProducto.id);
    updateDoc(tiendaDocumentRef, {
      descripcion: tiendaProducto.descripcion,
      precio: tiendaProducto.precio
    });
  }

  // Eliminar un producto de la tienda
  eliminarTiendaProducto(tiendaProducto: Producto) {
    const tiendaDocumentRef = doc(this.tiendaDb, 'productos', tiendaProducto.id);
    deleteDoc(tiendaDocumentRef);
  }
}
