import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Paper } from '@mui/material';

const BlogEditor = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleContentChange = (value) => setContent(value);

  const saveBlog = () => {
    const blog = { title, content, date: new Date() };
    let blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    blogs.push(blog);
    localStorage.setItem('blogs', JSON.stringify(blogs));
    navigate('/');
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center" sx={{ margin: '20px 0', fontWeight: 'bold' }}>
        Create a New Blog
      </Typography>
      <Paper elevation={3} sx={{ padding: '20px' }}>
        <TextField
          fullWidth
          label="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
          variant="outlined"
        />
        <ReactQuill value={content} onChange={handleContentChange} className="mb-4" />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={saveBlog}
          sx={{ marginTop: '20px', padding: '10px' }}
        >
          Save Blog
        </Button>
      </Paper>
    </Container>
  );
};

export default BlogEditor;
