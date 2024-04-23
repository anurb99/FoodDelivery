// priceCalculator.js
const { Organization, Item, Pricing } = require('../models');


async function calculatePrice({ organizationId, zone, totalDistance, itemType }) {
  try {
    const pricing = await Pricing.findOne({
      where: {
        organization_id: organizationId,
        zone,
      },
      include: [
        {
          model: Organization,
        },
        {
          model: Item,
          where: { type: itemType },
        },
      ],
    });

    if (!pricing) {
      throw new Error('Pricing not found for the provided organization and zone');
    }

    const { base_distance_in_km, km_price, fix_price } = pricing;

    let totalPrice = fix_price;
    if (totalDistance > base_distance_in_km) {
      const extraDistance = totalDistance - base_distance_in_km;
      totalPrice += extraDistance * km_price;
    }

    return totalPrice;
  } catch (error) {
    throw new Error(`Error calculating price: ${error.message}`);
  }
}

module.exports = { calculatePrice };
