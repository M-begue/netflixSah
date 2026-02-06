import React from "react";
import Button from "../common/Button";

function MovieCard({ movie }) {
 return (
 <div className="card">
 <img src={movie.poster} />
 <h3>{movie.title}</h3>
 <Button>Louer</Button>
 </div>
 );
}

export default MovieCard;