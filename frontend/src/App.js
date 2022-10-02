import './App.css';

import { Routes, Route, Navigate } from "react-router";

import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import { useSelector } from "react-redux";

import Box from "./pages/Box/Box.js";
import Bit from "./pages/Bit/Bit";
import User from "./pages/User/User";

const App = ()=>{
  const auth = useSelector((state)=>state.Auth);
  return (
      <Routes>
        <Route path='/' element={<Navigate to='box/NewBox'/>}/>
        <Route path='box/:name' element={<Box/>}/>
        <Route path='box/:name/bit/:id' element={<Bit/>}/>
        <Route path='bit' element={<Bit/>}/>
        <Route path='user/:id' element={<User/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='register' element={<Register/>}/>
      </Routes>
  );
}

export default App;
