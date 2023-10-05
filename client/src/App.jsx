import { useState } from 'react'
import {RouterProvider,Route, createBrowserRouter, Outlet} from "react-router-dom"
import "./style.scss"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Write from "./pages/Write"
import Single from "./pages/Single"
import Home from "./pages/Home"
import Navbar from './components/Navbar'
import Menu from './components/Menu'
import Footer from './components/Footer'

const Layout= ()=>{
  return (
    <div>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}
function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element: <Layout/>,
      children:[
        {
          path:"/",
          element: <Home/>
        },
        {
          path:"/single",
          element: <Single/>
        },
 
        {
          path:"/post/:id",
          element : <Single/>
        },
        {
          path:'/write',
          element: <Write/>
        },
        {
          path:'/register',
          element: <Register/>
        },
        {
          path:'/login',
          element: <Login/>
        },
      ]
    },

    
    {
      path:'/single',
      element: <Single/>
    }

  ])

  return (
    <>
      <div className='app'>
        <div className='container'>
          <RouterProvider router={router}/>
        </div>
      </div>
    </>
  )
}

export default App
