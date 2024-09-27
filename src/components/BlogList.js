import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardActions, Typography, Button, Grid, Container } from '@mui/material';

const BlogList = () => {
  const blogs = JSON.parse(localStorage.getItem('blogs')) || [];

  const handleDelete = (index) => {
    const updatedBlogs = blogs.filter((_, i) => i !== index);
    localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
    window.location.reload(); // Refresh to update the list
  };

  return (
    <Container>
      <Typography variant="h3" gutterBottom align="center" style={{ margin: '20px 0', fontWeight: 'bold' }}>
        All Blogs
      </Typography>
      <Grid container spacing={4}>
        {blogs.map((blog, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ minHeight: '250px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  {blog.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {blog.content.slice(0, 100)}...
                </Typography>
              </CardContent>
              <CardActions style={{ justifyContent: 'space-between' }}>
                <Button size="small" component={Link} to={`/post/${index}`}>
                  Read More
                </Button>
                <Button size="small" color="error" onClick={() => handleDelete(index)}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Button 
          variant="contained" 
          color="primary" 
          size="large" 
          component={Link} 
          to="/editor"
          sx={{ marginTop: '20px' }}
        >
          Add New Blog
        </Button>
      </div>
    </Container>
  );
};

export default BlogList;
