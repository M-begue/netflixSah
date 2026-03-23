import { useMemo, useState } from "react";
import moviesData from "../../../data/movies.json";
import Navbar from "../components/common/Navbar";
import MovieHero from "../components/movies/MovieHero";
import MovieList from "../components/movies/MovieList";
import MovieFilter from "../components/movies/MovieFilter";
import Footer from "../components/layout/Footer";
function Home() {
  // On garde juste les données brutes et le filtre de recherche
  const [allMovies] = useState(moviesData);
  const [filteredMovies, setFilteredMovies] = useState(moviesData);

  const featuredMovie = allMovies[0];

  // Filtre par genre pour une section spécifique
  const genre = "Science-Fiction";
  const genreMovies = useMemo(() => {
    return allMovies.filter((m) => m.genre === genre).slice(0, 5);
  }, [genre, allMovies]);

  const recentMovies = useMemo(() => {
    return allMovies.filter((m) => m.year > 2010);
  }, [allMovies]);

  const handleMovieSearch = (movie) => {
    console.log('Film sélectionné via recherche:', movie);
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar movies={allMovies} onSearch={handleMovieSearch} />

      {/* Le Hero principal */}
      <MovieHero movie={featuredMovie} />
      
      {/* Système de filtrage */}
      <MovieFilter movies={allMovies} onFilter={setFilteredMovies} />

      <div className="pb-20 space-y-12">
        <MovieList title="Films disponibles" movies={filteredMovies} />
        <MovieList title={`Films de ${genre}`} movies={genreMovies} />
        <MovieList title="Films récents" movies={recentMovies} />
      </div>

      <Footer />
    </div>
  );
}

export default Home;