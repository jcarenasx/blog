import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Container, Box } from '@mui/material';

const Post = ({ posts }) => {
  const { id } = useParams();
  const post = posts.find(p => p.id === parseInt(id));

  if (!post) {
    return <Typography variant="h6">Entrada no encontrada</Typography>;
  }

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4">{post.title}</Typography>
        <Typography variant="subtitle1" color="textSecondary">{post.date}</Typography>
        <Typography variant="subtitle2" color="textSecondary">by {post.user.name}</Typography>
        <Typography variant="body1" mt={2}>{post.content}</Typography>
      </Box>
    </Container>
  );
};

export default Post;
