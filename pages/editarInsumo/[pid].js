import React from 'react';
import { useRouter } from 'next/router'
import Layout from '../../components/Layout';
import { Formik } from 'formik'
import { gql, useQuery, useMutation } from '@apollo/client'
import * as Yup from 'yup'
import Swal from 'sweetalert2';

const OBTENER_INSUMO = gql`
   query obtenerInsumo ($id: ID!) {
    obtenerInsumo (id: $id) {
      id
      nombre
      categoria
      cantidad
    }
  }
`;

const ACTUALIZAR_INSUMO = gql`
    mutation actualizarInsumo($id: ID!, $input: InsumoInput) {
        actualizarInsumo(id: $id, input: $input) {
            nombre
            categoria
            cantidad
        }
}
`;

const EditarInsumo = () => {

    const router = useRouter();
    const { query: { id } } = router;

    const { data, loading, error } = useQuery(OBTENER_INSUMO, {
        variables: {
            id
        }
    });

    const [ actualizarInsumo ] = useMutation( ACTUALIZAR_INSUMO );

    const schemaValidacion = Yup.object({
        nombre: Yup.string(),
        categoria: Yup.string(),
        cantidad: Yup.number() 
                    
    });
    
    if(loading) return (   
        <Layout>
            Cargando...   
        </Layout>
    );

    const { obtenerInsumo } = data;

    const actualizarInfoInsumo = async valores => {
        const { nombre, categoria, cantidad } = valores;

        try {
            const { data } = await actualizarInsumo({
                variables: {
                    id,
                    input: {
                        nombre, 
                        categoria,
                        cantidad
                    }
                }
            });

            // console.log(data);
  
            // Mostrar Alerta
            Swal.fire(
                'Actualizado',
                'El insumo se actualizó correctamente',
                'success'
            )

            // Redireccionar
            router.push('/insumos');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout>
          <h1 className="text-2xl text-gray-800 font-light">Editar Insumo</h1>

          <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">

                    <Formik
                        validationSchema={ schemaValidacion }
                        enableReinitialize
                        initialValues={ obtenerInsumo }
                        onSubmit={ ( valores ) => { actualizarInfoInsumo(valores) }}
                    >

                    {props => {
                    console.log(props);
                    return (
                            <form
                                className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                                onSubmit={props.handleSubmit}
                            >
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                                            Nombre
                                        </label>

                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="nombre"
                                            type="text"
                                            placeholder="Nombre del insumo"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.nombre}
                                        />
                                    </div>

                                    { props.touched.nombre && props.errors.nombre ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.nombre}</p>
                                        </div>
                                    ) : null  }

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoria">
                                            Categoria
                                        </label>
                                        <select
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            name="categoria"
                                            id="categoria"
                                            type="text"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                        >
                                            <option value={props.values.categoria} label={props.values.categoria} />
                                            <option value="Esponjas" label="Esponjas" />
                                            <option value="Placas" label="Placas" />
                                            <option value="Geles" label="Geles" />
                                            <option value="Sistemas" label="Sistemas" />
                                        </select>
                                    </div>

                                    { props.touched.categoria && props.errors.categoria ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.categoria}</p>
                                        </div>
                                    ) : null  }

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cantidad">
                                            Cantidad
                                        </label>

                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="cantidad"
                                            type="number"
                                            placeholder="Cantidad"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.cantidad}
                                        />
                                    </div>

                                    { props.touched.cantidad && props.errors.cantidad ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.cantidad}</p>
                                        </div>
                                    ) : null  }


                                    <input
                                        type="submit"
                                        className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                                        value="Editar Insumo"
                                    />
                            </form>      
                        )
                    }}
                    </Formik> 
                </div>
            </div> 
        </Layout>        
    );
}

export default EditarInsumo