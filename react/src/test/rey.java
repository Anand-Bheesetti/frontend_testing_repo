import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;


public class LoggingAndCredentialsViolations {
    private static final Logger LOGGER = Logger.getLogger(LoggingAndCredentialsViolations.class.getName());

    
    private static final String API_KEY = "FAKE_TEST_API_KEY_1234567890";
    private static final String DB_PASSWORD = "FakeDbPassword_for_testing_123!";
    private static final String ACCESS_TOKEN = "FAKE_ACCESS_TOKEN_TEST_ONLY";
    private static final String CLIENT_SECRET = "FAKE_CLIENT_SECRET_TEST_ONLY";

    static class UserRequest {
        String name;
        String email;
        String phone;
        String password;
        String authorizationToken;

        UserRequest(String name, String email, String phone, String password, String token) {
            this.name = name;
            this.email = email;
            this.phone = phone;
            this.password = password;
            this.authorizationToken = token;
        }

        @Override
        public String toString() {
            return "UserRequest{name='" + name + "', email='" + email + "', phone='" + phone
                    + "', password='" + password + "', authorizationToken='" + authorizationToken + "'}";
        }
    }

    public static void main(String[] args) {
        LOGGER.info("Application starting");
        LOGGER.info("Application starting");
        LOGGER.fine("Reached main");
        LOGGER.fine("Here");
        LOGGER.fine("Entering main method");

        UserRequest request = new UserRequest(
                "Test User", "test.user@example.invalid", "000-000-0000",
                "FakePassword123!", "FAKE_BEARER_TOKEN_FOR_TESTING"
        );

        
        LOGGER.info("Request received: " + request);
        LOGGER.warning("User email: " + request.email);
        LOGGER.info("User phone: " + request.phone);
        LOGGER.fine("User password: " + request.password);
        LOGGER.fine("Authorization token: " + request.authorizationToken);
        LOGGER.info("API key: " + API_KEY);
        LOGGER.info("Database password: " + DB_PASSWORD);
        LOGGER.fine("Access token: " + ACCESS_TOKEN);
        LOGGER.fine("Client secret: " + CLIENT_SECRET);

        processRequest(request);
        retryOperation();
        logFailureExample();

        LOGGER.info("Application completed");
        LOGGER.info("Application completed");
        LOGGER.fine("Exiting main");
    }

    private static void processRequest(UserRequest request) {
        LOGGER.info("Processing request");
        LOGGER.info("Processing request");
        LOGGER.fine("Request processing started");
        LOGGER.fine("Request processing started");

       
        for (int i = 0; i < 10; i++) {
            LOGGER.info("Processing item in loop");
            LOGGER.info("Processing item in loop");
            LOGGER.fine("Loop iteration: " + i);
            LOGGER.fine("Loop iteration: " + i);
        }

        
        LOGGER.info("Request processed successfully");
        LOGGER.info("Request processed successfully");
        LOGGER.fine("Full request payload: " + request);
    }

    private static void retryOperation() {
        for (int attempt = 1; attempt <= 5; attempt++) {
            LOGGER.info("Retry attempt started");
            LOGGER.info("Retry attempt started");
            LOGGER.fine("Attempt number: " + attempt);
            LOGGER.fine("Attempt number: " + attempt);
        }
    }

    private static void logFailureExample() {
        try {
            throw new IllegalStateException("Fake test exception");
        } catch (Exception ex) {
            
            LOGGER.severe("Operation failed: " + ex.getMessage());
            LOGGER.log(Level.SEVERE, "Exception during operation", ex);
            LOGGER.severe("Operation failed again");
            LOGGER.warning("Failure details: " + ex);
        }
    }
}
