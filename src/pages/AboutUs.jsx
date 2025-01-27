import React from 'react';
import { motion } from 'framer-motion';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import './AboutUs.css';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, LineChart, Line } from 'recharts';

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Creative Director",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400&h=400&sat=-100",
      bio: "Sarah brings 10+ years of fashion expertise to our team. She specializes in AI-driven design and has previously worked with top fashion houses in Paris and New York."
    },
    {
      name: "Michael Chen",
      role: "AI Lead Engineer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400&sat=-100",
      bio: "PhD in AI from MIT, Michael has developed multiple successful AI models. His research in computer vision has been published in leading journals."
    },
    {
      name: "Emma Rodriguez",
      role: "Fashion Technology Expert",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400&sat=-100",
      bio: "Former tech lead at Fashion Corp, Emma has revolutionized digital fashion with her innovative virtual try-on solutions and 3D modeling expertise."
    },
    {
      name: "Alex Thompson",
      role: "UI/UX Designer",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=400&sat=-100",
      bio: "Award-winning designer with focus on user experience. Alex has designed interfaces for major fashion platforms, reaching millions of users globally."
    }
  ];

  const marketData = [
    { quarter: 'Q1 2023', efficiency: 20, satisfaction: 30, label: 'Launch' },
    { quarter: 'Q2 2023', efficiency: 40, satisfaction: 45, label: 'Growth' },
    { quarter: 'Q3 2023', efficiency: 55, satisfaction: 60, label: 'Expansion' },
    { quarter: 'Q4 2023', efficiency: 75, satisfaction: 85, label: 'Current' }
  ];

  return (
    <ParallaxProvider>
      <div className="about-container">
        {/* Hero Section */}
        <motion.section 
          className="hero-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="hero-content">
            <div className="hero-grid">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="hero-text"
              >
                <h1>Revolutionizing Fashion Design</h1>
                <p className="subtitle">Where Artificial Intelligence Meets Fashion Innovation</p>
                <p className="hero-description">
                  Transform your fashion ideas into reality with our AI-powered platform. 
                  Upload models, design garments, and create stunning outfits instantly.
                </p>
                <motion.button 
                  className="hero-cta"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Creating
                </motion.button>
              </motion.div>
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="hero-image-magazine"
              >
                <img 
                  src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&q=80&w=1000&h=1000&sat=-100"
                  alt="Fashion AI"
                  className="hero-image"
                />
                <div className="magazine-overlay"></div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Mission Section with updated styling */}
        <section className="mission-section">
          <motion.div className="mission-content">
            <h2 className="section-title">Our Mission</h2>
            <div className="mission-underline"></div>
            <p className="mission-text">
              We're revolutionizing the fashion industry by bridging the gap between imagination and reality. 
              Our AI-powered platform enables anyone to bring their fashion ideas to life with just a few clicks.
              Through cutting-edge technology, we're making fashion design accessible to everyone while promoting 
              sustainability and reducing waste in the industry.
            </p>
          </motion.div>
        </section>

        {/* Value Proposition Section */}
        <section className="value-section">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="value-content"
          >
            <h2 className="section-title">Transforming the Fashion Industry</h2>
            <p className="section-subtitle">Revolutionizing every aspect of the fashion ecosystem</p>
            <div className="value-grid">
              <motion.div 
                className="value-item"
                whileHover={{ scale: 1.02 }}
              >
                <div className="value-item-header">
                  <span className="value-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 7L12 3L4 7M20 7L12 11M20 7V17L12 21M12 11L4 7M12 11V21M4 7V17L12 21"/>
                    </svg>
                  </span>
                  <h3>For Designers</h3>
                </div>
                <ul className="value-list">
                  <li>Streamline your design process</li>
                  <li>Experiment with unlimited variations</li>
                  <li>Reduce production costs significantly</li>
                  <li>Instant visualization of concepts</li>
                </ul>
              </motion.div>
              <motion.div 
                className="value-item"
                whileHover={{ scale: 1.02 }}
              >
                <div className="value-item-header">
                  <span className="value-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 3h18v18H3zM21 9H3M21 15H3M12 3v18"/>
                    </svg>
                  </span>
                  <h3>For Retailers</h3>
                </div>
                <ul className="value-list">
                  <li>Test market response before production</li>
                  <li>Personalize offerings for customers</li>
                  <li>Minimize inventory risks</li>
                  <li>Data-driven design decisions</li>
                </ul>
              </motion.div>
              <motion.div 
                className="value-item"
                whileHover={{ scale: 1.02 }}
              >
                <div className="value-item-header">
                  <span className="value-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="8" r="5"/>
                      <path d="M20 21v-2a7 7 0 0 0-14 0v2"/>
                    </svg>
                  </span>
                  <h3>For Consumers</h3>
                </div>
                <ul className="value-list">
                  <li>Experience personalized fashion</li>
                  <li>Visualize before purchase</li>
                  <li>Perfect-fitting garments</li>
                  <li>Participate in design process</li>
                </ul>
              </motion.div>
            </div>
          </motion.div>
    </section>

        {/* Features Section with new styling */}
        <section className="features-section">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="features-content"
          >
            <h2 className="section-title">Key Features</h2>
            <p className="section-subtitle">Innovative tools for the future of fashion</p>
            <div className="features-grid">
              {[
                {
                  title: "Custom Models",
                  description: "Upload your photos or choose from our diverse model collection"
                },
                {
                  title: "AI Generation",
                  description: "Transform your ideas into stunning garment designs with AI"
                },
                {
                  title: "Virtual Try-On",
                  description: "See how outfits look on different models instantly"
                },
                {
                  title: "Prompt-Based Design",
                  description: "Describe your dream outfit and watch it come to life"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="feature-card"
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Market Impact Section with enhanced content */}
        <section className="impact-section">
          <motion.div className="impact-content">
            <h2 className="section-title">Market Impact</h2>
            <p className="section-subtitle">Our Growth Journey in 2023</p>
            
            <div className="impact-description">
              <p>Since our launch in early 2023, we've achieved remarkable growth and impact in the fashion industry. 
              Our platform has helped designers reduce their production time by 40%, while increasing customer satisfaction 
              to an impressive 85%. Here's how we've grown:</p>
            </div>

            <div className="impact-visualization">
              <div className="graph-legend">
                <div className="legend-item">
                  <span className="legend-color white"></span>
                  <p>Platform Efficiency</p>
                </div>
                <div className="legend-item">
                  <span className="legend-color gray"></span>
                  <p>User Satisfaction</p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={marketData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <XAxis dataKey="quarter" stroke="#fff" />
                  <YAxis stroke="#fff" label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft', fill: '#fff' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111', border: 'none' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="efficiency" 
                    stroke="#fff" 
                    strokeWidth={2} 
                    name="Platform Efficiency"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="satisfaction" 
                    stroke="#888" 
                    strokeWidth={2} 
                    name="User Satisfaction"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="impact-stats-grid">
              <div className="impact-stat">
                <div className="stat-circle">
                  <h3>40%</h3>
                </div>
                <p>Reduction in Design Time</p>
              </div>
              <div className="impact-stat">
                <div className="stat-circle">
                  <h3>60%</h3>
                </div>
                <p>Lower Production Costs</p>
              </div>
              <div className="impact-stat">
                <div className="stat-circle">
                  <h3>85%</h3>
                </div>
                <p>Customer Satisfaction</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Team Section */}
        <section className="team-section">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="team-content"
          >
            <h2>Meet Our Team</h2>
            <div className="team-underline"></div>
            <p className="team-intro">Passionate experts bringing innovation to fashion</p>
            <div className="team-grid">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  className="team-member"
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="member-image-container">
                    <img src={member.image} alt={member.name} className="member-image" />
                    <div className="member-bio">
                      <p>{member.bio}</p>
                    </div>
                  </div>
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Final CTA Section */}
        <Parallax translateY={[-15, 15]}>
          <section className="cta-section">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2>Ready to Transform Your Fashion Ideas?</h2>
              <p>Join us in reshaping the future of fashion design</p>
              <button className="cta-button">Get Started</button>
            </motion.div>
          </section>
        </Parallax>
      </div>
    </ParallaxProvider>
  );
};

export default AboutUs;