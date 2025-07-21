import React, { useEffect, useState } from 'react'
import '../styles/landing.css'
import { useNavigate } from 'react-router-dom'
import { 
  FaRocket, 
  FaUsers, 
  FaHandshake, 
  FaShieldAlt, 
  FaStar, 
  FaArrowRight,
  FaSearch,
  FaCode,
  FaPalette,
  FaPenNib,
  FaChartLine,
  FaGlobe,
  FaMobile,
  FaLaptop,
  FaCamera,
  FaMicrophone
} from 'react-icons/fa'
import { MdWork, MdSecurity, MdSpeed, MdSupport } from 'react-icons/md'

const Landing = () => {
  const navigate = useNavigate();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("usertype") === 'freelancer') {
      navigate("/freelancer")
    } else if (localStorage.getItem("usertype") === 'client') {
      navigate("/client")
    } else if (localStorage.getItem("usertype") === 'admin') {
      navigate("/admin")
    }
  }, [navigate])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const categories = [
    { icon: <FaCode />, title: "Web Development", count: "2,500+ projects" },
    { icon: <FaPalette />, title: "Graphic Design", count: "1,800+ projects" },
    { icon: <FaPenNib />, title: "Content Writing", count: "3,200+ projects" },
    { icon: <FaMobile />, title: "Mobile Development", count: "1,200+ projects" },
    { icon: <FaChartLine />, title: "Digital Marketing", count: "2,100+ projects" },
    { icon: <FaGlobe />, title: "Translation", count: "900+ projects" },
    { icon: <FaCamera />, title: "Photography", count: "600+ projects" },
    { icon: <FaMicrophone />, title: "Voice Over", count: "400+ projects" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Web Developer",
      text: "FreeLancer has transformed my career. I've completed over 50 projects and earned more than I ever did in my 9-5 job.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Michael Chen",
      role: "Client",
      text: "Finding talented freelancers has never been easier. The quality of work and professionalism exceeded my expectations.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Emily Rodriguez",
      role: "Graphic Designer",
      text: "The platform is intuitive and the payment system is secure. I've built lasting relationships with amazing clients.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const stats = [
    { number: "50K+", label: "Active Freelancers" },
    { number: "100K+", label: "Completed Projects" },
    { number: "$10M+", label: "Total Earnings" },
    { number: "95%", label: "Satisfaction Rate" }
  ];

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <div className="landing-hero">
        <div className='landing-nav'>
          <div className="nav-brand">
            <FaRocket className="brand-icon" />
            <h3>FreeLancer</h3>
          </div>
          <div className="nav-actions">
            <button className="nav-btn-secondary" onClick={() => navigate('/authenticate')}>Sign In</button>
            <button className="nav-btn-primary" onClick={() => navigate('/authenticate')}>Get Started</button>
          </div>
        </div>

        <div className="landing-hero-content">
          <div className="hero-text">
            <h1>Find the Perfect <span className="gradient-text">Freelance</span> Services</h1>
            <p>Connect with talented freelancers and get your projects done. From web development to graphic design, find the perfect match for your needs.</p>
            <div className="hero-actions">
              <button className="hero-btn-primary" onClick={() => navigate('/authenticate')}>
                Start Hiring <FaArrowRight />
              </button>
              <button className="hero-btn-secondary" onClick={() => navigate('/authenticate')}>
                Become a Freelancer
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-card card-1">
              <FaUsers />
              <span>50K+ Freelancers</span>
            </div>
            <div className="floating-card card-2">
              <FaHandshake />
              <span>100K+ Projects</span>
            </div>
            <div className="floating-card card-3">
              <FaStar />
              <span>4.9/5 Rating</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <div className="container">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <h3>{stat.number}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2>Popular Categories</h2>
            <p>Find the perfect freelancer for your project</p>
          </div>
          <div className="categories-grid">
            {categories.map((category, index) => (
              <div key={index} className="category-card">
                <div className="category-icon">{category.icon}</div>
                <h4>{category.title}</h4>
                <p>{category.count}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose FreeLancer?</h2>
            <p>Everything you need to succeed in the freelance world</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <MdSecurity className="feature-icon" />
              <h4>Secure Payments</h4>
              <p>Your payments are protected with our secure escrow system</p>
            </div>
            <div className="feature-card">
              <MdSpeed className="feature-icon" />
              <h4>Fast Delivery</h4>
              <p>Get your projects completed quickly with our efficient workflow</p>
            </div>
            <div className="feature-card">
              <FaShieldAlt className="feature-icon" />
              <h4>Quality Guarantee</h4>
              <p>We ensure high-quality work with our satisfaction guarantee</p>
            </div>
            <div className="feature-card">
              <MdSupport className="feature-icon" />
              <h4>24/7 Support</h4>
              <p>Get help whenever you need it with our round-the-clock support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2>What Our Users Say</h2>
            <p>Real stories from our community</p>
          </div>
          <div className="testimonials-container">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className={`testimonial-card ${index === currentTestimonial ? 'active' : ''}`}
              >
                <div className="testimonial-content">
                  <div className="stars">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="star" />
                    ))}
                  </div>
                  <p>"{testimonial.text}"</p>
                  <div className="testimonial-author">
                    <img src={testimonial.avatar} alt={testimonial.name} />
                    <div>
                      <h5>{testimonial.name}</h5>
                      <span>{testimonial.role}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="testimonial-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentTestimonial ? 'active' : ''}`}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <div className="container">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of freelancers and clients who trust FreeLancer</p>
          <div className="cta-buttons">
            <button className="cta-btn-primary" onClick={() => navigate('/authenticate')}>
              Start Your Journey
            </button>
            <button className="cta-btn-secondary" onClick={() => navigate('/authenticate')}>
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <FaRocket className="brand-icon" />
              <h3>FreeLancer</h3>
              <p>Connecting talent with opportunity</p>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>For Freelancers</h4>
                <a href="#find-work">Find Work</a>
                <a href="#create-profile">Create Profile</a>
                <a href="#earn-money">Earn Money</a>
              </div>
              <div className="footer-column">
                <h4>For Clients</h4>
                <a href="#hire-talent">Hire Talent</a>
                <a href="#post-project">Post Project</a>
                <a href="#manage-projects">Manage Projects</a>
              </div>
              <div className="footer-column">
                <h4>Company</h4>
                <a href="#about">About Us</a>
                <a href="#careers">Careers</a>
                <a href="#contact">Contact</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 FreeLancer. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing