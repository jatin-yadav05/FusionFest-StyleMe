import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import Login from './components/Login'
import Generate from './components/Generate'
import Home from './components/Home'
import Pricing from './components/Pricing'  
import SignIn from "./components/SignIn"
import Dashboard from "./components/Dashboard"
import {GoogleOAuthProvider} from '@react-oauth/google'
import PreventPages from './components/PreventPages'
import Not_found from './components/Not_found'
function App() {
  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  let GoogleAuthWrapper = () => (
    <GoogleOAuthProvider clientId='101583258339-do78ls11ul37i2uf5drpp6sigkvksmjq.apps.googleusercontent.com'>
      <Login />
    </GoogleOAuthProvider>
  )

  let GoogleAuthSign = () => (
    <GoogleOAuthProvider clientId='101583258339-do78ls11ul37i2uf5drpp6sigkvksmjq.apps.googleusercontent.com'>
      <SignIn />
    </GoogleOAuthProvider>
  )

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/generate" element={<Generate />} />
        <Route path="/login" element={<GoogleAuthWrapper />} />
        <Route path="/signup" element={<GoogleAuthSign />} />
        <Route path="/dashboard" element={<PreventPages><Dashboard /></PreventPages>} />
        <Route path="*" element={<Not_found/>}/>
      </Routes>
    </Layout>
  )
}

export default App