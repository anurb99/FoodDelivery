// deliveryController.js
const { calculatePrice } = require('../services/priceCalculator');

async function calculateDeliveryPrice(req, res) {
  const { organization_id, zone, total_distance, item_type } = req.body;

  try {
    const totalPrice = await calculatePrice({
      organizationId: organization_id,
      zone,
      totalDistance: total_distance,
      itemType: item_type,
    });

    res.json({ total_price: totalPrice });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { calculateDeliveryPrice };
