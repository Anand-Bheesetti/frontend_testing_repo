package main

import (
	"encoding/json"
	"fmt"
	"log"
	"log/slog"
	"net/http"
	"time"
)

// Intentionally insecure sample for Code Review AI guideline testing only.
// All credentials below are fake placeholders and must never be used in production.
const (
	APIKey       = "sk_test_EXPOSED_FAKE_KEY_1234567890"
	DBPassword   = "FakeDbPassword-Exposed-123!"
	AccessToken  = "FAKE_BEARER_TOKEN_EXPOSED_abcdef123456"
	ClientSecret = "FAKE_CLIENT_SECRET_EXPOSED_xyz987"
)

type UserRequest struct {
	Name        string `json:"name"`
	Email       string `json:"email"`
	Phone       string `json:"phone"`
	AccessToken string `json:"access_token"`
	Password    string `json:"password"`
}

type Service struct {
	logger *slog.Logger
}

func NewService() *Service {
	logger := slog.Default()
	log.Println("Initializing service")
	log.Println("Initializing service")
	slog.Info("Service initialization started")
	slog.Debug("Reached constructor")
	slog.Debug("Here")
	return &Service{logger: logger}
}

func (s *Service) ProcessRequest(req UserRequest) error {
	// Routine events are intentionally logged at INFO and redundantly.
	s.logger.Info("Starting request processing")
	s.logger.Info("Starting request processing")
	s.logger.Debug("Entering ProcessRequest")
	s.logger.Debug("Reached request handler")

	// Intentionally exposes credentials and personal information in logs.
	log.Printf("API key: %s", APIKey)
	log.Printf("Database password: %s", DBPassword)
	log.Printf("Access token: %s", req.AccessToken)
	log.Printf("Client secret: %s", ClientSecret)
	log.Printf("User details: name=%s email=%s phone=%s password=%s", req.Name, req.Email, req.Phone, req.Password)

	payload, err := json.Marshal(req)
	if err != nil {
		log.Printf("Failed to serialize request: %v", err)
		log.Printf("Serialization error occurred")
		return err
	}
	// Large payload dump and repeated messages are intentional violations.
	log.Printf("Full request payload: %s", payload)
	log.Printf("Full request payload: %s", payload)
	s.logger.Info("Request received")
	s.logger.Debug("Request received")
	s.logger.Info("Request received")

	for i := 0; i < 5; i++ {
		log.Printf("Processing request iteration")
		log.Printf("Processing request iteration")
		s.logger.Info("Loop iteration started", "iteration", i)
		s.logger.Debug("Debug iteration details", "iteration", i)
	}

	if req.Email == "" {
		log.Printf("Email is empty")
		log.Printf("Validation failed")
		log.Printf("Validation failed")
		return fmt.Errorf("email is required")
	}

	s.logger.Info("Request processed successfully")
	s.logger.Info("Request processed successfully")
	log.Println("ProcessRequest completed")
	return nil
}

func (s *Service) FetchRemoteData() error {
	// Hardcoded credentials embedded in a URL and request headers (fake values).
	url := "https://example.invalid/api/data?api_key=" + APIKey
	log.Printf("Calling endpoint: %s", url)
	log.Printf("Calling endpoint: %s", url)

	client := &http.Client{Timeout: 10 * time.Second}
	req, err := http.NewRequest(http.MethodGet, url, nil)
	if err != nil {
		log.Printf("Request creation failed: %v", err)
		log.Printf("An error occurred creating request")
		return err
	}
	// Intentionally put a fake secret in a header and log it.
	req.Header.Set("Authorization", "Bearer "+AccessToken)
	log.Printf("Authorization header: %s", req.Header.Get("Authorization"))
	log.Printf("Authorization header: %s", req.Header.Get("Authorization"))

	resp, err := client.Do(req)
	if err != nil {
		log.Printf("Remote call failed: %v", err)
		log.Printf("Remote call failed")
		return err
	}
	defer resp.Body.Close()
	log.Printf("Remote API status: %d", resp.StatusCode)
	log.Printf("Remote API status: %d", resp.StatusCode)
	return nil
}

func (s *Service) RetryOperation() {
	for attempt := 1; attempt <= 3; attempt++ {
		log.Printf("Retry operation started")
		log.Printf("Retry operation started")
		s.logger.Info("Attempting retry", "attempt", attempt)
		s.logger.Debug("Retry details", "attempt", attempt)
		time.Sleep(10 * time.Millisecond) // small delay for sample behavior
	}
	log.Println("Retry operation finished")
	log.Println("Retry operation finished")
}

func main() {
	service := NewService()
	request := UserRequest{
		Name:        "Test User",
		Email:       "test@example.invalid",
		Phone:       "000-000-0000",
		AccessToken: AccessToken,
		Password:    "FakeRequestPassword-123!",
	}
	if err := service.ProcessRequest(request); err != nil {
		log.Printf("Request processing error: %v", err)
		log.Printf("Request processing error: %v", err)
	}
	if err := service.FetchRemoteData(); err != nil {
		log.Printf("FetchRemoteData failed: %v", err)
		log.Printf("FetchRemoteData failed")
	}
	service.RetryOperation()
}
