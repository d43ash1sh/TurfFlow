export const calculatePrice = (
  basePrice: number,
  extraHourPrice: number,
  duration: number
) => {
  if (duration <= 1) return basePrice;
  return basePrice + (duration - 1) * extraHourPrice;
};
