(function (root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else {
    root.WeatherUtils = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
  function assertFiniteNumber(value, name) {
    if (typeof value !== "number" || !Number.isFinite(value)) {
      throw new TypeError(name + " must be a finite number");
    }
  }

  function celsiusToFahrenheit(c) {
    assertFiniteNumber(c, "c");
    return Math.round(c * 9 / 5 + 32);
  }

  function fahrenheitToCelsius(f) {
    assertFiniteNumber(f, "f");
    return Math.trunc((f - 32) * 5 / 9);
  }

  function formatWindSpeed(kmh) {
    assertFiniteNumber(kmh, "kmh");
    if (kmh < 0) {
      throw new RangeError("kmh cannot be negative");
    }
    return Math.round(kmh) + " km/h";
  }

  function getHumidityLabel(humidity) {
    assertFiniteNumber(humidity, "humidity");
    if (humidity < 0 || humidity > 100) {
      throw new RangeError("humidity must be between 0 and 100");
    }
    if (humidity <= 30) return "Dry";
    if (humidity <= 60) return "Comfortable";
    if (humidity <= 80) return "Humid";
    return "Very Humid";
  }

  function getWeatherGradient(condition) {
    var key = String(condition || "").trim().toLowerCase();
    var gradients = {
      sunny: "linear-gradient(135deg, #ff9a44 0%, #ffd15c 45%, #ffe8a3 100%)",
      clear: "linear-gradient(135deg, #5b86e5 0%, #7f7fd5 45%, #91eae4 100%)",
      cloudy: "linear-gradient(135deg, #607d8b 0%, #8aa3b4 45%, #d7dde8 100%)",
      overcast: "linear-gradient(135deg, #4b5b6b 0%, #6f8194 45%, #a5b7c8 100%)",
      rainy: "linear-gradient(135deg, #314755 0%, #4a6a82 45%, #6a8ca4 100%)",
      drizzle: "linear-gradient(135deg, #4f6d7a 0%, #6b8a9b 45%, #95afbf 100%)",
      storm: "linear-gradient(135deg, #232526 0%, #414345 45%, #6d7780 100%)",
      snow: "linear-gradient(135deg, #83a4d4 0%, #b6fbff 45%, #e5f9ff 100%)"
    };

    return gradients[key] || "linear-gradient(135deg, #3a7bd5 0%, #57c6e1 45%, #9be15d 100%)";
  }

  return {
    celsiusToFahrenheit: celsiusToFahrenheit,
    fahrenheitToCelsius: fahrenheitToCelsius,
    formatWindSpeed: formatWindSpeed,
    getHumidityLabel: getHumidityLabel,
    getWeatherGradient: getWeatherGradient
  };
});