import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, defer, RouterProvider } from 'react-router-dom'
import Cart from './pages/Cart/Cart'
import Error from "./pages/Error/Error"
import Layout from './layout/Layout.tsx'
import Product from './pages/Product/Product.tsx'
import { API_URL } from './services/API.ts'
import axios from 'axios';
import AuthLayout from './layout/auth/AuthLayout.tsx'
import Login from './pages/Login/Login.tsx'
import RequireAuth from './helpers/RequireAuth.tsx'
import { Provider } from 'react-redux'
import './index.css'

const Menu = lazy(() => import("./pages/Menu/Menu"))
import { store } from './store/store';
import { Register } from './pages/Register/Register.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <RequireAuth><Layout /></RequireAuth>,
    children: [
      {
        path: "/",
        element: <Suspense fallback={<>Loading...</>}><Menu /></Suspense>
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: '/product/:id',
        element: <Product />,
        errorElement: <>Ошибка</>,
        loader: async ({ params }) => {
          return defer({
            data: new Promise((resolve, reject) => {
              setTimeout(() => {
                axios.get(`${API_URL}/products/${params.id}`).then(data => resolve(data)).catch(e => reject(e));
              }, 2000);
            })
          });
        }
      }
    ]
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      },
    ]
  },
  {
    path: "*",
    element: <Error />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
