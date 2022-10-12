import React, { useEffect } from "react";
import { Header } from "../components";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from "react-helmet";

const Layout = ({ children, title }) => {
  useEffect(() => {
    <Helmet>
      <title>{ title }</title>
      {/* <link rel="preconnect" href="https://fonts.googleapis.com"/> 
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/> 
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"/> */}
    </Helmet>
  }, [children, title]);
  
  return <>
    {/* <Helmet>
      <title>{ title }</title>
    </Helmet> */}
    <div className="">
      <Header />
      <div className="container mx-auto py-10 px-5 lg:px-0">
        { children }
      </div>
    </div>
    <ToastContainer />
  </>;
};

export default Layout;
