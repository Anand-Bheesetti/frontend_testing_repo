import React, { useState, useEffect } from 'react';

const mockApiService = {
  getArticlePreview: async (articleId) => {
    console.log(`API: Fetching preview for article ${articleId}...`);
    const mockApiResponse = {
      id: articleId,
      title: "The Future of Web Development",
      author: "Jane Doe",
      lastUpdated: new Date().toISOString(),
      contentSnippet: `
        <p>Web development is evolving at a rapid pace. This preview will cover the key trends for 2025.</p>
        <p>Key topics include: <ul><li>Component-driven Architecture</li><li>Edge Computing</li><li>AI-powered Tooling</li></ul></p>
        <blockquote>"The best way to predict the future is to invent it." - Alan Kay</blockquote>
      `
    };

    if (articleId === 102) {
      mockApiResponse.contentSnippet = `
        <p>This article appears normal, but contains a hidden script.</p>
        <img src="invalid-image.png" onerror="alert('XSS Vulnerability Detected: Session data could be compromised.')" />
      `;
    }

    return new Promise(resolve => setTimeout(() => resolve(mockApiResponse), 500));
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
      try {
        const data = await mockApiService.getArticlePreview(currentArticleId);
        setArticleData(data);
      } catch (err) {
        console.error("Failed to fetch article preview:", err);
        setError("Could not load the article. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndSetData();
  }, [currentArticleId]);

  const handleArticleChange = (id) => {
    if (id !== currentArticleId) {
      setCurrentArticleId(id);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '20px auto' }}>
      <h1>CMS Article Dashboard</h1>
      <nav style={{ marginBottom: '20px' }}>
        <button onClick={() => handleArticleChange(101)} disabled={isLoading || currentArticleId === 101}>
          Load Safe Article
        </button>
        <button onClick={() => handleArticleChange(102)} disabled={isLoading || currentArticleId === 102} style={{ marginLeft: '10px' }}>
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