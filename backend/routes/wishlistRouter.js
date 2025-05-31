const express = require('express');
const router = express.Router();
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} = require('../controllers/wishlistController');

// Rrutat e wishlist
router.get('/', getWishlist);
router.post('/add', addToWishlist);
router.delete('/remove/:bookId', removeFromWishlist);

module.exports = router;
