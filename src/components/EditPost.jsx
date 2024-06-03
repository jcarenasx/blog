import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Box, Typography, Grid } from '@mui/material';

const EditPost = ({ posts, updatePost }) => {
  const { id } = useParams();
  const post = posts.find(p => p.id === parseInt(id));
  const navigate = useNavigate();

  const [title, setTitle] = useState(post ? post.title : '');
  const [date, setDate] = useState(post ? post.date : '');
  const [content, setContent] = useState(post ? post.content : '');

  useEffect(() => {
    if (!post) {
      navigate('/');
    }
  }, [post, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePost({ id: parseInt(id), title, date, content, user: post.user });
    navigate('/');
  };

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h5">Editar Entrada</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Título"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Fecha"
                type="date"
                fullWidth
                value={date}
                onChange={(e) => setDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Contenido"
                multiline
                rows={4}
                fullWidth
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Actualizar Entrada
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default EditPost;
