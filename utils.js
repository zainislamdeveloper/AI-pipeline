function celsiusToFahrenheit(c) { return Math.round(c * 9 / 5 + 32); }

function fahrenheitToCelsius(f) {
  return Math.round((f - 32) * 5 / 9);
}

function formatWindSpeed(speedKmh) {
  const speed = Number(speedKmh);
  if (!Number.isFinite(speed)) return "Invalid wind speed";

  const rounded = Math.max(0, Math.round(speed));
  if (rounded === 0) return "Calm";
  if (rounded <= 15) return `${rounded} km/h (Light breeze)`;
  if (rounded <= 35) return `${rounded} km/h (Moderate breeze)`;
  if (rounded <= 55) return `${rounded} km/h (Strong breeze)`;
  return `${rounded} km/h (Gusty)`;
}

function getHumidityLabel(humidity) {
  const value = Number(humidity);
  if (!Number.isFinite(value) || value < 0 || value > 100) return "Invalid humidity";
  if (value <= 29) return "Dry";
  if (value <= 59) return "Comfortable";
  if (value <= 79) return "Humid";
  return "Very Humid";
}

function getWeatherGradient(condition) {
  const c = String(condition || "").toLowerCase().trim();

  if (c.includes("sun") || c.includes("clear")) {
    return "linear-gradient(135deg, #f6d365 0%, #fda085 100%)";
  }
  if (c.includes("partly") || c.includes("cloud")) {
    return "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)";
  }
  if (c.includes("rain") || c.includes("drizzle") || c.includes("shower")) {
    return "linear-gradient(135deg, #4b6cb7 0%, #182848 100%)";
  }
  if (c.includes("storm") || c.includes("thunder")) {
    return "linear-gradient(135deg, #232526 0%, #414345 100%)";
  }
  if (c.includes("snow") || c.includes("sleet")) {
    return "linear-gradient(135deg, #e6dada 0%, #274046 100%)";
  }
  if (c.includes("fog") || c.includes("mist") || c.includes("haze")) {
    return "linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%)";
  }
  return "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)";
}

(function (root) {
  root.celsiusToFahrenheit = celsiusToFahrenheit;
  root.fahrenheitToCelsius = fahrenheitToCelsius;
  root.formatWindSpeed = formatWindSpeed;
  root.getHumidityLabel = getHumidityLabel;
  root.getWeatherGradient = getWeatherGradient;
}(typeof globalThis !== "undefined" ? globalThis : this));

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { celsiusToFahrenheit, fahrenheitToCelsius, formatWindSpeed, getHumidityLabel, getWeatherGradient };
}