import Rental from '../models/Rental.js';
import Movie from '../models/Movie.js';
import User from '../models/User.js';

// @desc Louer un film
// @route POST /api/rentals
// @access Private
export const createRental = async (req, res, next) => {
    try {
        const { movieId } = req.body;
        const userId = req.user._id;
        const movie = await Movie.findById(movieId);
        if (!movie) return res.status(404).json({ message: "Film non trouvé" });
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
        const existingRental = await Rental.findOne({ user: userId, movie: movieId });
        if (existingRental) {
            return res.status(400).json({ message: "Vous avez déjà loué ce film" });
        }
        const rental = await Rental.create({ user: userId, movie: movieId });
        movie.rentalCount += 1;
        await movie.save();
        res.status(201).json({ success: true, data: rental });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc Obtenir les locations d'un utilisateur
// @route GET /api/rentals/my-rentals
// @access Private
export const getMyRentals = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const rentals = await Rental.find({ user: userId }).populate('movie', 'title price');
        res.status(200).json({ success: true, data: rentals });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc Obtenir toutes les locations (admin)
// @route GET /api/rentals
// @access Private/Admin
export const getAllRentals = async (req, res, next) => {
    try {
        const rentals = await Rental.find().populate('user', 'name email').populate('movie', 'title price');
        res.status(200).json({ success: true, data: rentals });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Annuler une location
// @route DELETE /api/rentals/:id
// @access Private
export const cancelRental = async (req, res, next) => {
    try {
        const rentalId = req.params.id;
        const userId = req.user._id;
        const rental = await Rental.findById(rentalId);
        if (!rental) return res.status(404).json({ message: "Location non trouvée" });
        if (rental.user.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Vous n'êtes pas autorisé à annuler cette location" });
        }
        await rental.remove();
        const movie = await Movie.findById(rental.movie);
        if (movie) {
            movie.rentalCount = Math.max(0, movie.rentalCount - 1);
            await movie.save();
        }
        res.status(200).json({ success: true, message: "Location annulée" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc Obtenir les statistiques des locations
// @route GET /api/rentals/stats
// @access Private/Admin
export const getRentalStats = async (req, res, next) => {
    try {
        const stats = await Rental.aggregate([
            {
                $group: {
                    _id: null,
                    totalRentals: { $sum: 1 },
                    totalRevenue: { $sum: '$movie.price' },
                    avgRevenue: { $avg: '$movie.price' }
                }
            }
        ]);

        res.status(200).json({
            success: true,
            data: stats[0] || { 
                totalRentals: 0, 
                totalRevenue: 0,
                avgRevenue: 0 
            }
        });
    } catch (error) {
        next(error);
    }
};
            