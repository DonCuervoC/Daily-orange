import React from 'react';
import { Routes, Route } from "react-router-dom";
//import { map } from "lodash";
import { AdminLayout } from "../layouts";
import { Auth, Users, Blog, Courses, News , Menu, Exchange, NewsLetter} from "../pages/admin";

//const user = null;
const user = { email: "nelson.cuervo89@gmail.com" };

export function AdminRouter() {
    const loadLayout = (Layout, Page) => {
        return (
            <Layout>
                <Page />
            </Layout>
        );
    };

    return (
        <Routes>
            {/* <Route path='/admin/*' element={<Auth/>} /> */}
            {!user ? (
                <Route path="/admin/*" element={loadLayout(AdminLayout, Auth)} />
            ) : (
                <>
                    {["/admin", "/admin/blog"].map((path) => (
                    <Route key={path} path={path} element={loadLayout(AdminLayout, Blog)} />                        
                    ))}
                    {/* <Route path='/admin' element={loadLayout(AdminLayout, Users)} /> */}
                    <Route path="/admin/users" element={loadLayout(AdminLayout, Users)} />
                    <Route path="/admin/courses" element={loadLayout(AdminLayout, Courses)} />
                    <Route path="/admin/news" element={loadLayout(AdminLayout, News)} />
                    <Route path="/admin/menu" element={loadLayout(AdminLayout, Menu)} />
                    <Route path="/admin/exchange" element={loadLayout(AdminLayout, Exchange)} />
                    <Route path="/admin/newsletter" element={loadLayout(AdminLayout, NewsLetter)} />
                </>
            )}
        </Routes>
    );
}


// If I would like to add more routes, with a switch case its possible, check example below :
/* 

import React from 'react';
import { Routes, Route } from "react-router-dom";
import { AdminLayout } from "../layouts";
import { Auth, Users, Blog, Info } from "../pages/admin";

const user = { email: "nelson.cuervo89@gmail.com" };

export function AdminRouter() {
  const loadLayout = (Layout, Page) => {
    return (
      <Layout>
        <Page />
      </Layout>
    );
  };

  return (
    <Routes>
      {!user ? (
        <Route path="/admin/*" element={loadLayout(AdminLayout, Auth)} />
      ) : (
        <>
          {["/admin", "/admin/blog", "/admin/info"].map((path) => (
            <Route key={path} path={path} element={loadLayout(AdminLayout, getPageComponent(path))} />
          ))}
          <Route path="/admin/users" element={loadLayout(AdminLayout, Users)} />
        </>
      )}
    </Routes>
  );
}

function getPageComponent(path) {
  switch(path) {
    case "/admin":
      return Users;
    case "/admin/blog":
      return Blog;
    case "/admin/info":
      return Info;
    default:
      return null;
  }
}
*/