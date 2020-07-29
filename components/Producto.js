import React from 'react';
import Swal from 'sweetalert2';
import { gql, useMutation } from '@apollo/client';
import Router from 'next/router';

const ELIMINAR_PRODUCTO = gql` 
    mutation eliminarProducto($id: ID!){
        eliminarProducto(id: $id)
    }
`;

const OBTENER_PRODUCTOS = gql`
  query obtenerProductos {
    obtenerProductos{
      id
      nombre
      categoria
      cantidad
    }
  }
`;


const Producto = ({producto}) => {
   
    const [eliminarProducto] = useMutation(ELIMINAR_PRODUCTO, {
        update(cache) {
            // Obtener copia de productos
            const { obtenerProductos } = cache.readQuery({ query: OBTENER_PRODUCTOS });

            // Reescribir el cache
            cache.writeQuery({
                query: OBTENER_PRODUCTOS,
                data: {
                    obtenerProductos : obtenerProductos.filter( productoActual => productoActual.id !== id )
                }
            })
        }
    });

    const { nombre, categoria, cantidad, id } = producto;
   

    const confimarEliminarProducto = async () => {
        Swal.fire({
            title: '¿Desea eliminar el producto?',
            text: "Sera eliminado definitivamente",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar!',
            cancelButtonText: 'Cancelar'
          }).then( async (result) => {
            if (result.value) {

                try {
                    //Eliminar por id
                    const { data } = await eliminarProducto({
                        variables: {
                            id
                        }
                    })
                    console.log(data);
                    Swal.fire(
                        'Eliminado!',
                        data.eliminarProducto,
                        'success'
                )
                } catch (error) {
                    console.log(error);
                }
            }
          })
    }

    const editarProducto = () => {
        Router.push({
            pathname: "/editarProducto/[id]",
            query: { id }
        })
    }


    return (
        <tr>
            <th className="border px-4 py-2" >{nombre}</th>
            <th className="border px-4 py-2" >{categoria}</th>
            <th className="border px-4 py-2" >{cantidad}</th>
            <td className="border px-4 py-2 ">
                <button
                    type="button"
                    onClick={() => confimarEliminarProducto()}
                    className="flex justify-center item-center bg-red-800 py-2 px-4 w-full text-white rounded uppercase font-bold text-xs"    
                >
                    Eliminar
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4 ml-2"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </button>
            </td>
            <td className="border px-4 py-2">
                <button
                    type="button"
                    className="flex justify-center items-center bg-green-600 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
                    onClick={() => editarProducto()}
                >
                    Editar
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4 ml-2"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                </button>
            </td>
        </tr>
    );
}

export default Producto;