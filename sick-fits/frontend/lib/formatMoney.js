export default function (amount) {
  const options = {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 2,
  };
  // if its a whole, dollar amount, leave off the .00
  if (amount % 100 === 0) options.minimumFractionDigits = 0;
  const formatter = new Intl.NumberFormat('fr-CA', options);
  return formatter.format(amount / 100);
}
