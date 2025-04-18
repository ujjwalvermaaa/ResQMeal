import Restaurant from '../models/Restaurant.js';
import FoodItem from '../models/FoodItem.js';

// @desc    Get all restaurants
// @route   GET /api/restaurants
// @access  Public
export const getRestaurants = async (req, res) => {
  try {
    const { cuisine, search, sort } = req.query;
    
    const query = { isActive: true };
    
    if (cuisine) {
      query.cuisineType = { $in: [cuisine] };
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { 'location.address': { $regex: search, $options: 'i' } },
        { 'location.city': { $regex: search, $options: 'i' } },
      ];
    }
    
    let sortOption = {};
    if (sort === 'rating-desc') {
      sortOption = { rating: -1 };
    } else if (sort === 'name-asc') {
      sortOption = { name: 1 };
    } else {
      sortOption = { createdAt: -1 };
    }
    
    const restaurants = await Restaurant.find(query).sort(sortOption);
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get featured restaurants
// @route   GET /api/restaurants/featured
// @access  Public
export const getFeaturedRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({ isActive: true })
      .sort({ rating: -1 })
      .limit(6);
      
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get restaurant by ID
// @route   GET /api/restaurants/:id
// @access  Public
export const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    
    if (restaurant) {
      res.json(restaurant);
    } else {
      res.status(404).json({ message: 'Restaurant not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get restaurant's food items
// @route   GET /api/restaurants/:id/foods
// @access  Public
export const getRestaurantFoods = async (req, res) => {
  try {
    const foods = await FoodItem.find({
      restaurantId: req.params.id,
      isAvailable: true,
    }).populate('restaurantId', 'name logo');
    
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a restaurant
// @route   POST /api/restaurants
// @access  Private/Admin
export const createRestaurant = async (req, res) => {
  try {
    const restaurant = new Restaurant(req.body);
    const createdRestaurant = await restaurant.save();
    res.status(201).json(createdRestaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a restaurant
// @route   PUT /api/restaurants/:id
// @access  Private/Restaurant or Admin
export const updateRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    
    if (restaurant) {
      // Check if the user is the owner or admin
      if (restaurant.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(401).json({ message: 'Not authorized' });
      }
      
      restaurant.name = req.body.name || restaurant.name;
      restaurant.description = req.body.description || restaurant.description;
      restaurant.cuisineType = req.body.cuisineType || restaurant.cuisineType;
      restaurant.location = req.body.location || restaurant.location;
      restaurant.contact = req.body.contact || restaurant.contact;
      restaurant.openingHours = req.body.openingHours || restaurant.openingHours;
      restaurant.logo = req.body.logo || restaurant.logo;
      restaurant.images = req.body.images || restaurant.images;
      restaurant.isActive = req.body.isActive !== undefined ? req.body.isActive : restaurant.isActive;
      
      const updatedRestaurant = await restaurant.save();
      res.json(updatedRestaurant);
    } else {
      res.status(404).json({ message: 'Restaurant not found' });
    }
  } catch (error) {
   