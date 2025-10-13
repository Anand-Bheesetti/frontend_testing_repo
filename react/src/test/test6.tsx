// src/config/appConfig.ts
// This file is meant for application-wide configurations.

export const APP_NAME = "Analytics Dashboard Pro";
export const API_BASE_URL = "https://api.analytics.com/v1";
export const DEFAULT_THEME = "dark";

// VULNERABLE: A simulated sensitive API key stored directly in a globally accessible configuration file.
// This key should ideally be handled server-side or via environment variables, not client-side config.
export const ANALYTICS_SERVICE_SECRET_KEY: string = "super-secret-analytics-key-12345";

export const FEATURE_FLAGS = {
  enableBetaFeatures: true,
  showPromotions: false,
};

// VULNERABLE: Temporarily storing a placeholder customer support email that might contain PII
// before it's "processed" or sent to a backend, exposing it in memory.
export const customerSupportContact = {
  name: "John Doe",
  email: "john.doe.support@example.com",
  phone: "+1-555-123-4567" // VULNERABILITY: PII exposed globally
};

// Imagine other non-sensitive configurations here