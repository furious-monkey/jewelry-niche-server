const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const globalErrorHandler = require('../middlewares/global-error-handler');
const notFoundErrorHandler = require('../middlewares/not-found-handler');
const app = express();

// === Middlewares ===
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Import routes
const jewelryRoutes = require('../routes/jewelry.routes');
const ordersRoutes = require('../routes/orders.routes');
const reviewRoutes = require('../routes/review.routes');
const usersRoutes = require('../routes/users.routes');

// Register routes 
app.use('/jewelry', jewelryRoutes);
app.use('/orders', ordersRoutes);
app.use('/review', reviewRoutes);
app.use('/users', usersRoutes);

// === Error Middlewares ===
app.use(notFoundErrorHandler)
app.use(globalErrorHandler)


module.exports = app;