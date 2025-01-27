import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './Layout'

const Home = () => (
  <div className="min-h-[80vh] flex items-center justify-center">
    <h1 className="text-4xl font-bold text-white">Home Page</h1>
  </div>
);

const About = () => (
  <div className="min-h-[80vh] flex items-center justify-center">
    <h1 className="text-4xl font-bold text-white">About Page</h1>
  </div>
);

const Projects = () => (
  <div className="min-h-[80vh] flex items-center justify-center">
    <h1 className="text-4xl font-bold text-white">Projects Page</h1>
  </div>
);

const Resume = () => (
  <div className="min-h-[80vh] flex items-center justify-center">
    <h1 className="text-4xl font-bold text-white">Resume Page</h1>
  </div>
);

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/resume" element={<Resume />} />
      </Routes>
    </Layout>
  )
}

export default App