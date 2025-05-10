import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  IconButton,
  Box,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useAuth } from '../../context/AuthContext';

const Header = ({ mode, setMode }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("theme", newMode);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search/${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignout = () => {
    logout();
    // Redirect to homepage instead of login page
    navigate("/");
  };

  return (
    <AppBar position="sticky" color="primary" elevation={3}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, sm: 2 }, overflow: "auto" }}>
          <Link to="/">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"
              alt="IMDb Logo"
              style={{ height: "40px" }}
            />
          </Link>
          <Link to="/movies/popular" style={{ textDecoration: "none", color: "inherit" }}>
            <Typography variant="body1" sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
              Popular
            </Typography>
          </Link>
          <Link to="/movies/top_rated" style={{ textDecoration: "none", color: "inherit" }}>
            <Typography variant="body1" sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
              Top Rated
            </Typography>
          </Link>
          <Link to="/movies/upcoming" style={{ textDecoration: "none", color: "inherit" }}>
            <Typography variant="body1" sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
              Upcoming
            </Typography>
          </Link>
          {user && (
            <Link to="/favorites" style={{ textDecoration: "none", color: "inherit" }}>
              <Typography variant="body1" sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
                Favorites
              </Typography>
            </Link>
          )}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, sm: 2 } }}>
          <TextField
            variant="outlined"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            size="small"
            sx={{
              backgroundColor: "background.paper",
              borderRadius: 1,
              width: { xs: "120px", sm: "200px" },
              display: { xs: "none", sm: "flex" }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          {/* Mobile search icon */}
          <IconButton 
            color="inherit" 
            sx={{ display: { xs: "flex", sm: "none" } }}
            onClick={() => navigate("/search")}
          >
            <SearchIcon />
          </IconButton>
          <Button
            variant="contained"
            color="secondary"
            onClick={user ? handleSignout : handleLogin}
            sx={{ whiteSpace: "nowrap" }}
          >
            {user ? "Sign Out" : "Login"}
          </Button>
          <IconButton onClick={toggleTheme} color="inherit">
            {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;