import React, { useState, useEffect } from 'react'
import './style.css'
import Input from './ui/Input'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'
import { loginRoutes, googleAuth } from '../utils/userApi'
import { Link } from 'react-router-dom'
import { useGoogleLogin } from '@react-oauth/google'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Mail, Unlock, ArrowRight } from 'lucide-react';
import { Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  const toastOptions = {
    position: "top-right",
    draggable: true,
    pauseOnHover: true,
    autoClose: "5000",
    theme: "dark"
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validation = () => {
    if (!email) {
      toast.error("Email is required", toastOptions)
      return false;
    }
    if (!password) {
      toast.error("Password is required", toastOptions)
      return false;
    }
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email", toastOptions)
      return false;
    }
    return true;
  }
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (validation()) {
        const values = {
          email, password
        }
        const response = await axios.post(loginRoutes, values);
        if (!response.data.status) {
          return toast.error(response.data.msg, toastOptions)
        }
        localStorage.setItem("Details", JSON.stringify(response.data.data));
        navigate('/');
        //toast.success(response.data, toastOptions);
        setPassword("");
        setEmail("");
      }
    } catch (e) {
      console.error(e);
    }
  }
  const responseGoogle = async (authResult) => {

    try {
      if (authResult['code']) {

        const result = await googleAuth(authResult['code'])
        const { email, username, picture } = result.data.data
        localStorage.setItem("Details", JSON.stringify(result.data.data));
        navigate('/');
      }

    } catch (e) {
      console.error("Error occurs" + e);
    }
  }
  const GoogleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code"
  })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className="min-h-[90vh] bg-black flex items-center justify-center p-4   relative overflow-hidden mt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-black">
        {/* Monochrome Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at center, white 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        />

        {/* Monochrome Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-black/90" />
      </div>

      {/* Content Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
        style={{ perspective: 1000 }}
      >
        <motion.div
          className="relative"
          style={{ rotateX, rotateY }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Card Container with Hover Effect */}
          <div className="relative group">
            {/* Animated Border */}
            <div className="absolute -inset-[1px] bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded-2xl animate-border opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Monochrome Glow Effect */}
            <div className="absolute -inset-[1px] rounded-2xl bg-white/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Glass Card */}
            <div className="relative bg-zinc-900/40 backdrop-blur-2xl rounded-2xl p-8 sm:p-10 border border-white/[0.05] shadow-2xl">
              {/* Logo & Welcome */}
              <div className="text-center space-y-3 mb-10">
                {/* Animated Logo */}
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", duration: 0.8 }}
                  className="mx-auto w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center border border-white/[0.05] mb-6"
                >
                  <span className="text-xl font-bold text-white">S</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl sm:text-4xl font-bold text-white"
                >
                  Welcome Back
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-zinc-400 text-sm"
                >
                  Sign in to continue to StyleMe
                </motion.p>
              </div>

              {/* Form Section */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div className="space-y-4">
                  {/* Email Input with Enhanced Interaction */}
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`relative group ${focusedInput === 'email' ? 'z-10' : ''
                      }`}
                  >
                    <div className="absolute -inset-[0.5px] bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    <div className="absolute inset-0 rounded bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    <Input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocusedInput('email')}
                      onBlur={() => setFocusedInput(null)}
                      icon={<Mail className={`w-4 h-4 transition-colors duration-300 ${focusedInput === 'email' ? 'text-white' : 'text-zinc-400'
                        }`} />}
                      className="relative w-full bg-zinc-800/50 border-transparent focus:border-white/20 text-white placeholder:text-zinc-500 h-12 transition-all duration-300 group-hover:bg-zinc-800/70"
                    />
                  </motion.div>

                  {/* Password Input with Enhanced Interaction */}
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`relative group ${focusedInput === 'password' ? 'z-10' : ''
                      }`}
                  >
                    <div className="absolute -inset-[0.5px] bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    <div className="absolute inset-0 rounded bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocusedInput('password')}
                      onBlur={() => setFocusedInput(null)}
                      icon={showPassword ?
                        <Unlock className={`w-4 h-4 cursor-pointer transition-colors duration-300 ${focusedInput === 'password' ? 'text-white' : 'text-zinc-400'
                          }`} onClick={() => setShowPassword(false)} /> :
                        <Lock className={`w-4 h-4 cursor-pointer transition-colors duration-300 ${focusedInput === 'password' ? 'text-white' : 'text-zinc-400'
                          }`} onClick={() => setShowPassword(true)} />
                      }
                      className="relative w-full bg-zinc-800/50 border-transparent focus:border-white/20 text-white placeholder:text-zinc-500 h-12 transition-all duration-300 group-hover:bg-zinc-800/70"
                    />
                  </motion.div>
                </motion.div>

                {/* Sign In Button - Monochrome */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full relative group"
                >
                  <div className="absolute inset-0 bg-white/10 rounded blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative bg-white text-black font-medium h-12 rounded hover:bg-white/90 transition-all duration-300 flex items-center justify-center gap-2">
                    <AnimatePresence mode="wait">
                      {isLoading ? (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center justify-center"
                        >
                          <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        </motion.div>
                      ) : (
                        <motion.span
                          key="button-text"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center justify-center gap-2"
                        >
                          Sign In
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.button>

                {/* Divider - Monochrome */}
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 text-zinc-500 bg-zinc-900/40">
                      Or continue with
                    </span>
                  </div>
                </div>

                {/* Google Sign In - Monochrome */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => GoogleLogin()}
                  className="w-full relative group"
                >
                  <div className="absolute inset-0 bg-white/5 rounded blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative bg-zinc-900 text-white font-medium h-12 rounded hover:bg-zinc-800 border border-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-3">
                    <svg
                      className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z"
                      />
                    </svg>
                    <span className="text-zinc-300 group-hover:text-white transition-colors">
                      Sign in with Google
                    </span>
                  </div>
                </motion.button>

                {/* Footer Link - Monochrome */}
                <motion.p className="text-center text-sm text-zinc-400 mt-8">
                  Don't have an account?{' '}
                  <Link
                    to="/signup"
                    className="relative inline-block group"
                  >
                    <span className="relative z-10 text-white group-hover:text-zinc-300 transition-colors duration-300 font-medium">
                      Sign up
                    </span>
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300" />
                  </Link>
                </motion.p>
              </form>
            </div>
          </div>
        </motion.div>
      </motion.div>
      <ToastContainer />
    </div>
  )
}

export default Login