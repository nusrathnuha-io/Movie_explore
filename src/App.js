import './App.css';
import { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material';
import { AuthProvider } from './context/AuthContext';
import Header from './component/header/header';
import Home from './pages/home/home';
import MovieList from './component/movieList/movieList';
import Movie from './pages/movieDetail/movie';
import Login from './pages/login/Login';
import Signup from './pages/Signup';
import SearchResults from './pages/SearchResults';
import Favorites from './pages/Favorites';

function App() {
  const [mode, setMode] = useState(localStorage.getItem("theme") || "light");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === "light" ? "#f5c518" : "#ff9800",
          },
          background: {
            default: mode === "light" ? "#ffffff" : "#121212",
            paper: mode === "light" ? "#ffffff" : "#1e1e1e",
          },
          text: {
            primary: mode === "light" ? "#000000" : "#ffffff",
            secondary: mode === "light" ? "#555555" : "#bbbbbb",
          },
        },
      }),
    [mode]
  );

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Router>
            <Routes>
              <Route index element={<><Header mode={mode} setMode={setMode} /><Home /></>} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/movie/:id" element={<><Header mode={mode} setMode={setMode} /><Movie /></>} />
              <Route path="/movies/:type" element={<><Header mode={mode} setMode={setMode} /><MovieList /></>} />
              <Route path="/search/:query" element={<><Header mode={mode} setMode={setMode} /><SearchResults /></>} />
              <Route path="/favorites" element={<><Header mode={mode} setMode={setMode} /><Favorites /></>} />
              <Route path="/*" element={<h1>Error Page</h1>} />
            </Routes>
          </Router>
        </div>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;