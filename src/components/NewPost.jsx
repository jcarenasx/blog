import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Box, Typography, Grid } from '@mui/material';

const NewPost = ({ addPost }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [content, setContent] = useState('');
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const userSessionInfo = sessionStorage.getItem('token');
    if (userSessionInfo) {
      setUserData(JSON.parse(userSessionInfo));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    addPost({ title, date, content, user: userData });
    navigate('/');
  };

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h5">Crear Nueva Entrada</Typography>
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
                Crear Entrada
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default NewPost;
