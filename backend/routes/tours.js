 
const express = require('express');
const router = express.Router();
const Tour = require('../models/Tour');
const Booking = require('../models/Booking');

// Get all tours
router.get('/', async (req, res) => {
  try {
    const tours = await Tour.find();
    res.json(tours);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a tour
router.post('/', async (req, res) => {
  const tour = new Tour({
    name: req.body.name,
    destination: req.body.destination,
    price: req.body.price,
    description: req.body.description,
    duration: req.body.duration,
  });
  try {
    const newTour = await tour.save();
    res.status(201).json(newTour);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Book a tour
router.post('/book', async (req, res) => {
  const booking = new Booking({
    tourId: req.body.tourId,
    userName: req.body.userName,
    email: req.body.email,
  });
  try {
    const newBooking = await booking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;