import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { 
  Box, 
  Typography, 
  IconButton, 
  Container, 
  Grid, 
  Paper, 
  Chip, 
  Divider, 
  Stack, 
  Button,
  CircularProgress,
  styled
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import HomeIcon from "@mui/icons-material/Home";
import StarIcon from "@mui/icons-material/Star";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useAuth } from "../../context/AuthContext";

// Styled components
const BackdropImage = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "500px",
  objectFit: "cover",
  objectPosition: "top center",
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
  [theme.breakpoints.down("md")]: {
    height: "300px",
  }
}));

const PosterImage = styled("img")(({ theme }) => ({
  width: "100%",
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[10],
  objectFit: "cover",
}));

const GenreChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  fontWeight: 500,
}));

const ActionButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1, 1, 1, 0),
  padding: theme.spacing(0.75, 2),
  borderRadius: theme.shape.borderRadius * 5,
  fontWeight: 600,
}));

const CompanyLogo = styled("img")(({ theme }) => ({
  maxWidth: "100%",
  height: "60px",
  objectFit: "contain",
  marginBottom: theme.spacing(1),
}));

const Movie = () => {
  const [currentMovieDetail, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("favorites")) || {});
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
      );
      if (!response.ok) throw new Error("Failed to fetch movie details");
      const data = await response.json();
      setMovie(data);
    } catch (error) {
      console.error(error);
      setMovie(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, [getData]);

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

    const isFavorited = newFavorites[userId].some((fav) => fav.id === currentMovieDetail.id);
    if (isFavorited) {
      newFavorites[userId] = newFavorites[userId].filter((fav) => fav.id !== currentMovieDetail.id);
    } else {
      newFavorites[userId].push({
        id: currentMovieDetail.id,
        title: currentMovieDetail.title,
        poster_path: currentMovieDetail.poster_path,
        release_date: currentMovieDetail.release_date,
        vote_average: currentMovieDetail.vote_average,
      });
    }

    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  const isFavorited = user && favorites[user.id]?.some((fav) => fav.id === currentMovieDetail?.id);

  if (loading) {
    return (
      <Box sx={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        minHeight: "70vh" 
      }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (!currentMovieDetail) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper sx={{ p: 3, textAlign: "center" }} elevation={2}>
          <Typography variant="h6">Movie details not found</Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Backdrop Image */}
      <Box sx={{ mb: 4, position: "relative", overflow: "hidden" }}>
        <BackdropImage
          component="img"
          src={
            currentMovieDetail.backdrop_path
              ? `https://image.tmdb.org/t/p/original${currentMovieDetail.backdrop_path}`
              : "/placeholder-backdrop.jpg" // Replace with your placeholder
          }
          alt={currentMovieDetail.title ? `${currentMovieDetail.title} backdrop` : "Movie backdrop"}
        />
      </Box>

      <Grid container spacing={4}>
        {/* Left Column - Poster */}
        <Grid item xs={12} md={4}>
          <Box sx={{ position: "relative" }}>
            <PosterImage
              src={
                currentMovieDetail.poster_path
                  ? `https://image.tmdb.org/t/p/original${currentMovieDetail.poster_path}`
                  : "/placeholder-poster.jpg" // Replace with your placeholder
              }
              alt={currentMovieDetail.title ? `${currentMovieDetail.title} poster` : "Movie poster"}
            />
            
            <IconButton
              onClick={toggleFavorite}
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                bgcolor: "rgba(255,255,255,0.8)",
                "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
                color: isFavorited ? "error.main" : "action.active"
              }}
              size="large"
            >
              {isFavorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </Box>
        </Grid>

        {/* Right Column - Details */}
        <Grid item xs={12} md={8}>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
            {currentMovieDetail.original_title || ""}
          </Typography>
          
          {currentMovieDetail.tagline && (
            <Typography 
              variant="h6" 
              sx={{ mb: 2, fontStyle: "italic", color: "text.secondary" }}
            >
              {currentMovieDetail.tagline}
            </Typography>
          )}

          <Stack direction="row" alignItems="center" spacing={3} sx={{ mb: 2 }}>
            {currentMovieDetail.vote_average > 0 && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <StarIcon sx={{ color: "warning.main", mr: 0.5 }} />
                <Typography variant="h6" component="span" sx={{ fontWeight: 600 }}>
                  {currentMovieDetail.vote_average.toFixed(1)}
                </Typography>
                <Typography variant="body2" sx={{ ml: 0.5, color: "text.secondary" }}>
                  ({currentMovieDetail.vote_count} votes)
                </Typography>
              </Box>
            )}

            {currentMovieDetail.runtime > 0 && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <AccessTimeIcon sx={{ mr: 0.5 }} />
                <Typography variant="body1">
                  {Math.floor(currentMovieDetail.runtime / 60)}h {currentMovieDetail.runtime % 60}m
                </Typography>
              </Box>
            )}

            {currentMovieDetail.release_date && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CalendarTodayIcon sx={{ mr: 0.5 }} />
                <Typography variant="body1">
                  {new Date(currentMovieDetail.release_date).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                  })}
                </Typography>
              </Box>
            )}
          </Stack>

          <Box sx={{ mb: 2 }}>
            {currentMovieDetail.genres?.map((genre) => (
              <GenreChip 
                key={genre.id} 
                label={genre.name} 
                size="small" 
                color="primary" 
                variant="outlined"
              />
            ))}
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
            Synopsis
          </Typography>
          <Typography variant="body1" paragraph sx={{ mb: 3 }}>
            {currentMovieDetail.overview || "No synopsis available."}
          </Typography>

          <Box sx={{ mt: 4 }}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <ActionButton
                variant="contained"
                color="primary"
                component={Link}
                to="/"
                startIcon={<HomeIcon />}
              >
                Home
              </ActionButton>
              
              {currentMovieDetail.imdb_id && (
                <ActionButton
                  variant="outlined"
                  color="warning"
                  href={`https://www.imdb.com/title/${currentMovieDetail.imdb_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  startIcon={<OpenInNewIcon />}
                >
                  IMDb
                </ActionButton>
              )}
            </Stack>
          </Box>
        </Grid>
      </Grid>

      {/* Production Companies */}
      {currentMovieDetail.production_companies?.length > 0 && (
        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
            Production Companies
          </Typography>
          
          <Grid container spacing={3}>
            {currentMovieDetail.production_companies
              .filter(company => company.logo_path)
              .map((company) => (
                <Grid item xs={6} sm={4} md={3} lg={2} key={company.id}>
                  <Paper 
                    elevation={1} 
                    sx={{ 
                      p: 2, 
                      height: "100%", 
                      display: "flex", 
                      flexDirection: "column", 
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center"
                    }}
                  >
                    <CompanyLogo
                      src={`https://image.tmdb.org/t/p/original${company.logo_path}`}
                      alt={`${company.name} logo`}
                    />
                    <Typography variant="body2">{company.name}</Typography>
                  </Paper>
                </Grid>
              ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default Movie;