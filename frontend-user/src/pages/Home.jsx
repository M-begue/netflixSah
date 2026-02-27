import { useMemo, useState } from "react";
import movies from "../../../data/movies.json";
import Navbar from "../components/common/Navbar";
import MovieHero from "../components/movies/MovieHero";
import MovieList from "../components/movies/MovieList";
import MovieFilter from "../components/movies/MovieFilter";
import Footer from "../components/layout/Footer";

function Home() {
  const [allMovies] = useState(movies);
  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (movie) => {
    // Vérifier si le film n'est pas déjà dans le panier
    if (!cartItems.find((item) => item.id === movie.id)) {
      setCartItems([...cartItems, movie]);
    }
  };

  const removeFromCart = (movieId) => {
    setCartItems(cartItems.filter((item) => item.id !== movieId));
  };
  const featuredMovie = allMovies[0];

  const genre = "Science-Fiction";
  const genreMovies = useMemo(() => {
    return allMovies.filter((m) => m.genre === genre).slice(0, 5);
  }, [genre, allMovies]);

  const recentMovies = useMemo(() => {
    return allMovies.filter((m) => m.year > 2010);
  }, [allMovies]);

  const handleMovieSearch = (movie) => {
    console.log('Film sélectionné:', movie);
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar movies={allMovies} onSearch={handleMovieSearch} cartItems={cartItems} onAddToCart={addToCart} onRemoveFromCart={removeFromCart} />
      <MovieHero movie={featuredMovie} />
      
      <MovieFilter movies={allMovies} onFilter={setFilteredMovies} />
      <MovieList title="Films disponibles" movies={filteredMovies} onAddToCart={addToCart} />
      <MovieList title={`Films de ${genre}`} movies={genreMovies} onAddToCart={addToCart} />
      <MovieList title="Films récents" movies={recentMovies} onAddToCart={addToCart} />

      <Footer />
    </div>
  );
}

export default Home;