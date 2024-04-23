// app.js
const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./database');
const { calculateDeliveryPrice } = require('./controllers/deliveryController');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/calculatePrice', calculateDeliveryPrice);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Connected to the database');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
