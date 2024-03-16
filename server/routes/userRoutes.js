const express = require('express');
const Router = express.Router();
const {authSignup, authLogin, getAllUser} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleWare');

Router.get('/', protect, getAllUser);
Router.post('/login',authLogin);
Router.post('/signup',authSignup);


module.exports = Router