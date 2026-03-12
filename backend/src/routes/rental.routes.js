import express from 'express';
import {
getAllRentals,
getMyRentals,
getRentalStats,
createRental,
cancelRental
} from '../controllers/rental.controller.js';
// import { protect, admin } from '../middleware/auth.middleware.js'; // Séance 9
const router = express.Router();
// Routes publiques
router.get('/', getAllRentals);
router.get('/my-rentals', getMyRentals); // TODO: Protéger avec admin (séance 9)
router.get('/stats', getRentalStats);
router.post('/', createRental);
router.delete('/:id', cancelRental);
export default router;3