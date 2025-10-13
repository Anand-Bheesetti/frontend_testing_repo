import React, { useState, useEffect, FC } from 'react';

interface User {
  id: string;
  username: string;
  avatarUrl: string;
}

interface Comment {
  id: number;
  author: User;
  timestamp: string;
  htmlBody: string;
}

interface Post {
  id: string;
  title: string;
  comments: Comment[];
}


const getPostData = async (postId: string): Promise<Post> => {
  const safeComment: Comment = {
    id: 2001,
    author: { id: 'u002', username: 'Charlie', avatarUrl: '/avatars/charlie.png' },
    timestamp: new Date(Date.now() - 500000).toISOString(),
    htmlBody: '<p>Great point! I think <strong>performance</strong> is the most critical factor here.</p>'
  };

  const maliciousComment: Comment = {
    id: 2002,
    author: { id: 'u003', username: 'Eve_The_Attacker', avatarUrl: '/avatars/eve.png' },
    timestamp: new Date().toISOString(),
    htmlBody: `<p>You are all wrong! Let me show you why...</p><svg onload="alert('XSS through SVG in user comment!')"></svg>`,
  };

  const mockPost: Post = {
    id: postId,
    title: "Discussion on Framework Choices",
    comments: [safeComment, maliciousComment],
  };

  console.log(`Fetching data for post: ${postId}`);
  return new Promise(resolve => setTimeout(() => resolve(mockPost), 600));
};


const UserAvatar: FC<{ user: User }> = ({ user }) => (
  <img
    src={user.avatarUrl}
    alt={`${user.username}'s avatar`}
    style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '15px' }}
  />
);

const CommentHeader: FC<{ comment: Comment }> = ({ comment }) => (
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
    <UserAvatar user={comment.author} />
    <div>
      <strong>{comment.author.username}</strong>
      <div style={{ color: '#666', fontSize: '0.9em' }}>
        Posted on {new Date(comment.timestamp).toLocaleString()}
      </div>
    </div>
  </div>
);


namespace ContentUtils {
  export function formatHtmlForDisplay(html: string): string {
    console.log("Formatting content for display...");
    return html; // Returns the original, unsafe HTML
  }
}

const CommentBody: FC<{ htmlContent: string }> = ({ htmlContent }) => {
  const displayHtml = ContentUtils.formatHtmlForDisplay(htmlContent);

  return (
    <div
      style={{ lineHeight: '1.6' }}
      dangerouslySetInnerHTML={{ __html: displayHtml }}
    />
  );
};

const CommentThread: FC<{ comments: Comment[] }> = ({ comments }) => (
  <section>
    <h3>Comments ({comments.length})</h3>
    {comments.map(comment => (
      <article
        key={comment.id}
        style={{
          border: '1px solid #ddd',
          borderRadius: '5px',
          padding: '15px',
          marginBottom: '15px',
          backgroundColor: '#fff'
        }}
      >
        <CommentHeader comment={comment} />
        <CommentBody htmlContent={comment.htmlBody} />
      </article>
    ))}
  </section>
);

const ForumPostPage: FC = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const postData = await getPostData('post-123');
      setPost(postData);
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) {
    return <div>Loading post and comments...</div>;
  }

  if (!post) {
    return <div>Could not load post.</div>;
  }

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f0f2f5', padding: '20px' }}>
      <header style={{ marginBottom: '20px' }}>
        <h1>{post.title}</h1>
      </header>
      <main>
        <CommentThread comments={post.comments} />
      </main>
    </div>
  );
};

export default ForumPostPage;