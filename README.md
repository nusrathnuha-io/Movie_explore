MOVIE_EXPLORE
MOVIE_EXPLORE is a React-based web application that allows users to browse, search, and save their favorite movies using The Movie Database (TMDB) API. The app features a modern UI with Material-UI (MUI) styling, light/dark theme support, user authentication, and a favorites system stored in localStorage. Users can explore movie details, toggle favorites with a consistent dark-themed button, and navigate seamlessly between pages.
Features

Browse Movies: View popular, top-rated, and upcoming movies on the homepage.
Search Movies: Search for movies by title with real-time results.
Movie Details: Access detailed movie information, including posters, ratings, release dates, genres, synopses, and production companies.
Favorites System: Add or remove movies from a personalized favorites list, stored per user in localStorage. Favorite buttons use a dark #333333 color for visibility in both light and dark themes.
User Authentication: Log in or sign up to access favorites and personalized features.
Light/Dark Theme: Toggle between light and dark themes for a comfortable viewing experience.
Responsive Design: Optimized for mobile and desktop with MUI components.
Skeleton Loading: Display skeleton placeholders during data fetching for a smooth UX.
Navigation: Seamless routing with a homepage button linking to the main page and IMDb links for external movie details.

Tech Stack

Frontend: React, React Router DOM
Styling: Material-UI (MUI) for components and responsive design
API: The Movie Database (TMDB) API for movie data
State Management: React Context (AuthContext) for authentication
Storage: localStorage for storing user favorites
Loading States: react-loading-skeleton for placeholders
Icons: MUI Icons, Font Awesome
Build Tool: Webpack (via Create React App)

API Usage
MOVIE_EXPLORE integrates with The Movie Database (TMDB) API to fetch movie data. The app uses the following endpoints:

Movie Details: GET /movie/{movie_id} (e.g., in movie.js to fetch details like title, poster, synopsis).
Search Movies: GET /search/movie (e.g., in SearchResults.js for query-based results).
Movie Lists: GET /movie/{type} (e.g., popular, top_rated, upcoming in movieList.js).

API Key
The app uses TMDB API keys (e.g., 4e44d9029b1270a757cddc766a1bcb63 in movie.js). To use your own key:

Sign up at TMDB and obtain an API key.
Create a .env file in the project root:REACT_APP_TMDB_API_KEY=your_api_key_here


Update API calls in movie.js, SearchResults.js, and movieList.js to use process.env.REACT_APP_TMDB_API_KEY.

Note: Standardize the API key across files for consistency (e.g., replace 39c1b598229f0a510889805766802256 in SearchResults.js if needed).
Project Setup
Prerequisites

Node.js (v14 or higher)
npm (v6 or higher)
Git

Installation

Clone the Repository:
git clone https://github.com/your-username/MOVIE_EXPLORE.git
cd MOVIE_EXPLORE


Install Dependencies:
npm install


Set Up Environment Variables:

Create a .env file in the root directory.
Add your TMDB API key:REACT_APP_TMDB_API_KEY=your_api_key_here




Run the Application:
npm start


The app will open at http://localhost:3000 in your default browser.


Build for Production:
npm run build


The optimized build will be in the build/ directory.



Troubleshooting Setup

Module Not Found:
Ensure node_modules is installed (npm install).
Verify src/context/AuthContext.js exists.
Check import paths (e.g., ../../context/AuthContext in Cards.js).


API Errors:
Confirm your TMDB API key is valid and added to .env.
Check network requests in browser dev tools.


Styling Issues:
Ensure @mui/material and @mui/icons-material are installed.
Verify public/index.html includes Font Awesome:<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />





Project Structure
MOVIE_EXPLORE/
├── src/
│   ├── component/
│   │   ├── card/
│   │   │   └── Cards.js           # Movie card component with MUI styling and favorite button
│   │   ├── header/
│   │   │   └── header.js         # Navigation bar with theme toggle
│   │   └── movieList/
│   │       └── movieList.js      # Fetches and displays movie lists
│   ├── context/
│   │   └── AuthContext.js        # Authentication context for user management
│   ├── pages/
│   │   ├── favorites/
│   │   │   └── Favorites.js      # Displays user favorites with remove functionality
│   │   ├── home/
│   │   │   └── home.js           # Homepage with featured movies
│   │   ├── login/
│   │   │   └── Login.js          # User login page
│   │   ├── movieDetail/
│   │   │   ├── movie.js          # Movie details page with favorite and homepage buttons
│   │   │   └── movie.css         # Custom styles for movie details
│   │   ├── searchResults.js
│   │   │    # Search results page
│   │   └── Signup.js             # User signup page
│   ├── App.js                    # Main app with routing and theme provider
│   ├── App.css                   # Global styles
│   ├── index.js                  # Entry point
│   └── index.css                 # Global CSS
├── public/
│   └── index.html                # HTML template with Font Awesome
├── .env                          # Environment variables (API key)
├── package.json                  # Dependencies and scripts
└── README.md                     # Project documentation

Features Implemented
1. Movie Browsing and Details

Homepage (home.js): Displays curated movie lists (popular, top-rated, upcoming) using movieList.js and Cards.js.
Movie Details (movie.js): Fetches detailed movie data (title, poster, backdrop, genres, runtime, synopsis, production companies) via TMDB API. Includes a "Home" button (Link to /) and an IMDb link.
Cards (Cards.js): Renders movie cards with MUI styling, skeleton loaders, and a favorite button. Links to /movie/:id.

2. Search Functionality

Search Page (SearchResults.js): Allows users to search movies by title, displaying results in a grid of cards.

3. Favorites System

Add/Remove Favorites:
Cards.js: Toggle favorites on movie cards with FavoriteIcon/FavoriteBorderIcon (dark #333333 color).
movie.js: Toggle favorites on movie details page with the same dark-themed button.
Favorites.js: Displays user favorites in a grid, with a remove button (dark #333333).


Storage: Favorites are stored in localStorage per user.id with fields: id, title, poster_path, release_date, vote_average.
Authentication: Requires login to access favorites; redirects to /login if unauthenticated.

4. User Authentication

Login (Login.js): Authenticates users via AuthContext.
Signup (Signup.js): Registers new users.
Context (AuthContext.js): Manages user state across the app.

5. Theme Support

Light/Dark Toggle: Implemented in header.js and App.js, using MUI’s ThemeProvider.
Styling: MUI components ensure responsiveness and theme-aware colors (e.g., text.primary, background.paper).

6. UI/UX Enhancements

Skeleton Loaders: react-loading-skeleton in Cards.js for smooth loading states.
Responsive Design: MUI’s responsive props (e.g., xs, sm) in Cards.js, Favorites.js, and movie.js.
Consistent Favorites UI: Dark #333333 favorite buttons across Cards.js, movie.js, and Favorites.js for visibility in both themes.

Contributing
Contributions are welcome! To contribute:

Fork the repository.
Create a feature branch (git checkout -b feature/your-feature).
Commit changes (git commit -m "Add your feature").
Push to the branch (git push origin feature/your-feature).
Open a pull request.

Please ensure code follows ESLint rules and includes tests where applicable.
License
This project is licensed under the MIT License. See the LICENSE file for details.
Contact
For questions or feedback, open an issue on GitHub or contact [your-username].

Built with ❤️ using React and TMDB API.
