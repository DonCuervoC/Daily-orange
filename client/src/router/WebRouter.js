import React from 'react'
import { Routes, Route } from "react-router-dom";
import {ClientLayout } from "../layouts";
import { Home, Blog, Contact, Courses, Exchange, News, Newsletter, Post } from "../pages/web";

export function WebRouter() {
    const loadLayout = (Layout, Page) => {
        return (
            <Layout>
                <Page />
            </Layout>
        );
    };

    return (
        <Routes>
            {/* <Route path="/" element={<Home/>} /> */}
            <Route path="/" element={loadLayout(ClientLayout, Home)} />
            <Route path="/courses" element={loadLayout(ClientLayout, Courses)} />
            <Route path="/blog" element={loadLayout(ClientLayout, Blog)} />
            <Route path="/contact" element={loadLayout(ClientLayout, Contact)} />
            <Route path="/exchange" element={loadLayout(ClientLayout, Exchange)} />
            <Route path="/news" element={loadLayout(ClientLayout, News)} />
            <Route path="/newsletter" element={loadLayout(ClientLayout, Newsletter)} />
            <Route path="/post" element={loadLayout(ClientLayout, Post)} />
        </Routes>

    );
}
