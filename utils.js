function celsiusToFahrenheit(c) {
  return Math.round(c * 9/5 + 32);
}

function fahrenheitToCelsius(f) {
  return Math.round((f - 32) * 5/9);
}

function formatWindSpeed(kmh) {
  return Math.round(kmh * 10) / 10;
}

function getHumidityLabel(humidity) {
  if (humidity < 30) return 'Low';
  if (humidity < 60) return 'Moderate';
  if (humidity < 80) return 'High';
  return 'Very High';
}

function getWeatherGradient(condition) {
  const gradients = {
    sunny: 'linear-gradient(135deg, #FFD89B 0%, #19547B 100%)',
    cloudy: 'linear-gradient(135deg, #A0A9C9 0%, #4A5474 100%)',
    rainy: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    snowy: 'linear-gradient(135deg, #E0E7FF 0%, #8FA3C8 100%)',
    windy: 'linear-gradient(135deg, #B993D6 0%, #8CA6DB 100%)',
    foggy: 'linear-gradient(135deg, #C9C9C9 0%, #707070 100%)',
  };
  return gradients[condition] || gradients.sunny;
}

function getWeatherIcon(condition) {
  const icons = {
    sunny: '☀️',
    cloudy: '☁️',
    rainy: '🌧️',
    snowy: '❄️',
    windy: '💨',
    foggy: '🌫️',
  };
  return icons[condition] || icons.sunny;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    celsiusToFahrenheit,
    fahrenheitToCelsius,
    formatWindSpeed,
    getHumidityLabel,
    getWeatherGradient,
    getWeatherIcon,
  };
}