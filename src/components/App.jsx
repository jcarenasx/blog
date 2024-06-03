import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Post from './Post';
import PostCard from './PostCard';
import NewPost from './NewPost';
import EditPost from './EditPost';
import { AppBar, Toolbar, Typography, Container, TextField, Box, Button, Grid } from '@mui/material';

const dummyPosts = [
  {
    id: 1,
    title: 'Primera entrada',
    date: '2024-06-01',
    content: 'Contenido de la primera entrada',
    user: {
      id: 'u2',
      name: 'usuario2',
    }
  },
  {
    id: 2,
    title: 'Segunda entrada',
    date: '2024-06-02',
    content: 'Contenido de la segunda entrada',
    user: {
      id: 'u3',
      name: 'usuario3',
    }
  },
]

const App = () => {
  const initialPosts = JSON.parse(localStorage.getItem('posts')) || dummyPosts;

  const [posts, setPosts] = useState(initialPosts);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    sessionStorage.setItem(
      'token',
      JSON.stringify({
        id: 'u1',
        name: 'Juan Carlos',
      })
    );
  }, [])

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  const addPost = (newPost) => {
    setPosts([...posts, { ...newPost, id: posts.length + 1 }]);
  };

  const updatePost = (updatedPost) => {
    setPosts(posts.map(post => (post.id === updatedPost.id ? updatedPost : post)));
  };

  const deletePost = (id) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
          >
            Mi Blog
          </Typography>
          <TextField
            placeholder="Buscar..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Button color="inherit" component={Link} to="/">Inicio</Button>
          <Button color="inherit" component={Link} to="/new-post">Nueva Entrada</Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Box my={4}>
          <Routes>
            <Route
              path="/"
              element={
                <Grid container spacing={2}>
                  {filteredPosts.map(post => (
                    <PostCard key={post.id} post={post} deletePost={deletePost} />
                  ))}
                </Grid>
              }
            />
            <Route
              path="/posts/:id"
              element={<Post posts={posts} />}
            />
            <Route
              path="/new-post"
              element={<NewPost addPost={addPost} />}
            />
            <Route
              path="/edit-post/:id"
              element={<EditPost posts={posts} updatePost={updatePost} />}
            />
          </Routes>
        </Box>
      </Container>
    </Router>
  );
};

export default App;
