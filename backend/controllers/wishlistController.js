
const User = require('../models/User');


const getWishlist = async (req, res) => {
  try {
    const userId = req.userId; 
    const user = await User.findById(userId).populate('wishlist');
    if (!user) return res.status(404).json({ message: 'Përdoruesi nuk u gjet' });

    res.status(200).json(user.wishlist);
  } catch (err) {
    res.status(500).json({ message: 'Gabim në marrjen e wishlist-it', error: err.message });
  }
};


const addToWishlist = async (req, res) => {
  try {
    const userId = req.userId;
    const { bookId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Përdoruesi nuk u gjet' });

    if (user.wishlist.includes(bookId)) {
      return res.status(400).json({ message: 'Libri është tashmë në wishlist' });
    }

    user.wishlist.push(bookId);
    await user.save();

    res.status(200).json({ message: 'Libri u shtua në wishlist' });
  } catch (err) {
    res.status(500).json({ message: 'Gabim në shtimin e librit në wishlist', error: err.message });
  }
};


const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.userId;
    const { bookId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Përdoruesi nuk u gjet' });

    user.wishlist = user.wishlist.filter(id => id.toString() !== bookId);
    await user.save();

    res.status(200).json({ message: 'Libri u hoq nga wishlist' });
  } catch (err) {
    res.status(500).json({ message: 'Gabim në fshirjen e librit nga wishlist', error: err.message });
  }
};

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
};
