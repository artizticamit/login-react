
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import jwt_decode from 'jwt-decode'
import { Navigate } from 'react-router-dom';
import { useEffect,useState } from 'react';
import Posts from './pages/Posts';

function App() {

  const [user, setUser] = useState(null)
  useEffect(()=>{

    const token = JSON.parse(localStorage.getItem('user'))
    if(token){
      // console.log(token.token)
      const jwt = jwt_decode(token.token);
      console.log(jwt)
      if(jwt._id)
      {
        setUser(token.email)
      }
    }
  },[user])

  console.log(user)
  return (
    <>
      <Router>
        <Routes>
        
          <Route exact path='/' element={
            <Home />
          }/> 
          <Route exact path='/login' element={
            user ? <Navigate to='/'/> :<Login />
          }/>
          <Route exact path='/register' element={
            user ? <Navigate to='/' /> :<Register />
          }/>
          <Route exact path='/posts' element={
            <Posts />
          }
          />
           
        </Routes>
      </Router>
    </>
  );
}

export default App;
