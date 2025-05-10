import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Box, Grid, Card, CardMedia, CardContent, Typography, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useAuth } from "../context/AuthContext";

const SearchResults = () => {
  const { query } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || {});
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=39c1b598229f0a510889805766802256&language=en-US&query=${encodeURIComponent(query)}`
        );
        if (!response.ok) throw new Error("Failed to fetch movies");
        const data = await response.json();
        setMovies(data.results || []);
        setError(null);
      } catch (err) {
        setError(err.message);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  const toggleFavorite = (movie) => {
    if (!user) {
      alert("Please log in to add movies to favorites.");
      navigate("/login");
      return;
    }

    const userId = user.id;
    const newFavorites = { ...favorites };

    if (!newFavorites[userId]) {
      newFavorites[userId] = [];
    }

    const isFavorited = newFavorites[userId].some((fav) => fav.id === movie.id);
    if (isFavorited) {
      newFavorites[userId] = newFavorites[userId].filter((fav) => fav.id !== movie.id);
    } else {
      newFavorites[userId].push({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
      });
    }

    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Search Results for "{decodeURIComponent(query)}"
      </Typography>
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">Error: {error}</Typography>}
      {!loading && !error && movies.length === 0 && (
        <Typography>No movies found for "{decodeURIComponent(query)}"</Typography>
      )}
      <Grid container spacing={3}>
        {movies.map((movie) => (
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
                onClick={() => toggleFavorite(movie)}
                sx={{ position: "absolute", top: 8, right: 8 }}
              >
                {user && favorites[user.id]?.some((fav) => fav.id === movie.id) ? (
                  <FavoriteIcon color="error" />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </IconButton>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SearchResults;