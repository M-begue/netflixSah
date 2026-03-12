import Movie from '../models/Movie.js';

// @desc Obtenir tous les films (avec filtres, tri et pagination)
// @route GET /api/movies
// @access Public
export const getAllMovies = async (req, res, next) => {
    try {
        const { search, genre, year, sort, page = 1, limit = 10 } = req.query;
        let query = {};
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }
        if (genre) query.genre = genre;
        if (year) query.year = year;
        let sortOption = {};
        if (sort === 'rating') {
            sortOption = { rating: -1 };
        } else {
            sortOption = { createdAt: -1 };
        }
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const movies = await Movie.find(query)
            .sort(sortOption)
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Movie.countDocuments(query);

        res.status(200).json({
            success: true,
            count: movies.length,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / limit),
            data: movies
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc Obtenir un film par ID
// @route GET /api/movies/:id
// @access Public
export const getMovieById = async (req, res, next) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ message: "Film non trouvé" });
        
        res.status(200).json({ success: true, data: movie });
    } catch (error) {
        res.status(400).json({ success: false, message: "ID invalide" });
    }
};

// @desc Obtenir des films similaires (même genre)
// @route GET /api/movies/:id/similar
// @access Public
export const getSimilarMovies = async (req, res, next) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ message: "Film non trouvé" });

        const similarMovies = await Movie.find({
            genre: { $in: movie.genre },
            _id: { $ne: movie._id }, 
            isAvailable: true
        })
        .sort({ rating: -1 })
        .limit(6);

        res.status(200).json({ success: true, data: similarMovies });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc Obenir les statistiques des films
// @route GET /api/movies/stats
// @access Private/Admin
export const getMovieStats = async (req, res, next) => {
    try {
        const stats = await Movie.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: { $multiply: ['$price', '$rentalCount'] } },
                    averageRating: { $avg: '$rating' },
                    totalMovies: { $sum: 1 }
                }
            }
        ]);
        
        res.status(200).json({ success: true, data: stats[0] || {} });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc Créer un nouveau film
// @route POST /api/movies
// @access Private/Admin
export const createMovie = async (req, res, next) => {
    try {
        const movie = await Movie.create(req.body);
        res.status(201).json({ success: true, data: movie });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc Modifier un film
// @route PUT /api/movies/:id
// @access Private/Admin
export const updateMovie = async (req, res, next) => {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedMovie) return res.status(404).json({ message: "Film non trouvé" });

        res.status(200).json({ success: true, data: updatedMovie });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc Supprimer un film
// @route DELETE /api/movies/:id
// @access Private/Admin
export const deleteMovie = async (req, res, next) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ message: "Film non trouvé" });
        if (movie.rentalCount > 0) {
            return res.status(400).json({ message: "Impossible de supprimer un film déjà loué" });
        }

        await movie.deleteOne();
        res.status(200).json({ success: true, message: "Film supprimé" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};