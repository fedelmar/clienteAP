import React from 'react';
import Head from 'next/head';
import Sidebar from '../components/Sidebar';

const Layout = ({children}) => {
    return (
      <>  
        <title>Sistema AP</title>
        <Head>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" />
            <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet" />
        </Head>
        <div className="bg-gray-200 min-h-screen" >
            <div className="flex min-h-screen">
                <Sidebar />
               
                <main className="xl:w-4/5 sm:w-2/3 sm:min-h-screen p-5">
                   {children}   
                </main>
                    
            </div>
        </div>
        
      </>
    );
}

export default Layout;