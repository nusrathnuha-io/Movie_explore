import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Grid, Card, CardMedia, CardContent, Typography, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAuth } from "../context/AuthContext";

const Favorites = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [favorites, setFavorites] = React.useState(JSON.parse(localStorage.getItem("favorites")) || {});

  useEffect(() => {
    if (!user) {
      alert("Please log in to view favorites.");
      navigate("/login");
    }
  }, [user, navigate]);

  const removeFavorite = (movieId) => {
    if (!user) return;

    const userId = user.id;
    const newFavorites = { ...favorites };
    newFavorites[userId] = newFavorites[userId].filter((fav) => fav.id !== movieId);
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  if (!user) return null;

  const userFavorites = favorites[user.id] || [];

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Your Favorite Movies
      </Typography>
      {userFavorites.length === 0 && (
        <Typography>No favorite movies added yet.</Typography>
      )}
      <Grid container spacing={3}>
        {userFavorites.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column", position: "relative" }}>
              <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none" }}>
                <CardMedia
                  component="img"
                  image={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "https://via.placeholder.com/500x750?text=No+Poster"
                  }
                  alt={movie.title || "Movie poster"}
                  sx={{ height: 300, objectFit: "cover" }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {movie.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Release: {movie.release_date || "N/A"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Rating: {movie.vote_average || "N/A"} ⭐
                  </Typography>
                </CardContent>
              </Link>
              <IconButton
                onClick={() => removeFavorite(movie.id)}
                sx={{ position: "absolute", top: 8, right: 8, color: "#333333" }}
              >
                <FavoriteIcon />
              </IconButton>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
};

export default Favorites;