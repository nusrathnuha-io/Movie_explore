import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [backgroundImages, setBackgroundImages] = useState([]);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setBackgroundImages([
      { id: 1, path: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e", title: "Welcome Back", description: "Log in to continue your journey" },
      { id: 2, path: "https://images.unsplash.com/photo-1519046904884-53103b34b206", title: "Secure Access", description: "Your account, your control" },
      { id: 3, path: "https://images.unsplash.com/photo-1476673160081-cf065607f449", title: "Stay Connected", description: "Access your profile anytime" }
    ]);
  }, []);

  const handleLogin = () => {
    if (username && password) {
      // Mock login: In a real app, validate with backend API
      login({ id: `user_${username}`, username });
      navigate('/');
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh' }}>
      <Carousel
        showThumbs={false}
        autoPlay={true}
        transitionTime={3}
        infiniteLoop={true}
        showStatus={false}
      >
        {backgroundImages.map(image => (
          <div key={image.id}>
            <Box
              component="img"
              src={image.path}
              alt={image.title}
              sx={{ width: '100%', height: '100vh', objectFit: 'cover' }}
            />
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              }}
            >
              <Box sx={{ textAlign: 'center', color: 'white' }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {image.title}
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  {image.description}
                </Typography>
              </Box>
            </Box>
          </div>
        ))}
      </Carousel>
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Card
          sx={{
            width: '100%',
            maxWidth: 400,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            p: 3,
            boxShadow: 3,
          }}
        >
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom>
              Login
            </Typography>
            <Box component="form" sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                margin="normal"
                required
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Password"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
                variant="outlined"
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleLogin}
                sx={{ mt: 3, py: 1.5 }}
              >
                Login
              </Button>
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Link to="/signup" style={{ color: '#1976d2', textDecoration: 'none' }}>
                  Don't have an account? Sign up
                </Link>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Login;