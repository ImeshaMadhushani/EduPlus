// src/App.js
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
//import Header from './components/Header';
//import Footer from './components/Footer';



const App = () => {
  return (
    <BrowserRouter future={{
      v7_startTransition: true, v7_relativeSplatPath: true,
    }}>
      <Routes path='/*'>
        <Route path='/admin' element={<AdminDashboard/>}/>
        <Route path='/' element={ <Home/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/studashboard" element={<StudentDashboard />} /> 
      </Routes>


    </BrowserRouter>
  )
}

export default App;
