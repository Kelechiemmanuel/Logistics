const calculatePrice = (weight, distance) => {
    const basePrice = 500;
    const perKm = 100;
    const perKg = 50;

    const price = basePrice + (perKm * distance) + (perKg * weight);
    return price;
}

module.exports = { calculatePrice };