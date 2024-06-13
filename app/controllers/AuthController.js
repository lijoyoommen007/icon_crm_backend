// controllers/AuthController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path as necessary

const authenticateUser = async (req, res) => {
	const { username, password } = req.body;
	if (!username || !password) {
	  return res.status(401).json({ message: "No email or password" });
	}
   
	try {
	  // Find the user by email
	  const user = await User.findOne({ where: { username: username } });
  
	  if (!user) {
		return res.status(404).json({ message: 'User not found' });
	  }
  
	  // Compare the provided password with the stored hash
	  const isMatch = await bcrypt.compare(password, user.password);
  
	  if (!isMatch) {
		return res.status(401).json({ message: 'Invalid credentials' });
	  }
  
	  // Generate a JWT token
	  const token = jwt.sign({ userId: user.userid }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
	  // Return the token and user data
	  return res.status(200).json({
		message: 'Authentication successful',
		token,
		user: {
		  id: user.userid,
		  username: user.username,
		  email: user.useremail,
		  mobile: user.mobile,
		  designation: user.designation,
		  role: user.userrole
		}
	  });
	} catch (error) {
	  console.error('Error during authentication:', error);
	  return res.status(500).json({ message: 'Internal server error' });
	}
  };


const createUser = async (req, res) => {
	// Extract user data from the request body
	const { username, useremail, password, mobile, designation,userrole } = req.body;
  
	try {
	  // Check if the user already exists
	  console.log(User) 
	  const existingUser = await User.findOne({ where: { useremail } });
	  if (existingUser) {
		return res.status(400).json({ message: 'User with this email already exists' });
	  }
  
	  // Hash the password before saving it
	  const hashedPassword = await bcrypt.hash(password, 10);
  
	  // Create a new user record in the database
	  const newUser = await User.create({
		username,
		useremail,
		password: hashedPassword,
		mobile,
		designation,
		userrole
	  });
  
	  // Send a success response
	  return res.status(201).json({ message: 'User created successfully', user: newUser });
	} catch (error) {
	  console.error('Error creating user:', error);
	  // Send an error response
	  return res.status(500).json({ message: 'Internal server error' });
	}
  };
  

module.exports = {authenticateUser,createUser};