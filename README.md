# MOVIE_EXPLORE

MOVIE_EXPLORE is a React-based web application for browsing, searching, and saving favorite movies using The Movie Database (TMDB) API. It features a modern, responsive UI with Material-UI (MUI) styling, light/dark theme support, user authentication, and a favorites system stored in localStorage. Users can explore movie details, toggle favorites with dark-themed buttons, and navigate seamlessly.

## Features

- **Browse Movies**: View popular, top-rated, and upcoming movies on the homepage.
- **Search Movies**: Search by title with real-time results.
- **Movie Details**: View detailed movie info (posters, ratings, genres, synopsis, production companies).
- **Favorites System**: Add/remove movies from a personalized favorites list, stored per user in localStorage. Favorite buttons use a dark `#333333` color for visibility in both themes.
- **User Authentication**: Log in or sign up to access favorites.
- **Light/Dark Theme**: Toggle between light and dark themes.
- **Responsive Design**: Optimized for mobile and desktop with MUI components.
- **Skeleton Loading**: Display placeholders during data fetching.
- **Navigation**: Includes a homepage button linking to the main page and IMDb links.

## Tech Stack

- **Frontend**: React, React Router DOM
- **Styling**: Material-UI (MUI) for components and responsive design
- **API**: The Movie Database (TMDB) API
- **State Management**: React Context (`AuthContext`) for authentication
- **Storage**: localStorage for favorites
- **Loading States**: react-loading-skeleton
- **Icons**: MUI Icons, Font Awesome
- **Build Tool**: Webpack (via Create React App)

## API Usage

The app integrates with [The Movie Database (TMDB) API](https://www.themoviedb.org/documentation/api) to fetch movie data using these endpoints:

- **Movie Details**: `GET /movie/{movie_id}` (e.g., `movie.js` for title, poster, synopsis).
- **Search Movies**: `GET /search/movie` (e.g., `SearchResults.js` for query results).
- **Movie Lists**: `GET /movie/{type}` (e.g., `popular`, `top_rated`, `upcoming` in `movieList.js`).

### API Key

The app uses TMDB API keys (e.g., `4e44d9029b1270a757cddc766a1bcb63`). To use your own key:

1. Sign up at [TMDB](https://www.themoviedb.org/) and obtain an API key.
2. Create a `.env` file in the project root:

   ```bash
   REACT_APP_TMDB_API_KEY=your_api_key_here
   ```

3. Update API calls in `movie.js`, `SearchResults.js`, and `movieList.js` to use `process.env.REACT_APP_TMDB_API_KEY`.

**Note**: Standardize the API key across files (e.g., replace `39c1b598229f0a510889805766802256` in `SearchResults.js` if needed).

## Project Setup

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Git

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-username/MOVIE_EXPLORE.git
   cd MOVIE_EXPLORE
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:

   - Create a `.env` file:

     ```bash
     echo "REACT_APP_TMDB_API_KEY=your_api_key_here" > .env
     ```

4. **Run the Application**:

   ```bash
   npm start
   ```

   - Opens at `http://localhost:3000`.

5. **Build for Production**:

   ```bash
   npm run build
   ```

   - Outputs to `build/`.

### Troubleshooting

- **Module Not Found**:
  - Run `npm install` to ensure `node_modules` is present.
  - Verify `src/context/AuthContext.js` exists.
  - Check import paths (e.g., `../../context/AuthContext` in `Cards.js`).
- **API Errors**:
  - Ensure TMDB API key is valid in `.env`.
  - Inspect network requests in browser dev tools.
- **Styling Issues**:
  - Confirm `@mui/material` and `@mui/icons-material` are installed.
  - Ensure `public/index.html` includes Font Awesome:

    ```html
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
    ```

## Project Structure

```plaintext
MOVIE_EXPLORE/
├── src/
│   ├── component/
│   │   ├── card/
│   │   │   └── Cards.js           # Movie card with MUI styling, favorite button
│   │   ├── header/
│   │   │   └── header.js         # Navigation bar with theme toggle
│   │   └── movieList/
│   │       └── movieList.js      # Fetches and displays movie lists
│   ├── context/
│   │   └── AuthContext.js        # Authentication context
│   ├── pages/
│   │   ├── favorites/
│   │   │   └── Favorites.js      # User favorites with remove button
│   │   ├── home/
│   │   │   └── home.js           # Homepage with featured movies
│   │   ├── login/
│   │   │   └── Login.js          # User login
│   │   ├── movieDetail/
│   │   │   ├── movie.js          # Movie details with favorite, homepage buttons
│   │   │   └── movie.css         # Custom styles for movie details
│   │   ├── search/
│   │   │   └── SearchResults.js  # Search results
│   │   └── Signup.js             # User signup
│   ├── App.js                    # Routing and theme provider
│   ├── App.css                   # Global styles
│   ├── index.js                  # Entry point
│   └── index.css                 # Global CSS
├── public/
│   └── index.html                # HTML template with Font Awesome
├── .env                          # Environment variables
├── package.json                  # Dependencies and scripts
└── README.md                     # Project documentation
```

## Features Implemented

### 1. Movie Browsing and Details

- **Homepage** (`home.js`): Curated movie lists using `movieList.js` and `Cards.js`.
- **Movie Details** (`movie.js`): F
