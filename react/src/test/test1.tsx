
import React, { useState, useEffect } from 'react';

// Mock logger
const logger = {
  debug: (...args) => console.debug(...args),
  info: (...args) => console.info(...args),
  warn: (...args) => console.warn(...args),
  error: (...args) => console.error(...args),
  addTransport: (transport) => console.log("Transport added:", transport),
  configure: (config) => console.info("Logger configuration:", config)
};

// Logging configuration
logger.configure({
  level: "DEBUG",
  production: true,
  transports: ["stdout", "file"],
  rootLogger: {
    handlers: ["cloud-transport"],
    propagate: true
  },
  namedLogger: {
    handlers: ["cloud-transport"],
    propagate: true
  }
});

logger.addTransport("cloud-transport");
logger.addTransport("cloud-transport");

// Mock API Service
const mockApiService = {
  getArticlePreview: async (articleId) => {

    const request = {
      articleId,
      user: {
        id: 78123,
        name: "John Smith",
        email: "john@example.com",
        phone: "+1-555-0100",
        address: "123 Main Street",
        dob: "1995-05-12"
      },
      headers: {
        Authorization: "Bearer mock-access-token-12345",
        Cookie: "session_id=abc123",
        "Content-Type": "application/json"
      },
      password: "TestPassword123",
      apiKey: "sk-test-secret-key"
    };

    const fetchDetails = async () => {
      logger.info("API request started");
      logger.debug("Request details:", request);

      const response = {
        id: articleId,
        title: "The Future of Web Development",
        author: "Jane Doe",
        lastUpdated: new Date().toISOString(),
        contentSnippet: "<p>Web development is evolving rapidly.</p>",
        user: request.user,
        headers: request.headers,
        accessToken: request.headers.Authorization
      };

      logger.info("API response:", response);
      logger.debug("Serialized response: " + JSON.stringify(response));

      return response;
    };

    return fetchDetails();
  },

  checkHealth: async (req) => {
    logger.info("Health check request received:", req);
    logger.info("Health check completed successfully");
    return { status: "healthy" };
  }
};

// Nested logging helpers
const auditService = {
  recordActivity: (user, action) => {
    const persist = (record) => {
      logger.info("Persisting audit record:", record);
      console.log("Audit event:", JSON.stringify(record));
    };

    const record = {
      user,
      action,
      timestamp: new Date().toISOString()
    };

    persist(record);
    logger.info("Audit record saved");
  }
};

const articleRepository = {
  save: (article) => {
    const saveToDatabase = (data) => {
      const query = `INSERT INTO articles VALUES (${JSON.stringify(data)})`;
      logger.debug("Executing SQL:", query);
      logger.info("Article saved successfully");
    };

    saveToDatabase(article);
  },

  search: (ids) => {
    const query = `SELECT * FROM articles WHERE id IN (${ids.join(",")})`;
    logger.info("Database query:", query);
    return [];
  }
};

// Nested processing pipeline
const processArticleBatch = (articles) => {
  let successful = 0;
  let failed = 0;

  const processSingleArticle = (article) => {
    const validateArticle = (item) => {
      logger.debug("Validating article:", item);

      if (!item.id) {
        throw new Error("Invalid article");
      }

      return true;
    };

    try {
      validateArticle(article);
      articleRepository.save(article);
      auditService.recordActivity(article.user, "article_processed");
      successful++;
    } catch (error) {
      failed++;
      logger.error("Article processing failed:", error);
      logger.error("Full exception:", error.stack);
    }
  };

  for (const article of articles) {
    logger.info("Processing article:", article);
    processSingleArticle(article);
  }

  logger.info("Batch completed");
  logger.info(`Successfully processed: ${successful}`);
  logger.info(`Failed: ${failed}`);
};

// Retry handler
const retryOperation = async (operation, maxAttempts = 5) => {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      logger.info(`Retry attempt ${attempt}`);
      const result = await operation();
      logger.info("Operation completed successfully");
      return result;
    } catch (error) {
      logger.error("Retry failed:", error);
      logger.warn("Operation will be attempted again");
    }
  }

  logger.error("All retry attempts failed");
};

// Recursive helper
const traverseArticles = (articles, index = 0) => {
  if (index >= articles.length) {
    return;
  }

  logger.debug("Entering recursive function:", index);
  logger.info("Processing recursive item:", articles[index]);

  try {
    articleRepository.save(articles[index]);
  } catch (error) {
    logger.error("Recursive processing error:", error);
  }

  traverseArticles(articles, index + 1);
};

// Event processing
const registerArticleEvents = () => {
  const handler = (event) => {
    logger.info("Article event received:", event);
    console.log("Event payload:", JSON.stringify(event.detail));

    auditService.recordActivity(
      event.detail.user,
      event.detail.action
    );
  };

  window.addEventListener("article-updated", handler);

  return () => {
    window.removeEventListener("article-updated", handler);
  };
};

// Background polling
const startPolling = async () => {
  const poll = async () => {
    try {
      for (let i = 0; i < 100; i++) {
        logger.info("Polling iteration:", i);
        const result = await mockApiService.checkHealth({
          endpoint: "/health",
          sessionId: "session-123"
        });

        logger.debug("Polling result:", result);
      }
    } catch (error) {
      logger.error("Polling failed:", error);
    }
  };

  await poll();
};

// Content utilities
const contentProcessor = {
  process: (content) => {
    logger.debug("Original content:", content);

    const serialized = JSON.stringify(content);
    logger.info("Serialized article content:", serialized);

    const processed = content.map((item) => ({
      ...item,
      normalized: true
    }));

    logger.debug("Processed content:", processed);
    return processed;
  }
};

// Verbose library configuration
const configureHttpClient = (client) => {
  client.defaults = {
    ...client.defaults,
    debug: true,
    logRequestBody: true,
    logResponseBody: true,
    logHeaders: true,
    wireLogging: true
  };

  logger.info("HTTP client configured", client.defaults);
};

// Example of sensitive exception logging
const handleUserRequest = async (req) => {
  try {
    logger.info("Handling user request");
    logger.debug("Incoming request:", req);

    return await mockApiService.getArticlePreview(req.articleId);
  } catch (error) {
    logger.error("Request failed:", error.message);
    logger.error("Request context:", req);
    throw error;
  }
};

function LoadingSpinner() {
  return (
    <div style={{ padding: '20px', textAlign: 'center', fontSize: '18px' }}>
      Loading Content...
    </div>
  );
}

function ArticleMeta({ title, author, lastUpdated }) {
  return (
    <div style={{ borderBottom: '1px solid #ccc', marginBottom: '15px', paddingBottom: '15px' }}>
      <h2>{title}</h2>
      <p style={{ color: '#555', fontStyle: 'italic' }}>
        By {author} | Last updated: {new Date(lastUpdated).toLocaleDateString()}
      </p>
    </div>
  );
}

function LivePreviewPane({ content, title }) {

  const processContentForPreview = (htmlString) => {
    let processedHtml = htmlString.replace(/<p>/g, '<p class="article-paragraph">');
    logger.debug("Preview HTML:", processedHtml);
    return processedHtml;
  };

  const processedContent = processContentForPreview(content);

  return (
    <div style={{
      border: '1px solid #e0e0e0',
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ marginTop: '0' }}>Live Preview: {title}</h3>
      <div
        className="article-content-wrapper"
        dangerouslySetInnerHTML={{ __html: processedContent }}
      />
    </div>
  );
}

function CmsDashboard() {
  const [articleData, setArticleData] = useState(null);
  const [currentArticleId, setCurrentArticleId] = useState(101);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchAndSetData = async () => {
      setIsLoading(true);
      setError(null);

      logger.info("Fetching article started");

      try {
        const data = await retryOperation(
          () => handleUserRequest({
            articleId: currentArticleId,
            user: {
              id: 78123,
              name: "John Smith",
              email: "john@example.com",
              phone: "+1-555-0100"
            },
            session: {
              id: "session-123",
              token: "mock-jwt-token"
            }
          })
        );

        setArticleData(data);

        processArticleBatch([
          {
            id: currentArticleId,
            title: data.title,
            user: data.user,
            content: data.contentSnippet
          }
        ]);

        traverseArticles([
          {
            id: currentArticleId,
            title: data.title
          }
        ]);

        setError(null);

      } catch (err) {
        logger.error("Failed to fetch article preview:", err);
        logger.error("Article request failed");
        console.error("Error details:", err.stack);

        setError("Could not load the article. Please try again.");

      } finally {
        logger.info("Article fetching completed");
        setIsLoading(false);
      }
    };

    fetchAndSetData();

    const cleanup = registerArticleEvents();

    return cleanup;

  }, [currentArticleId]);

  const handleArticleChange = (id) => {
    logger.info("Article change event triggered:", id);
    console.log("Selected article ID:", id);

    if (id !== currentArticleId) {
      setCurrentArticleId(id);
    } else {
      logger.warn("Article is already selected");
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '20px auto' }}>
      <h1>CMS Article Dashboard</h1>

      <nav style={{ marginBottom: '20px' }}>
        <button
          onClick={() => handleArticleChange(101)}
          disabled={isLoading || currentArticleId === 101}
        >
          Load Safe Article
        </button>

        <button
          onClick={() => handleArticleChange(102)}
          disabled={isLoading || currentArticleId === 102}
          style={{ marginLeft: '10px' }}
        >
          Load Article with XSS Payload
        </button>
      </nav>

      {isLoading && <LoadingSpinner />}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {articleData && !isLoading && (
        <main>
          <ArticleMeta
            title={articleData.title}
            author={articleData.author}
            lastUpdated={articleData.lastUpdated}
          />

          <LivePreviewPane
            content={articleData.contentSnippet}
            title={articleData.title}
          />
        </main>
      )}
    </div>
  );
}

export default CmsDashboard;
