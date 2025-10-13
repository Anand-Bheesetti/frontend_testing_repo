// src/utils/sessionStorageManager.ts
// Utility for managing non-critical session data.

interface UserPreferences {
  theme: 'light' | 'dark';
  notifications: boolean;
  lastVisitedPage: string;
  // VULNERABLE: Including PII directly in sessionStorage, which is accessible to JS.
  // This is a direct violation, similar to the localStorage rule, but for PII.
  userEmail: string;
}

const STORAGE_KEY = 'user_prefs_session';

export const saveUserPreferences = (prefs: UserPreferences) => {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch (error) {
    console.error('Error saving user preferences to sessionStorage:', error);
  }
};

export const loadUserPreferences = (): UserPreferences | null => {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error loading user preferences from sessionStorage:', error);
    return null;
  }
};

export const clearUserPreferences = () => {
  sessionStorage.removeItem(STORAGE_KEY);
};

// VULNERABLE: Exporting a function that directly stores a simulated "temporary password"
// (e.g., for a one-time login link) in sessionStorage. This should never persist client-side.
export const storeTempPasswordForVerification = (tempPass: string) => {
  sessionStorage.setItem('temp_verification_pass', tempPass); // VULNERABILITY
  console.warn('Temporary password stored in sessionStorage for verification. Ensure it is short-lived and immediately deleted after use.');
};

export const getTempPasswordForVerification = (): string | null => {
  const tempPass = sessionStorage.getItem('temp_verification_pass');
  // In a real scenario, this should be immediately removed after retrieval and use.
  // sessionStorage.removeItem('temp_verification_pass');
  return tempPass;
};