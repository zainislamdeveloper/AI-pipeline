(function (root) {
  function celsiusToFahrenheit(c) {
    return Math.round((Number(c) * 9) / 5 + 32);
  }

  function fahrenheitToCelsius(f) {
    return Math.round(((Number(f) - 32) * 5) / 9);
  }

  function formatWindSpeed(speedKmh, unit) {
    const value = Number(speedKmh);
    const normalizedUnit = unit || "km/h";

    if (!Number.isFinite(value)) {
      throw new Error("Wind speed must be a finite number.");
    }

    if (normalizedUnit === "km/h") {
      return Math.round(value) + " km/h";
    }

    if (normalizedUnit === "mph") {
      const mph = Math.round(value * 0.621371 * 10) / 10;
      return mph + " mph";
    }

    throw new Error("Unsupported wind speed unit.");
  }

  function getHumidityLabel(humidity) {
    const value = Number(humidity);

    if (!Number.isFinite(value) || value < 0 || value > 100) {
      throw new Error("Humidity must be between 0 and 100.");
    }

    if (value < 30) return "Dry";
    if (value < 60) return "Comfortable";
    if (value < 75) return "Humid";
    return "Very Humid";
  }

  function getWeatherGradient(condition) {
    const key = String(condition || "").toLowerCase();

    if (key.includes("sun") || key.includes("clear")) {
      return "linear-gradient(135deg, #ff9a44, #ffcc33 45%, #ffd86f)";
    }

    if (key.includes("cloud") || key.includes("overcast")) {
      return "linear-gradient(135deg, #6b7c93, #8ea5bd 45%, #b4c4d6)";
    }

    if (key.includes("rain") || key.includes("drizzle")) {
      return "linear-gradient(135deg, #2c3e50, #4b79a1 45%, #6dd5fa)";
    }

    if (key.includes("storm") || key.includes("thunder")) {
      return "linear-gradient(135deg, #232526, #414345 45%, #5c6b73)";
    }

    if (key.includes("snow") || key.includes("sleet")) {
      return "linear-gradient(135deg, #cfd9df, #e2ebf0 45%, #f6f9fc)";
    }

    return "linear-gradient(135deg, #4facfe, #00f2fe 45%, #43e97b)";
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = {
      celsiusToFahrenheit,
      fahrenheitToCelsius,
      formatWindSpeed,
      getHumidityLabel,
      getWeatherGradient
    };
  }

  if (typeof root !== "undefined") {
    root.Utils = {
      celsiusToFahrenheit,
      fahrenheitToCelsius,
      formatWindSpeed,
      getHumidityLabel,
      getWeatherGradient
    };
  }
})(typeof globalThis !== "undefined" ? globalThis : this);