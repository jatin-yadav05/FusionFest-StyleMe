import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Mail, Lock, Unlock, ArrowRight, User } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Input from './ui/Input';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const navigate=useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

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

  const toastOptions = {
    position: "top-right",
    draggable: true,
    pauseOnHover: true,
    autoClose: 5000,
    theme: "dark"
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  const validation = () => {
    if (username.length <= 3) {
      toast.error("Username must be more than 3 characters", toastOptions);
      return false;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters", toastOptions);
      return false;
    }
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email", toastOptions);
      return false;
    }
    if (password !== cpassword) {
      toast.error("Passwords do not match", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (validation()) {
        const userData = {
          username,
          email,
          password
        }
        const response = await axios.post(registerRoutes, userData);
        if (!response.data.status) {
          return toast.error(response.data.msg, toastOptions)
        }
        navigate('/login');
        setUsername("");
        setCpassword("");
        setPassword("");
        setEmail("")
      }
    } catch (e) {
      console.error(e);
    }
  }
  const responseGoogle=async(authResult)=>{
    try{
      if(authResult['code']){

        const result=await googleAuth(authResult['code'])
        const {email,username,picture}=result.data.data
        localStorage.setItem("Details",JSON.stringify(result.data.data));
        navigate('/');
      }
    
    }catch(e){
      console.error("Error occurs"+e);
    }
}

  const GoogleSign = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code"
  });

  return (
    <div className="min-h-[85vh] bg-black flex items-center justify-center p-3 relative overflow-hidden mt-20">
      <div className="absolute inset-0 bg-black">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000" />
        
        <div className="absolute inset-0 opacity-[0.02]" 
          style={{
            backgroundImage: `radial-gradient(circle at center, white 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }} 
        />
        
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-black/90" />
      </div>

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
          <div className="relative group">
            <div className="absolute -inset-[1px] bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded-2xl animate-border opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="absolute -inset-[1px] rounded-2xl bg-white/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative bg-zinc-900/40 backdrop-blur-2xl rounded-2xl p-6 sm:p-8 border border-white/[0.05] shadow-2xl">
              <div className="text-center space-y-2 mb-6">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", duration: 0.8 }}
                  className="mx-auto w-10 h-10 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center border border-white/[0.05] mb-4"
                >
                  <span className="text-lg font-bold text-white">S</span>
                </motion.div>

                <motion.h1 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl sm:text-3xl font-bold text-white"
                >
                  Create Account
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-zinc-400 text-sm"
                >
                  Sign up to get started with StyleMe
                </motion.p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <motion.div className="space-y-3">
                  <InputField
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={setUsername}
                    icon={<User />}
                    focusedInput={focusedInput}
                    setFocusedInput={setFocusedInput}
                    inputId="username"
                  />

                  <InputField
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={setEmail}
                    icon={<Mail />}
                    focusedInput={focusedInput}
                    setFocusedInput={setFocusedInput}
                    inputId="email"
                  />

                  <InputField
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={setPassword}
                    icon={showPassword ? 
                      <Unlock onClick={() => setShowPassword(false)} /> : 
                      <Lock onClick={() => setShowPassword(true)} />
                    }
                    focusedInput={focusedInput}
                    setFocusedInput={setFocusedInput}
                    inputId="password"
                  />

                  <InputField
                    type="password"
                    placeholder="Confirm Password"
                    value={cpassword}
                    onChange={setCpassword}
                    icon={<Lock />}
                    focusedInput={focusedInput}
                    setFocusedInput={setFocusedInput}
                    inputId="cpassword"
                  />
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full relative group mt-4"
                >
                  <div className="absolute inset-0 bg-white/10 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative bg-white text-black font-medium h-12 rounded-lg hover:bg-white/90 transition-all duration-300 flex items-center justify-center gap-2">
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
                          Create Account
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 text-zinc-500 bg-zinc-900/40">
                      Or continue with
                    </span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => GoogleSign()}
                  className="w-full relative group"
                >
                  <div className="absolute inset-0 bg-white/5 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative bg-zinc-900 text-white font-medium h-12 rounded-lg hover:bg-zinc-800 border border-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-3">
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
                      Sign up with Google
                    </span>
                  </div>
                </motion.button>

                <motion.p className="text-center text-sm text-zinc-400 mt-6">
                  Already have an account?{' '}
                  <Link 
                    to="/login" 
                    className="relative inline-block group"
                  >
                    <span className="relative z-10 text-white group-hover:text-zinc-300 transition-colors duration-300 font-medium">
                      Sign in
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
  );
}

const InputField = ({ type, placeholder, value, onChange, icon, focusedInput, setFocusedInput, inputId }) => (
  <motion.div
    whileHover={{ scale: 1.01 }}
    whileTap={{ scale: 0.99 }}
    className={`relative group ${focusedInput === inputId ? 'z-10' : ''}`}
  >
    <div className="absolute -inset-[0.5px] bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300" />
    <div className="absolute inset-0 rounded-lg bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-all duration-300" />
    <Input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setFocusedInput(inputId)}
      onBlur={() => setFocusedInput(null)}
      icon={React.cloneElement(icon, {
        className: `w-4 h-4 transition-colors duration-300 ${
          focusedInput === inputId ? 'text-white' : 'text-zinc-400'
        } ${icon.props.onClick ? 'cursor-pointer' : ''}`
      })}
      className="relative w-full bg-zinc-800/50 border-transparent focus:border-white/20 text-white placeholder:text-zinc-500 h-12 transition-all duration-300 group-hover:bg-zinc-800/70"
    />
  </motion.div>
);

export default SignIn;