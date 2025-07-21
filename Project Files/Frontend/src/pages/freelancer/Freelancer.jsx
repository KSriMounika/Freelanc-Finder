import React, { useEffect, useState } from 'react'
import '../../styles/freelancer/freelancer.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  FaCode, 
  FaCheckCircle, 
  FaClock, 
  FaDollarSign, 
  FaEdit, 
  FaSave, 
  FaTimes,
  FaStar,
  FaChartLine,
  FaTrophy,
  FaUserTie,
  FaCalendarAlt,
  FaBell,
  FaSearch
} from 'react-icons/fa';

const Freelancer = () => {
  const [isDataUpdateOpen, setIsDataUpdateOpen] = useState(false);
  const navigate = useNavigate();
  const [freelancerData, setFreelancerData] = useState();
  const [skills, setSkills] = useState([]);
  const [description, setDescription] = useState('');
  const [freelancerId, setFreelancerId] = useState('');
  const [updateSkills, setUpdateSkills] = useState('');
  const [updateDescription, setUpdateDescription] = useState('');
  const [applicationsCount, setApplicationsCount] = useState([]);
  const [recentProjects, setRecentProjects] = useState([]);
  const [earnings, setEarnings] = useState({
    thisMonth: 0,
    lastMonth: 0,
    total: 0
  });

  useEffect(() => {
    fetchUserData(localStorage.getItem('userId'));
    fetchApplications();
    fetchRecentProjects();
    calculateEarnings();
  }, []);

  const fetchUserData = async(id) => {
    try {
      const response = await axios.get(`http://localhost:6001/fetch-freelancer/${id}`);
      setFreelancerData(response.data);
      if(response.data) {
        setFreelancerId(response.data._id);
        setSkills(response.data.skills);
        setDescription(response.data.description);
        setUpdateSkills(response.data.skills);
        setUpdateDescription(response.data.description);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const updateUserData = async() => {
    try {
      await axios.post(`http://localhost:6001/update-freelancer`, {
        freelancerId, 
        updateSkills: updateSkills, 
        description: updateDescription
      });
      fetchUserData();
      setIsDataUpdateOpen(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error('Error updating user data:', error);
      alert("Failed to update profile");
    }
  };

  const fetchApplications = async() => {
    try {
      const response = await axios.get("http://localhost:6001/fetch-applications");
      const userApplications = response.data.filter(
        (application) => application.freelancerId === localStorage.getItem('userId')
      );
      setApplicationsCount(userApplications);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const fetchRecentProjects = async() => {
    try {
      const response = await axios.get("http://localhost:6001/fetch-projects");
      const userProjects = response.data.filter(
        (project) => project.freelancerId === localStorage.getItem('userId')
      );
      setRecentProjects(userProjects.slice(0, 5)); // Get last 5 projects
    } catch (error) {
      console.error('Error fetching recent projects:', error);
    }
  };

  const calculateEarnings = () => {
    // Mock earnings calculation - replace with actual API call
    setEarnings({
      thisMonth: 2500,
      lastMonth: 3200,
      total: freelancerData?.funds || 0
    });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return '#10b981';
      case 'In Progress': return '#3b82f6';
      case 'Pending': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  return (
    <>
      {freelancerData ? (
        <div className="freelancer-dashboard">
          {/* Header Section */}
          <div className="dashboard-header">
            <div className="header-content">
              <h1>Welcome back, {localStorage.getItem('username')}! 👋</h1>
              <p>Here's what's happening with your freelance career</p>
            </div>
            <div className="header-actions">
              <button className="search-btn">
                <FaSearch />
                <span>Find Projects</span>
              </button>
              <button className="notification-btn">
                <FaBell />
                <span className="notification-dot"></span>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon current">
                <FaCode />
              </div>
              <div className="stat-content">
                <h3>{freelancerData.currentProjects.length}</h3>
                <p>Current Projects</p>
                <button onClick={() => navigate('/my-projects')}>View All</button>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon completed">
                <FaCheckCircle />
              </div>
              <div className="stat-content">
                <h3>{freelancerData.completedProjects.length}</h3>
                <p>Completed Projects</p>
                <button onClick={() => navigate('/my-projects')}>View All</button>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon applications">
                <FaClock />
              </div>
              <div className="stat-content">
                <h3>{applicationsCount.length}</h3>
                <p>Active Applications</p>
                <button onClick={() => navigate('/myApplications')}>View All</button>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon earnings">
                <FaDollarSign />
              </div>
              <div className="stat-content">
                <h3>₹{freelancerData.funds.toLocaleString()}</h3>
                <p>Available Balance</p>
                <button>Withdraw</button>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="dashboard-grid">
            {/* Profile Section */}
            <div className="profile-section">
              <div className="section-header">
                <h2>Profile Overview</h2>
                <button 
                  className="edit-btn"
                  onClick={() => setIsDataUpdateOpen(!isDataUpdateOpen)}
                >
                  {isDataUpdateOpen ? <FaTimes /> : <FaEdit />}
                  {isDataUpdateOpen ? 'Cancel' : 'Edit'}
                </button>
              </div>

              {!isDataUpdateOpen ? (
                <div className="profile-content">
                  <div className="profile-item">
                    <h4>Skills</h4>
                    <div className="skills-container">
                      {skills.length > 0 ? (
                        skills.map((skill, index) => (
                          <span key={index} className="skill-tag">{skill}</span>
                        ))
                      ) : (
                        <p className="no-data">No skills added yet</p>
                      )}
                    </div>
                  </div>

                  <div className="profile-item">
                    <h4>Description</h4>
                    <p className="description">
                      {description || "No description available. Add a description to showcase your expertise."}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="profile-edit">
                  <div className="form-group">
                    <label>Skills (comma separated)</label>
                    <input
                      type="text"
                      value={updateSkills}
                      onChange={(e) => setUpdateSkills(e.target.value)}
                      placeholder="e.g., React, Node.js, Python"
                    />
                  </div>

                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      value={updateDescription}
                      onChange={(e) => setUpdateDescription(e.target.value)}
                      placeholder="Tell clients about your experience and expertise..."
                      rows="4"
                    />
                  </div>

                  <div className="form-actions">
                    <button className="save-btn" onClick={updateUserData}>
                      <FaSave />
                      Save Changes
                    </button>
                    <button className="cancel-btn" onClick={() => setIsDataUpdateOpen(false)}>
                      <FaTimes />
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Recent Projects */}
            <div className="recent-projects">
              <div className="section-header">
                <h2>Recent Projects</h2>
                <button onClick={() => navigate('/my-projects')}>View All</button>
              </div>

              <div className="projects-list">
                {recentProjects.length > 0 ? (
                  recentProjects.map((project, index) => (
                    <div key={index} className="project-item">
                      <div className="project-info">
                        <h4>{project.title}</h4>
                        <p>{project.description.substring(0, 60)}...</p>
                        <div className="project-meta">
                          <span className="budget">₹{project.budget}</span>
                          <span 
                            className="status"
                            style={{ color: getStatusColor(project.status) }}
                          >
                            {project.status}
                          </span>
                        </div>
                      </div>
                      <div className="project-actions">
                        <button onClick={() => navigate(`/project/${project._id}`)}>
                          View Details
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-projects">
                    <FaUserTie />
                    <h3>No projects yet</h3>
                    <p>Start by applying to projects that match your skills</p>
                    <button onClick={() => navigate('/all-projects')}>
                      Browse Projects
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Earnings Overview */}
            <div className="earnings-overview">
              <div className="section-header">
                <h2>Earnings Overview</h2>
                <FaChartLine />
              </div>

              <div className="earnings-stats">
                <div className="earning-item">
                  <div className="earning-label">This Month</div>
                  <div className="earning-amount">₹{earnings.thisMonth.toLocaleString()}</div>
                  <div className="earning-change positive">+12.5%</div>
                </div>

                <div className="earning-item">
                  <div className="earning-label">Last Month</div>
                  <div className="earning-amount">₹{earnings.lastMonth.toLocaleString()}</div>
                  <div className="earning-change negative">-3.2%</div>
                </div>

                <div className="earning-item">
                  <div className="earning-label">Total Earnings</div>
                  <div className="earning-amount">₹{earnings.total.toLocaleString()}</div>
                  <div className="earning-change positive">+8.7%</div>
                </div>
              </div>

              <div className="earnings-actions">
                <button className="withdraw-btn">Withdraw Funds</button>
                <button className="history-btn">View History</button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions">
              <div className="section-header">
                <h2>Quick Actions</h2>
              </div>

              <div className="actions-grid">
                <button className="action-btn" onClick={() => navigate('/all-projects')}>
                  <FaSearch />
                  <span>Find Projects</span>
                </button>

                <button className="action-btn" onClick={() => navigate('/myApplications')}>
                  <FaClock />
                  <span>My Applications</span>
                </button>

                <button className="action-btn" onClick={() => navigate('/my-projects')}>
                  <FaTrophy />
                  <span>My Projects</span>
                </button>

                <button className="action-btn">
                  <FaCalendarAlt />
                  <span>Schedule</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading your dashboard...</p>
        </div>
      )}
    </>
  );
};

export default Freelancer;