import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { first } from 'rxjs';
import { Producto } from '../models/producto.models'; 

@Injectable({
  providedIn: 'root'
})
export class TiendaService {

  private db: Firestore = inject(Firestore);

  constructor() {}

   // Obtener todos los productos
   getProductos() {
    const tiendaCollection = collection(this.db, 'tienda');
    return collectionData((tiendaCollection), { idField: 'id' }).pipe(first());
  }

  // Agregar un producto
  agregarProducto(producto: Producto) {
    const tiendaCollection = collection(this.db, 'tienda');
    const productoData = {
      nombre : producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio
    };
    addDoc(tiendaCollection, productoData);
  }

  // Modificar un producto
  modificarProducto(producto: Producto) {
    const documentRef = doc(this.db, 'tienda', producto.id);
   updateDoc(documentRef, {
      nombre : producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio
    });
  }

  // Eliminar un producto
  eliminarProducto(producto: Producto) {
    const documentRef = doc(this.db, 'tienda', producto.id);
     deleteDoc(documentRef);
  }
}
