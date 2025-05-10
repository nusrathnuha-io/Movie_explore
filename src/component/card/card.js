import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardMedia, CardContent, Typography, IconButton, Box } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useAuth } from "../../context/AuthContext";

const Cards = ({ movie }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("favorites")) || {});
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  const toggleFavorite = () => {
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
        title: movie.original_title,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
      });
    }

    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  return (
    <>
      {isLoading ? (
        <Box sx={{ width: { xs: "100%", sm: 250 }, mx: "auto" }}>
          <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <Skeleton height={300} duration={2} />
          </SkeletonTheme>
        </Box>
      ) : (
        <Card
          sx={{
            width: { xs: "100%", sm: 250 },
            mx: "auto",
            bgcolor: "background.paper",
            boxShadow: 3,
            position: "relative",
            "&:hover": { boxShadow: 6 },
          }}
        >
          <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none" }}>
            <CardMedia
              component="img"
              height="300"
              image={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                  : "https://via.placeholder.com/500x750?text=No+Poster"
              }
              alt={movie.original_title || "Movie poster"}
              sx={{ objectFit: "cover" }}
            />
            <CardContent sx={{ bgcolor: "background.paper", color: "text.primary" }}>
              <Typography variant="h6" gutterBottom>
                {movie.original_title || ""}
              </Typography>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" color="text.secondary">
                  {movie.release_date || ""}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {movie.vote_average || ""} <i className="fas fa-star" />
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {movie.overview ? movie.overview.slice(0, 118) + "..." : ""}
              </Typography>
            </CardContent>
          </Link>
          <IconButton
            onClick={toggleFavorite}
            sx={{ position: "absolute", top: 8, right: 8, color: "#333333" }}
          >
            {user && favorites[user.id]?.some((fav) => fav.id === movie.id) ? (
              <FavoriteIcon />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
        </Card>
      )}
    </>
  );
};

export default Cards;