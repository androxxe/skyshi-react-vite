import React from "react";
import { Header } from "../components";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from "react-helmet";

const Layout = ({ children, title }) => {
  return <>
    <Helmet>
      <title>To Do List - { title }</title>
      <link rel="icon" href="/favicon.ico" />
    </Helmet>
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
