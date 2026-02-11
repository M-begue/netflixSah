import { useMemo, useState } from "react";
import movies from "../../../data/movies.json";
import Navbar from "../components/common/Navbar";
import MovieHero from "../components/movies/MovieHero";
import MovieList from "../components/movies/MovieList";
import Footer from "../components/layout/Footer";

function Home() {
  const [popularMovies] = useState(() => {
    return [...movies].sort(() => Math.random() - 0.5).slice(0, 5);
  });
  const featuredMovie = movies[0];

  const genre = "Science-Fiction";
  const genreMovies = useMemo(() => {
    return movies.filter((m) => m.genre === genre).slice(0, 5);
  }, [genre]);

  const recentMovies = useMemo(() => {
    return movies.filter((m) => m.year > 2010);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <MovieHero movie={featuredMovie} />
      
      <MovieList title="Films populaires" movies={popularMovies} />
      <MovieList title={`Films de ${genre}`} movies={genreMovies} />
      <MovieList title="Films récents" movies={recentMovies} />

      <Footer />
    </div>
  );
}

export default Home;