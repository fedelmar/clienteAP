import React, { useEffect, useMemo, useState } from 'react';
import { useTable, useFilters, useSortBy } from "react-table";
import { format } from 'date-fns';
import MostrarObser from '../MostrarObser';
import EliminarRegistro from './EliminarRegistro';
import columnas from './columns';

const Table = ({registros, filtros, rol}) => {

    const [filtroLote, setFiltroLote] = useState("");
    const [filtroOperario, setFiltroOperario] = useState("");
    const [filtroProducto, setFiltroProducto] = useState("");
    const columns = useMemo(
        () => columnas,
        []
    );    
    const tableInstance = useTable(
        { columns, data: registros }, 
        useFilters, 
        useSortBy
    );

    useEffect(() => {
        if (rol !== 'Admin') toggleHideColumn('eliminar')            
    },[])

    const {
        getTableProps,
        getTableBodyProps,
        headers,
        rows,
        prepareRow,
        setFilter,
        toggleHideColumn
    } = tableInstance;

    const handleFilterChangeLote = e => {
        const value = e.target.value || undefined;
        setFilter("lote", value);
        setFiltroLote(value);
    };

    const handleFilterChangeProducto = e => {
        const value = e.target.value || undefined;
        setFilter("producto", value);
        setFiltroProducto(value);
    };

    const handleFilterChangeOperario = e => {
        const value = e.target.value || undefined;
        setFilter("operario", value);
        setFiltroOperario(value);
    };

    return (
        <div className="overflow-x-scroll">
            {filtros ? 
                <div className="flex justify-between">
                    <input
                        className="p-1 border rounded border-gray-800"
                        value={filtroLote}
                        onChange={handleFilterChangeLote}
                        placeholder={"Buscar Lote"}
                    />
                    <input
                        className="p-1 border rounded border-gray-800"
                        value={filtroProducto}
                        onChange={handleFilterChangeProducto}
                        placeholder={"Buscar Producto"}
                    />
                    <input
                        className="p-1 border rounded border-gray-800"
                        value={filtroOperario}
                        onChange={handleFilterChangeOperario}
                        placeholder={"Buscar Operario"}
                    />
                </div>
            : null}

            <table className="table-auto shadow-md mt-2 w-full w-lg">
                <thead className="bg-gray-800">
                    <tr className="text-white">
                        {headers.map(column => (
                            column.id === 'horario' || column.id === 'observaciones' || column.id === 'eliminar' 
                            ?
                                rol !== 'Admin' && column.id === 'eliminar' ?
                                    null
                                :  
                                    <th 
                                        className={column.id === 'horario' ? "w-2/12 py-2" : "w-1/12 py-2"} 
                                        {...column.getHeaderProps()}
                                    >                              
                                        {column.render('Header')}
                                                
                                    </th>                                    
                        
                            :
                                <th 
                                    className={column.id === 'horario' ? "w-2/12 py-2" : "w-1/12 py-2"} 
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                >                              
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted
                                        ? column.isSortedDesc
                                            ? ' ▽'
                                            : ' △'
                                        : ''}
                                    </span>                        
                                </th>
                        ))}
                    </tr>
                </thead>
                <tbody 
                    className="bg-white"
                    {...getTableBodyProps()}
                >
                    {rows.map(row => {
                        prepareRow(row)
                        return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                            return (
                                <>
                                    {cell.column.id === 'eliminar' ? 
                                        <EliminarRegistro props={cell.row.original.id} />
                                    : 
                                        cell.column.id === 'observaciones' ? 
                                            <MostrarObser observaciones={cell.row.original.observaciones} />   
                                    :
                                        cell.column.id === 'fecha' ?
                                            <th 
                                                className="border px-4 py-2"
                                                {...cell.getCellProps()}
                                            >
                                                {format(new Date(cell.row.original.fecha), 'dd/MM/yy')}
                                            </th>
                                    :
                                        cell.column.id === 'horario' ?
                                            <th 
                                                className="border px-4 py-2"
                                                {...cell.getCellProps()}
                                            >
                                                De {format(new Date(cell.row.original.fecha), 'HH:mm')} a {cell.row.original.horaCierre}
                                            </th>
                                    :
                                        <th 
                                            className="border px-4 py-2"
                                            {...cell.getCellProps()}
                                        >
                                            {cell.render('Cell')}
                                        </th>}                        
                                </>
                            )
                            })}
                        </tr>
                        )
                    })}
                </tbody>            
            </table>
        </div>
    );
}

export default Table;