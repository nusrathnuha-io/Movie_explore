import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  CircularProgress,
  Chip
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Cards from "../card/card";

// Styled components
const ListTitle = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(3, 0),
  textTransform: "uppercase",
  fontWeight: "bold",
  position: "relative",
  paddingLeft: theme.spacing(1),
  "&:before": {
    content: '""',
    position: "absolute",
    left: 0,
    top: "50%",
    transform: "translateY(-50%)",
    height: "80%",
    width: "5px",
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius
  }
}));

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { type } = useParams();

  const currentType = type ? type : "popular";

  // Use useCallback to memoize the getData function
  const getData = useCallback(() => {
    setLoading(true);
    fetch(`https://api.themoviedb.org/3/movie/${currentType}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`API Error: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setMovieList(data.results);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [currentType]); // Add currentType as a dependency

  // Now we can safely add getData to the dependency arrays
  useEffect(() => {
    getData();
  }, [getData]);

  // We don't need this second useEffect anymore as currentType changes will trigger getData via its dependency
  // The above useEffect will run when getData changes, which happens when currentType changes

  if (error) {
    return (
      <Container maxWidth="lg">
        <Box mt={4} textAlign="center">
          <Typography color="error" variant="h5">
            Error loading movies: {error}
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box mt={3} mb={5}>
        <Box display="flex" alignItems="center" mb={3}>
          <ListTitle variant="h4" component="h2">
            {currentType.toUpperCase()}
          </ListTitle>
          <Chip 
            label={`${movieList.length} movies`} 
            color="primary" 
            size="small" 
            sx={{ ml: 2 }}
          />
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" my={8}>
            <CircularProgress size={60} />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {movieList.map(movie => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                <Cards movie={movie} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default MovieList;
