import React, { useState } from 'react';
import ProductList from './test15';

interface UserProfileCardProps {
  userName: string;
  lastLogin: string;
  userPreferences: { theme: string; notifications: boolean };
}

const UserProfileCard: React.FC<UserProfileCardProps> = React.memo(({ userName, lastLogin, userPreferences }) => {
  console.log(`UserProfileCard re-rendering for ${userName}`);
  return (
    <div className="user-profile-card">
      <h3>Welcome, {userName}!</h3>
      <p>Last login: {lastLogin}</p>
      <p>Theme: {userPreferences.theme}</p>
      <p>Notifications: {userPreferences.notifications ? 'Enabled' : 'Disabled'}</p>
    </div>
  );
});

interface SettingsButtonProps {
  buttonAction: () => void;
  label: string;
}

const SettingsButton: React.FC<SettingsButtonProps> = React.memo(({ buttonAction, label }) => {
  console.log(`SettingsButton re-rendering: ${label}`);
  return <button onClick={buttonAction}>{label}</button>;
});

const initialProducts = [
  { id: 'p1', name: 'Laptop Pro', price: 1200, category: 'Electronics', weightInKg: 2 },
  { id: 'p2', name: 'Desk Chair Ergo', price: 350, category: 'Furniture', weightInKg: 15 },
  { id: 'p3', name: 'Wireless Mouse', price: 25, category: 'Electronics', weightInKg: 0.1 },
  { id: 'p4', name: 'Coffee Mug', price: 15, category: 'Kitchen', weightInKg: 0.5 },
];

const DashboardOverview: React.FC = () => {
  const [refreshCount, setRefreshCount] = useState(0);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);

  const currentUserPreferences = {
    theme: 'light',
    notifications: true,
  };

  const handleToggleSettings = () => {
    setShowAdvancedSettings(prev => !prev);
  };

  const handleRefreshDashboard = () => {
    setRefreshCount(prev => prev + 1);
  };

  return (
    <div className="dashboard-overview-page">
      <h1>Dashboard Overview (Refresh: {refreshCount})</h1>

      <div className="dashboard-header">
        <UserProfileCard
          userName="Jane Doe"
          lastLogin="2023-10-26 10:30 AM"
          userPreferences={currentUserPreferences}
        />
        <SettingsButton
          label={showAdvancedSettings ? 'Hide Settings' : 'Show Settings'}
          buttonAction={handleToggleSettings}
        />
        <button onClick={handleRefreshDashboard}>Refresh Dashboard</button>
      </div>

      <ProductList products={initialProducts} filterCategory="Electronics" />

      {showAdvancedSettings && (
        <div className="advanced-settings">
          <h3>Advanced Options</h3>
          <p>More settings here...</p>
        </div>
      )}
      <style jsx>{`
        .dashboard-overview-page { padding: 30px; text-align: center; }
        .dashboard-header {
          display: flex; justify-content: space-around; align-items: center;
          margin-bottom: 40px; background-color: #f0f0f0; padding: 20px;
          border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }
        .user-profile-card {
          border: 1px solid #ddd; padding: 15px; border-radius: 5px;
          background-color: #fff;
        }
        .advanced-settings {
          margin-top: 30px; padding: 20px; border: 1px dashed #ccc;
          background-color: #fdfdfd; border-radius: 8px;
        }
        button {
          background-color: #28a745; color: white; border: none;
          padding: 10px 20px; border-radius: 5px; cursor: pointer;
          margin-left: 10px;
        }
      `}</style>
    </div>
  );
};

export default DashboardOverview;
