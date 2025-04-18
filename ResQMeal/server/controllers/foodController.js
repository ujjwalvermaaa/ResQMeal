import FoodItem from '../models/FoodItem.js';
import Restaurant from '../models/Restaurant.js';

// @desc    Get all food items
// @route   GET /api/foods
// @access  Public
export const getFoods = async (req, res) => {
  try {
    const { category, minPrice, maxPrice, sort, restaurant, search } = req.query;
    
    const query = { isAvailable: true };
    
    if (category) {
      query.category = category;
    }
    
    if (minPrice || maxPrice) {
      query.discountPrice = {};
      if (minPrice) query.discountPrice.$gte = Number(minPrice);
      if (maxPrice) query.discountPrice.$lte = Number(maxPrice);
    }
    
    if (restaurant) {
      query.restaurantId = restaurant;
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }
    
    let sortOption = {};
    if (sort === 'price-asc') {
      sortOption = { discountPrice: 1 };
    } else if (sort === 'price-desc') {
      sortOption = { discountPrice: -1 };
    } else if (sort === 'newest') {
      sortOption = { createdAt: -1 };
    } else {
      sortOption = { createdAt: -1 };
    }
    
    const foods = await FoodItem.find(query)
      .populate('restaurantId', 'name logo')
      .sort(sortOption);
      
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get featured food items
// @route   GET /api/foods/featured
// @access  Public
export const getFeaturedFoods = async (req, res) => {
  try {
    const foods = await FoodItem.find({ isAvailable: true, quantity: { $gt: 0 } })
      .sort({ discountPrice: 1 })
      .limit(8)
      .populate('restaurantId', 'name logo');
      
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get food item by ID
// @route   GET /api/foods/:id
// @access  Public
export const getFoodById = async (req, res) => {
  try {
    const food = await FoodItem.findById(req.params.id)
      .populate('restaurantId');
      
    if (food) {
      res.json(food);
    } else {
      res.status(404).json({ message: 'Food item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a food item
// @route   POST /api/foods
// @access  Private/Restaurant
export const createFood = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ userId: req.user._id });
    
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    
    const food = new FoodItem({
      ...req.body,
      restaurantId: restaurant._id,
    });
    
    const createdFood = await food.save();
    res.status(201).json(createdFood);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a food item
// @route   PUT /api/foods/:id
// @access  Private/Restaurant
export const updateFood = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ userId: req.user._id });
    
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    
    const food = await FoodItem.findOne({
      _id: req.params.id,
      restaurantId: restaurant._id,
    });
    
    if (food) {
      food.name = req.body.name || food.name;
      food.description = req.body.description || food.description;
      food.originalPrice = req.body.originalPrice || food.originalPrice;
      food.discountPrice = req.body.discountPrice || food.discountPrice;
      food.quantity = req.body.quantity || food.quantity;
      food.expiryTime = req.body.expiryTime || food.expiryTime;
      food.isAvailable = req.body.isAvailable !== undefined ? req.body.isAvailable : food.isAvailable;
      
      const updatedFood = await food.save();
      res.json(updatedFood);
    } else {
      res.status(404).json({ message: 'Food item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a food item
// @route   DELETE /api/foods/:id
// @access  Private/Restaurant
export const deleteFood = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ userId: req.user._id });
    
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    
    const food = await FoodItem.findOne({
      _id: req.params.id,
      restaurantId: restaurant._id,
    });
    
    if (food) {
      await food.remove();
      res.json({ message: 'Food item removed' });
    } else {
      res.status(404).json({ message: 'Food item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};