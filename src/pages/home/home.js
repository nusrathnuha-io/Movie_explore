import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import MovieList from "../../component/movieList/movieList";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=39c1b598229f0a510889805766802256&language=en-US"
    )
      .then((res) => res.json())
      .then((data) => setPopularMovies(data.results));
  }, []);

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <Box sx={{ maxWidth: "100%", mx: "auto" }}>
        <Carousel
          showThumbs={false}
          autoPlay={true}
          transitionTime={3}
          infiniteLoop={true}
          showStatus={false}
        >
          {popularMovies.map((movie) => (
            <Link
              key={movie.id}
              style={{ textDecoration: "none", color: "inherit" }}
              to={`/movie/${movie.id}`}
            >
              <Box
                sx={{
                  position: "relative",
                  height: { xs: "50vh", sm: "70vh" },
                  overflow: "hidden",
                }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
                  alt={movie.original_title || "Movie backdrop"}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    bgcolor: "rgba(0, 0, 0, 0.6)",
                    color: "white",
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  <Typography variant="h5" fontWeight="bold">
                    {movie?.original_title || ""}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <Typography variant="body2">
                      {movie?.release_date || ""}
                    </Typography>
                    <Typography variant="body2">
                      {movie?.vote_average || ""}{" "}
                      <span role="img" aria-label="star">
                        ⭐
                      </span>
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ display: { xs: "none", sm: "block" } }}>
                    {movie?.overview || ""}
                  </Typography>
                </Box>
              </Box>
            </Link>
          ))}
        </Carousel>
        <MovieList />
      </Box>
    </Box>
  );
};

export default Home;