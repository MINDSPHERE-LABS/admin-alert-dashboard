// Formatters utility
export const formatNumber = (num) => {
  if (num === null || num === undefined) return '0';
  return new Intl.NumberFormat('en-IN').format(num);
};

export const formatCurrency = (num) => {
  if (num === null || num === undefined) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
};

export const formatPercentage = (num) => {
  if (num === null || num === undefined) return '0%';
  const rounded = Math.round(num);
  return `${rounded >= 0 ? '+' : ''}${rounded}%`;
};

export const calculateChange = (current, previous) => {
  if (!previous || previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
};

export const calculatePercentage = (current, target) => {
  if (!target || target === 0) return 0;
  return Math.min(Math.round((current / target) * 100), 100);
};

// Generate sparkline data
export const generateSparklineData = (current, volatility = 0.2) => {
  const data = [];
  let value = current * (0.8 + Math.random() * 0.4);
  
  for (let i = 0; i < 10; i++) {
    value = value * (1 + (Math.random() - 0.5) * volatility);
    data.push({ 
      value: Math.max(value, 0),
      index: i 
    });
  }
  
  return data;
};