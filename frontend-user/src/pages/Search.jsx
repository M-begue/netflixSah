import { useState, useMemo } from 'react';
import { useSearchParams} from 'react-router-dom';
import movies from '../../../data/movies.json';
import Navbar from '../components/common/Navbar';
import MovieList from '../components/movies/MovieList';
import Footer from '../components/layout/Footer';

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get('q') || '';
  const genre = searchParams.get('genre') || 'Tous les genres';
  const sort = searchParams.get('sort') || 'relevance';
  const [loading, setLoading] = useState(true);

  const [query] = useState(q);

  useState(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
  
    return () => clearTimeout(timer);
  }, []);

  const genres = useMemo(() => [
    'Tous les genres',
    ...Array.from(new Set(movies.map((m) => m.genre))).sort(),
  ], []);

  const results = useMemo(() => {
    const term = (q || '').trim().toLowerCase();
    let items = movies.filter((m) => {
      if (term === '') return true;
      return (
        m.title.toLowerCase().includes(term)
      );
    });

    if (genre && genre !== 'Tous les genres') {
      items = items.filter((m) => m.genre === genre);
    }

    let sorted = items.slice();
    if (sort === 'title') sorted = sorted.sort((a, b) => a.title.localeCompare(b.title));
    else if (sort === 'year') sorted = sorted.sort((a, b) => (Number(b.year) || 0) - (Number(a.year) || 0));
    else if (sort === 'rating') sorted = sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));

    return sorted;
  }, [q, genre, sort]);


  if(loading) {
    return (
      <div className="bg-black text-white flex flex-col h-screen overflow-y-auto">
        <Navbar movies={movies} onSearch={() => {}} cartItems={[]} onAddToCart={() => {}} onRemoveFromCart={() => {}} />
        <div className="w-24 h-24 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-xl">Recherche du film...</p>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar movies={movies} onSearch={() => {}} cartItems={[]} onAddToCart={() => {}} onRemoveFromCart={() => {}} />

      <div className="container mx-auto px-4 py-8 pt-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 px-4">{query ? `Résultats pour « ${q} »` : 'Tous les films'}</h2>

        <div className="flex gap-4 items-center mb-4 px-4">
          <select
            value={genre}
            onChange={(e) => setSearchParams({ q: q || undefined, genre: e.target.value, sort })}
            className="bg-gray-800 px-3 py-2 rounded"
          >
            {genres.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) => setSearchParams({ q: q || undefined, genre: genre !== 'Tous les genres' ? genre : undefined, sort: e.target.value })}
            className="bg-gray-800 px-3 py-2 rounded"
          >
            <option value="title">Titre</option>
            <option value="year">Année</option>
            <option value="rating">Note</option>
          </select>

          <div className="mr-auto text-gray-300">{results.length} film(s) trouvé(s)</div>
        </div>

        <MovieList title={""} movies={results} onAddToCart={() => {}} />
      </div>

      <Footer />
    </div>
  );
}

export default Search;
