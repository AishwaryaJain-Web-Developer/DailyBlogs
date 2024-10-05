import { Container, Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';

const BlogPost = () => {
  const { id } = useParams();
  const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
  const blog = blogs[id];

  return (
    <Container>
      <Typography variant="h2" gutterBottom sx={{ color: '#333', fontWeight: 'bold' }}>
        {blog.title}
      </Typography>
      
      {/* Display Blog Image */}
      {blog.imageUrl && (
        <img
          src={blog.imageUrl}
          alt="Blog"
          style={{
            width: '100%',
            maxHeight: '400px',
            objectFit: 'cover',
            marginBottom: '20px',
            borderRadius: '8px',
          }}
        />
      )}
      
      <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content) }} style={{ margin: '20px 0' }} />
    </Container>
  );
};

export default BlogPost;
