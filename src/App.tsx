import React, { useState } from 'react';
import './App.css';

interface Screen {
  [key: string]: JSX.Element;
}

function App() {
  const [activeScreen, setActiveScreen] = useState('login');

  const screens: Screen = {
    login: (
      <div className="demo-form">
        <h3>🔐 Login Screen</h3>
        <input type="email" className="demo-input" placeholder="Email Address" defaultValue="demo@supportbridge.com" />
        <input type="password" className="demo-input" placeholder="Password" defaultValue="••••••••" />
        <button className="demo-btn">Sign In</button>
        <p style={{ textAlign: 'center', margin: '15px 0' }}>
          <a href="#" onClick={() => setActiveScreen('signup')}>Don't have an account? Sign Up</a>
        </p>
        <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
          <p>✅ Secure authentication</p>
          <p>✅ Social login options</p>
          <p>✅ Password recovery</p>
        </div>
      </div>
    ),
    home: (
      <div>
        <h3>🏠 Home Dashboard</h3>
        <ul className="feature-list">
          <li>💰 <strong>Total Donations:</strong> $125,450</li>
          <li>🎯 <strong>Active Campaigns:</strong> 23</li>
          <li>👥 <strong>Donors:</strong> 1,247</li>
          <li>🏆 <strong>Success Rate:</strong> 89%</li>
        </ul>
        <div style={{ marginTop: '20px' }}>
          <h4>📊 Recent Activity</h4>
          <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px', margin: '10px 0' }}>
            <p>🎉 <strong>John D.</strong> donated $500 to "Help Build School"</p>
            <small style={{ color: '#666' }}>2 minutes ago</small>
          </div>
          <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px', margin: '10px 0' }}>
            <p>📝 <strong>Sarah M.</strong> created new campaign "Medical Fund"</p>
            <small style={{ color: '#666' }}>1 hour ago</small>
          </div>
        </div>
      </div>
    ),
    donate: (
      <div>
        <h3>💰 Make a Donation</h3>
        <div className="demo-form">
          <label>Select Campaign:</label>
          <select className="demo-input">
            <option>🏥 Emergency Medical Fund - $2,340 raised</option>
            <option>🏫 Build Community School - $15,670 raised</option>
            <option>🌍 Clean Water Project - $8,920 raised</option>
          </select>
          
          <label>Donation Amount:</label>
          <div style={{ display: 'flex', gap: '10px', margin: '10px 0' }}>
            <button className="nav-btn">$25</button>
            <button className="nav-btn">$50</button>
            <button className="nav-btn active">$100</button>
            <button className="nav-btn">$250</button>
          </div>
          <input type="number" className="demo-input" placeholder="Custom amount" defaultValue="100" />
          
          <button className="demo-btn">💳 Donate Now</button>
        </div>
        <div style={{ fontSize: '14px', color: '#666', marginTop: '15px' }}>
          <p>✅ Secure payment processing</p>
          <p>✅ Tax-deductible receipts</p>
          <p>✅ 100% goes to the cause</p>
        </div>
      </div>
    ),
    profile: (
      <div>
        <h3>👤 User Profile</h3>
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <div style={{ width: '80px', height: '80px', background: '#667eea', borderRadius: '50%', margin: '0 auto 15px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '24px' }}>👤</div>
          <h4>Demo User</h4>
          <p style={{ color: '#666' }}>demo@supportbridge.com</p>
        </div>
        
        <ul className="feature-list">
          <li>💝 <strong>Total Donated:</strong> $2,450</li>
          <li>🎯 <strong>Campaigns Supported:</strong> 12</li>
          <li>🏆 <strong>Member Since:</strong> January 2024</li>
          <li>⭐ <strong>Impact Score:</strong> 95/100</li>
        </ul>
        
        <div style={{ marginTop: '20px' }}>
          <button className="demo-btn">✏️ Edit Profile</button>
          <button className="demo-btn" style={{ background: '#e53e3e' }}>🔒 Account Settings</button>
        </div>
      </div>
    ),
    fundraise: (
      <div>
        <h3>🎯 Create Fundraiser</h3>
        <div className="demo-form">
          <input type="text" className="demo-input" placeholder="Campaign Title" defaultValue="Help Build Community Garden" />
          <textarea className="demo-input" rows={3} placeholder="Tell your story...">We need your help to build a community garden that will provide fresh vegetables for families in need...</textarea>
          <input type="number" className="demo-input" placeholder="Goal Amount ($)" defaultValue="5000" />
          
          <label>Category:</label>
          <select className="demo-input">
            <option>🌱 Environment</option>
            <option>🏥 Medical</option>
            <option>🎓 Education</option>
            <option>🏠 Community</option>
          </select>
          
          <button className="demo-btn">📸 Add Photos</button>
          <button className="demo-btn">🚀 Launch Campaign</button>
        </div>
        
        <div style={{ fontSize: '14px', color: '#666', marginTop: '15px' }}>
          <p>✅ Easy campaign creation</p>
          <p>✅ Social media integration</p>
          <p>✅ Real-time progress tracking</p>
        </div>
      </div>
    )
  };

  return (
    <div className="App">
      <div className="status">🟢 LIVE DEMO</div>
      
      <div className="phone">
        <div className="screen">
          <div className="header">
            <div className="logo">🤝 SupportBridge</div>
            <div>Donation & Fundraising Platform</div>
          </div>
          
          <div className="screen-nav">
            <button 
              className={`nav-btn ${activeScreen === 'login' ? 'active' : ''}`} 
              onClick={() => setActiveScreen('login')}
            >
              Login
            </button>
            <button 
              className={`nav-btn ${activeScreen === 'home' ? 'active' : ''}`} 
              onClick={() => setActiveScreen('home')}
            >
              Home
            </button>
            <button 
              className={`nav-btn ${activeScreen === 'donate' ? 'active' : ''}`} 
              onClick={() => setActiveScreen('donate')}
            >
              Donate
            </button>
            <button 
              className={`nav-btn ${activeScreen === 'profile' ? 'active' : ''}`} 
              onClick={() => setActiveScreen('profile')}
            >
              Profile
            </button>
            <button 
              className={`nav-btn ${activeScreen === 'fundraise' ? 'active' : ''}`} 
              onClick={() => setActiveScreen('fundraise')}
            >
              Fundraise
            </button>
          </div>
          
          <div className="screen-content">
            {screens[activeScreen]}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;