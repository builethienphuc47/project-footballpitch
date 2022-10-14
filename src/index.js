import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Intro from './pages/intro'
import MyPitches from './pages/my-pitches'
import UsersManagement from './pages/users-management'
import PitchesManagement from './pages/pitches-management'
import SignIn from './pages/signin'
import SignUp from './pages/signup'
import Order from './pages/order'
import OrdersManagement from './pages/orders-management'
import 'react-toastify/dist/ReactToastify.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/intro" element={<Intro />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/my-pitches" element={<MyPitches />} />
        <Route path="/users-management" element={<UsersManagement />} />
        <Route path="/pitches-management" element={<PitchesManagement />} />
        <Route path="/order-pitch" element={<Order />} />
        <Route path="/orders-management" element={<OrdersManagement />} />
      </Routes>
    </BrowserRouter>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
