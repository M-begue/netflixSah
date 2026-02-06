import React from "react";
import MovieCard from "./MovieCard";

function MovieList({ movies }) {
 return (
 <div className="grid">
 {movies.map(movie => (
 <MovieCard key={movie.id} movie={movie} />
 ))}
 </div>
 );
}

export default MovieList;