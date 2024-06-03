import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Box, Button, Grid } from '@mui/material';

const PostCard = ({ post, deletePost }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userSessionInfo = sessionStorage.getItem('token');
    if (userSessionInfo) {
      setUserData(JSON.parse(userSessionInfo));
    }
  }, []);

  return (
    <Grid item xs={12} sm={6} md={4} key={post.id}>
      <Box my={2} p={2} border={1} borderRadius={2}>
        <Link to={`/posts/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography variant="h5">{post.title}</Typography>
          <Typography variant="subtitle2">by {post.user?.name}</Typography>
          <Typography variant="subtitle1" color="textSecondary">{post.date}</Typography>
          <Typography variant="body1">{post.content}</Typography>
        </Link>
        {userData?.id === post.user?.id && (
          <>
            <Button color="primary" component={Link} to={`/edit-post/${post.id}`}>Editar</Button>
            <Button color="error" onClick={() => deletePost(post.id)}>Eliminar</Button>
          </>
        )}
      </Box>
    </Grid>
  );
};

export default PostCard;
