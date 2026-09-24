import React, { useState, useEffect } from 'react';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  lastLogin: string;
}

const UserProfileCard: React.FC<{ userId: string }> = ({ userId }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const cardContainerStyle: React.CSSProperties = {
    maxWidth: '400px',
    margin: '30px auto',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.15)',
    backgroundColor: '#fdfdfd',
    fontFamily: 'Verdana, sans-serif',
    border: '1px solid #e0e0e0',
  };

  const headerTextStyle: React.CSSProperties = {
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: '20px',
    borderBottom: '1px solid #eee',
    paddingBottom: '10px',
  };

  useEffect(() => {
    setTimeout(() => {
      setUserData({
        id: userId,
        name: `John Doe (${userId.substring(0, 4)})`,
        email: `john.doe.${userId.substring(0, 4)}@example.com`,
        role: 'Administrator',
        status: userId === 'user007' ? 'inactive' : 'active',
        lastLogin: new Date().toLocaleString(),
      });
      setLoading(false);
    }, 800);
  }, [userId]);

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
        Loading user profile...
      </div>
    );
  }

  if (!userData) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
        User not found.
      </div>
    );
  }

  const statusBadgeStyle: React.CSSProperties = {
    display: 'inline-block',
    padding: '5px 10px',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '0.9em',
    color: 'white',
    backgroundColor: userData.status === 'active' ? '#28a745' : userData.status === 'inactive' ? '#dc3545' : '#ffc107',
    marginLeft: '10px',
  };

  return (
    <div style={cardContainerStyle}>
      <h2 style={headerTextStyle}>User Profile</h2>

      <div style={{ marginBottom: '15px', borderBottom: '1px dotted #e9ecef', paddingBottom: '10px' }}>
        <p style={{ fontWeight: 'bold', color: '#34495e' }}>Name: <span style={{ color: '#555' }}>{userData.name}</span></p>
        <p style={{ color: '#555' }}>Email: <a href={`mailto:${userData.email}`} style={{ color: '#007bff', textDecoration: 'none' }}>{userData.email}</a></p>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <p style={{ fontSize: '0.95em', color: '#666' }}>Role: <span style={{ fontWeight: '600', color: '#444' }}>{userData.role}</span></p>
        <p style={{ fontSize: '0.95em', color: '#666' }}>
          Status: <span style={statusBadgeStyle}>{userData.status.toUpperCase()}</span>
        </p>
        <p style={{ fontSize: '0.95em', color: '#666' }}>Last Login: <span style={{ fontStyle: 'italic' }}>{userData.lastLogin}</span></p>
      </div>

      <div style={{ textAlign: 'center', marginTop: '25px', paddingTop: '15px', borderTop: '1px solid #f0f0f0' }}>
        <button
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1em',
            transition: 'background-color 0.3s ease',
          }}
          onClick={() => alert(`Editing profile for ${userData.name}`)}
        >
          Edit Profile
        </button>
        <button
            style={{
                backgroundColor: '#dc3545',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '1em',
                transition: 'background-color 0.3s ease',
                marginLeft: '10px',
            }}
            onClick={() => console.log('Deleting user...')}
        >
            Delete User
        </button>
      </div>
    </div>
  );
};

export default UserProfileCard;
