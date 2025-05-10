import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [backgroundImages, setBackgroundImages] = useState([]);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setBackgroundImages([
      { id: 1, path: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e", title: "Join Us", description: "Create your account to explore movies" },
      { id: 2, path: "https://images.unsplash.com/photo-1519046904884-53103b34b206", title: "Get Started", description: "Sign up for a personalized experience" },
      { id: 3, path: "https://images.unsplash.com/photo-1476673160081-cf065607f449", title: "Discover More", description: "Unlock exclusive features with your account" }
    ]);
  }, []);

  const handleSignup = () => {
    if (username && email && password) {
      // Mock signup: In a real app, register with backend API
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
              Sign Up
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
                label="Email"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                onClick={handleSignup}
                sx={{ mt: 3, py: 1.5 }}
              >
                Sign Up
              </Button>
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Link to="/login" style={{ color: '#1976d2', textDecoration: 'none' }}>
                  Already have an account? Log in
                </Link>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Signup;