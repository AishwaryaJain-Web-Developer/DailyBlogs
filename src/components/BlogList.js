import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardActions, Typography, Button, Grid, Container } from '@mui/material';
import DOMPurify from 'dompurify';

const BlogList = () => {
  const blogs = JSON.parse(localStorage.getItem('blogs')) || [];

  const handleDelete = (index) => {
    const updatedBlogs = blogs.filter((_, i) => i !== index);
    localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
    window.location.reload(); // Refresh to update the list
  };

  // Function to limit blog content to 100 words
  const truncateContent = (htmlContent, wordLimit) => {
    const textContent = htmlContent.replace(/<[^>]+>/g, ''); // Remove HTML tags
    const wordsArray = textContent.split(' ');

    if (wordsArray.length <= wordLimit) {
      return htmlContent;
    }

    return wordsArray.slice(0, wordLimit).join(' ') + '...';
  };

  return (
    <Container sx={{ padding: '20px', maxWidth: '1200px', margin: 'auto' }}>
      <Typography variant="h3" gutterBottom align="center" sx={{ margin: '40px 0', fontWeight: 'bold', color: '#333' }}>
        All Blogs
      </Typography>
      <Grid container spacing={4}>
        {blogs.map((blog, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                minHeight: '350px',  // Fixed height for consistent size
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Subtle shadow
                borderRadius: '12px', // Rounded corners for a modern look
                overflow: 'hidden',
                transition: 'transform 0.3s ease', // Hover animation
                '&:hover': {
                  transform: 'translateY(-5px)', // Lift on hover
                  boxShadow: '0 6px 18px rgba(0, 0, 0, 0.15)', // Slightly stronger shadow on hover
                },
              }}
            >
              <CardContent sx={{ padding: '20px' }}>
                <Typography
                  variant="h5"
                  component="div"
                  gutterBottom
                  sx={{ 
                    color: blog.color || '#007BFF', // Use blog's title color or default to blue
                    fontWeight: '600',
                    fontSize: '1.5rem',
                  }}
                >
                  {blog.title}
                </Typography>
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(truncateContent(blog.content, 100)),
                  }}
                  style={{
                    color: 'rgba(0, 0, 0, 0.7)',
                    fontSize: '1rem',
                    lineHeight: '1.6',
                    maxHeight: '150px',
                    overflow: 'hidden',
                  }}
                />
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-between', padding: '20px' }}>
                <Button
                  size="small"
                  component={Link}
                  to={`/post/${index}`}
                  sx={{
                    textTransform: 'none',
                    fontWeight: '500',
                    color: '#007BFF',
                    '&:hover': {
                      backgroundColor: '#f0f0f0',
                    },
                  }}
                >
                  Read More
                </Button>
                <Button
                  size="small"
                  color="error"
                  onClick={() => handleDelete(index)}
                  sx={{
                    textTransform: 'none',
                    fontWeight: '500',
                    color: '#FF1744',
                    '&:hover': {
                      backgroundColor: '#ffe4e6',
                    },
                  }}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          component={Link}
          to="/editor"
          sx={{
            marginTop: '20px',
            padding: '10px 30px',
            fontSize: '1rem',
            backgroundColor: '#007BFF',
            '&:hover': {
              backgroundColor: '#0056b3',
            },
          }}
        >
          Add New Blog
        </Button>
      </div>
    </Container>
  );
};

export default BlogList;
