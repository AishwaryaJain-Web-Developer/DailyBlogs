import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardActions, Typography, Button, Grid, Container } from '@mui/material';
import DOMPurify from 'dompurify';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [featuredBlog, setFeaturedBlog] = useState(null);

  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    setBlogs(storedBlogs);
    if (storedBlogs.length > 0) {
      setFeaturedBlog(storedBlogs[0]); // Set the latest blog as featured
    }
  }, []);

  const handleDelete = (index) => {
    const updatedBlogs = blogs.filter((_, i) => i !== index);
    localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
    setBlogs(updatedBlogs);
    if (featuredBlog === blogs[index]) {
      setFeaturedBlog(updatedBlogs[0] || null); // Update featured if deleted
    }
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

  const handleCardClick = (blog) => {
    setFeaturedBlog(blog); // Set the clicked blog as the featured blog
  };

  return (
    <Container
      sx={{
        padding: '20px',
        maxWidth: '100%',
        margin: 'auto',
        backgroundImage: 'url(https://wallpapercave.com/wp/wp7348374.jpg)', // Add your background image URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        {/* Heading in the Center */}
        <Typography
          variant="h3"
          component="h1"
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '2.5rem',
            color: '#ffffff',
            textShadow: '2px 2px 5px rgba(0,0,0,0.5)',
          }}
        >
          Daily Blogs
        </Typography>

        {/* Add Blog Button on Top-Right Corner */}
        <Button
          variant="contained"
          color="primary"
          size="large"
          component={Link}
          to="/editor"
          sx={{
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

      {/* Featured Blog Display */}
      {featuredBlog && (
        <Card
          sx={{
            marginBottom: '40px',
            padding: '20px',
            boxShadow: '0 6px 18px rgba(0, 0, 0, 0.15)',
            borderRadius: '12px',
            textAlign: 'center',
            backdropFilter: 'blur(10px)', // Blur effect for featured blog
            background: 'rgba(255, 255, 255, 0.7)',
          }}
        >
          <CardContent>
            <Typography
              variant="h4"
              component="div"
              sx={{
                color: featuredBlog.color || '#007BFF',
                fontWeight: 'bold',
                fontSize: '2rem',
              }}
            >
              {featuredBlog.title}
            </Typography>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(truncateContent(featuredBlog.content, 100)),
              }}
              style={{
                color: 'rgba(0, 0, 0, 0.7)',
                fontSize: '1rem',
                lineHeight: '1.6',
                marginTop: '20px',
              }}
            />
          </CardContent>
        </Card>
      )}

      {/* Remaining Blogs Displayed as Cards */}
      <Grid container spacing={4}>
        {blogs
          .filter((blog) => blog !== featuredBlog) // Exclude the featured blog from the list
          .map((blog, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                onClick={() => handleCardClick(blog)} // Click to set the blog as featured
                sx={{
                  minHeight: '350px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease',
                  backdropFilter: 'blur(8px)', // Blur effect for blog cards
                  background: 'rgba(255, 255, 255, 0.6)',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 6px 18px rgba(0, 0, 0, 0.15)',
                  },
                }}
              >
                <CardContent sx={{ padding: '20px' }}>
                  <Typography
                    variant="h5"
                    component="div"
                    gutterBottom
                    sx={{
                      color: blog.color || '#007BFF',
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
    </Container>
  );
};

export default BlogList;
