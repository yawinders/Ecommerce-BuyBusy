import React from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import NavBar from './components/Navbar/NavBar'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'
import "react-toastify/dist/ReactToastify.css";
import Home from './pages/Home/Home'
import { ToastContainer } from 'react-toastify'
import Cart from './pages/Cart/Cart'
import Myorders from './pages/MyOrders/Myorders';
import PrivateRoute from './components/PrivateRoute'


export default function Routes() {

    const router = createBrowserRouter([
        {
            path: '/',
            element: <>
                <NavBar />
                <Outlet />
            </>,
            children: [
                {
                    index: true,
                    element: <Home />
                },
                {
                    path: 'login',
                    element: <Login />
                },
                {
                    path: 'signup',
                    element: <SignUp />
                },
                {
                    path: '/cart',
                    element: <PrivateRoute element={<Cart />} />
                },
                {
                    path: '/myorders',
                    element: <PrivateRoute element={<Myorders />} />
                }
            ]
        }
    ]);

    return (
        <>
            <ToastContainer />
            <RouterProvider router={router} />
        </>
    )
}
