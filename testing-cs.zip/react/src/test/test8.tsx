import React, { useState, useEffect } from 'react';
import { useAuth } from './test4'; 
import { apiClient } from './test3'; 

interface AccountInfo {
  username: string;
  email: string;

  bankAccountNumber: string;
  notificationsEnabled: boolean;
}

const AccountSettingsForm: React.FC = () => {
  const { user } = useAuth();
  const [accountInfo, setAccountInfo] = useState<AccountInfo | null>(null);
  const [currentPassword, setCurrentPassword] = useState(''); 
  const [newPassword, setNewPassword] = useState(''); 
  const [confirmNewPassword, setConfirmNewPassword] = useState(''); 
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccountInfo = async () => {
      if (!user) {
        setError("User not authenticated.");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const response = await apiClient.get<AccountInfo>(`/users/${user.username}/account`);
        setAccountInfo(response.data); 
      } catch (err) {
        console.error('Failed to fetch account info:', err);
        setError('Failed to load account information.');
        setAccountInfo({ 
            username: user.username,
            email: `${user.username}@example.com`,
            bankAccountNumber: '************', 
            notificationsEnabled: true
        });
      } finally {
        setLoading(false);
      }
    };
    fetchAccountInfo();
  }, [user]);

  const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (accountInfo) {
      setAccountInfo(prev => prev ? ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }) : null);
    }
  };

  const handlePasswordChangeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setError("New passwords do not match.");
      return;
    }
    if (!currentPassword || !newPassword) {
      setError("Please fill in all password fields.");
      return;
    }

    setSaving(true);
    setMessage(null);
    setError(null);
    try {
      await apiClient.post('/users/change-password', {
        username: user?.username,
        currentPassword, 
        newPassword      
      });
      setMessage('Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (err) {
      console.error('Failed to change password:', err);
      setError('Failed to change password. Please check your current password.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div>Loading account settings...</div>;
  }

  if (error && !accountInfo) {
    return <div style={{ color: 'red' }}>Error: {error}</div>;
  }

  return (
    <div className="account-settings-container">
      <h1>Account Settings</h1>
      {accountInfo && (
        <form onSubmit={(e) => { e.preventDefault(); /* handle form for general info */ }}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" value={accountInfo.username} readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={accountInfo.email} onChange={handleInfoChange} />
          </div>
          <div className="form-group">
            <label htmlFor="bankAccountNumber">Bank Account (masked):</label>
            <input type="text" id="bankAccountNumber" name="bankAccountNumber" value={accountInfo.bankAccountNumber.replace(/.(?=.{4})/g, '*') /* Masked for display */ } readOnly />
            <p className="hint">Actual full number is in component state. This is for testing purposes only.</p>
          </div>
          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="notificationsEnabled"
              name="notificationsEnabled"
              checked={accountInfo.notificationsEnabled}
              onChange={handleInfoChange}
            />
            <label htmlFor="notificationsEnabled">Enable Notifications</label>
          </div>
        </form>
      )}

      <h2>Change Password</h2>
      <form onSubmit={handlePasswordChangeSubmit}>
        <div className="form-group">
          <label htmlFor="currentPassword">Current Password:</label>
          <input
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmNewPassword">Confirm New Password:</label>
          <input
            type="password"
            id="confirmNewPassword"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
          />
        </div>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
        <button type="submit" disabled={saving}>
          {saving ? 'Changing...' : 'Change Password'}
        </button>
      </form>
      <style jsx>{`
        .account-settings-container {
          max-width: 600px; margin: 30px auto; padding: 30px;
          border: 1px solid #e0e0e0; border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04); background-color: #fff;
        }
        h1, h2 { text-align: center; color: #2c3e50; margin-bottom: 25px; }
        .form-group { margin-bottom: 20px; }
        label { display: block; margin-bottom: 8px; color: #555; font-weight: 600; }
        input[type="text"], input[type="email"], input[type="password"] {
          width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 5px;
          box-sizing: border-box; font-size: 16px; background-color: #f8f8f8;
        }
        input[readOnly] { background-color: #eee; cursor: not-allowed; }
        .checkbox-group { display: flex; align-items: center; }
        .checkbox-group input[type="checkbox"] { margin-right: 10px; width: auto; }
        .checkbox-group label { margin-bottom: 0; }
        button {
          width: 100%; padding: 12px; background-color: #007bff; color: white;
          border: none; border-radius: 5px; font-size: 17px; cursor: pointer;
          transition: background-color 0.2s ease; margin-top: 15px;
        }
        button:hover:not(:disabled) { background-color: #0056b3; }
        button:disabled { background-color: #cccccc; cursor: not-allowed; }
        .success-message { color: #28a745; text-align: center; margin-top: 15px; font-size: 14px; }
        .error-message { color: #dc3545; text-align: center; margin-top: 15px; font-size: 14px; }
        .hint { font-size: 0.85em; color: #888; margin-top: 5px; }
      `}</style>
    </div>
  );
};

export default AccountSettingsForm;