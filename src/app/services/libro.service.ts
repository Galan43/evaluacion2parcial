import { first } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Libro } from '../models/libro.models';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

    
  private db :Firestore = inject(Firestore);
  
  constructor() { }

      //Método para obtener todos los documentos de la colección.
      getLibros(){
        const librosCollection = collection(this.db, 'libros');
        return collectionData((librosCollection), {idField: 'id'}).pipe(first());
      }
    
      //Método para agregar documento a la colección.
      agregarLibro(libro:Libro){
        const librosCollection = collection(this.db, 'libros');
        const libroData = {
          titulo: libro.titulo,
          autor: libro.autor,
          editorial: libro.editorial,
          anioPublicacion: libro.anio
        };
        addDoc(librosCollection, libroData);
      }
    
      //Método para modificar un documento.
      modificarLibro(libro:Libro) {
        const documentRef = doc(this.db,'libros',libro.id);
        updateDoc(documentRef, {
          titulo: libro.titulo,
          autor: libro.autor,
          editorial: libro.editorial,
          anioPublicacion: libro.anio
        });
      }
    
      //Método para borrar un documento.
      eliminarLibro(libro:Libro){
        const documentRef = doc(this.db, 'libros', libro.id);
        deleteDoc(documentRef);
      }
}
