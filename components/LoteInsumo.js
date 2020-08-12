/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';

const LISTADO_INSUMOS = gql`
    query obtenerInsumos {
        obtenerInsumos{
            id
            nombre
        }
    }
`;

const LoteInsumo = ({loteInsumo, rol}) => {

    const {data, loading} = useQuery(LISTADO_INSUMOS);

    const {lote, insumo, cantidad} = loteInsumo;

    if (loading) return null;

    // Buscar dentro de lista de productos el nombre del producto
    const {nombre} = data.obtenerInsumos.find(i => i.id === insumo);

    
    return (
        <tr>
            <th className="border px-3 py-2" >{lote}</th>
            <th className="border px-3 py-2" >{nombre}</th>
            <th className="border px-3 py-2" >{cantidad}</th>
            {rol === "Admin" ? (
                <>
                    <td className="border px-4 py-2">
                        <button
                            type="button"
                            className="flex justify-center items-center bg-green-600 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
                            //onClick={() => editarLote()}
                        >
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                        </button>
                    </td>
                    <td className="border px-4 py-2 ">
                        <button
                            type="button"
                            //onClick={() => confirmarEliminarLote()}
                            className="flex justify-center item-center bg-red-800 py-2 px-4 w-full text-white rounded uppercase font-bold text-xs"    
                        >
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </button>
                    </td>
                </>
            ) : null}
        </tr>
    );
}

export default LoteInsumo