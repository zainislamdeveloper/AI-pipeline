const {
  celsiusToFahrenheit,
  fahrenheitToCelsius,
  formatWindSpeed,
  getHumidityLabel,
  getWeatherGradient
} = require("./utils");

describe("celsiusToFahrenheit", () => {
  test("converts 0°C to 32°F", () => {
    expect(celsiusToFahrenheit(0)).toBe(32);
  });

  test("converts -40°C to -40°F", () => {
    expect(celsiusToFahrenheit(-40)).toBe(-40);
  });

  test("rounds decimal values", () => {
    expect(celsiusToFahrenheit(26.4)).toBe(80);
  });
});

describe("fahrenheitToCelsius", () => {
  test("converts 32°F to 0°C", () => {
    expect(fahrenheitToCelsius(32)).toBe(0);
  });

  test("converts -40°F to -40°C", () => {
    expect(fahrenheitToCelsius(-40)).toBe(-40);
  });

  test("rounds decimal conversions", () => {
    expect(fahrenheitToCelsius(77)).toBe(25);
  });
});

describe("formatWindSpeed", () => {
  test("formats km/h by default", () => {
    expect(formatWindSpeed(18.2)).toBe("18 km/h");
  });

  test("formats explicit km/h", () => {
    expect(formatWindSpeed(16, "km/h")).toBe("16 km/h");
  });

  test("formats mph conversion", () => {
    expect(formatWindSpeed(10, "mph")).toBe("6.2 mph");
  });

  test("handles zero boundary", () => {
    expect(formatWindSpeed(0, "km/h")).toBe("0 km/h");
  });

  test("throws for non-finite input", () => {
    expect(() => formatWindSpeed(Number.NaN)).toThrow("Wind speed must be a finite number.");
  });

  test("throws for unsupported unit", () => {
    expect(() => formatWindSpeed(12, "m/s")).toThrow("Unsupported wind speed unit.");
  });
});

describe("getHumidityLabel", () => {
  test("returns Dry below 30", () => {
    expect(getHumidityLabel(0)).toBe("Dry");
    expect(getHumidityLabel(29)).toBe("Dry");
  });

  test("returns Comfortable at 30-59", () => {
    expect(getHumidityLabel(30)).toBe("Comfortable");
    expect(getHumidityLabel(59)).toBe("Comfortable");
  });

  test("returns Humid at 60-74", () => {
    expect(getHumidityLabel(60)).toBe("Humid");
    expect(getHumidityLabel(74)).toBe("Humid");
  });

  test("returns Very Humid at 75-100", () => {
    expect(getHumidityLabel(75)).toBe("Very Humid");
    expect(getHumidityLabel(100)).toBe("Very Humid");
  });

  test("throws for invalid boundaries", () => {
    expect(() => getHumidityLabel(-1)).toThrow("Humidity must be between 0 and 100.");
    expect(() => getHumidityLabel(101)).toThrow("Humidity must be between 0 and 100.");
  });
});

describe("getWeatherGradient", () => {
  test("returns sunny gradient", () => {
    expect(getWeatherGradient("Sunny")).toContain("#ff9a44");
  });

  test("returns cloudy gradient", () => {
    expect(getWeatherGradient("Cloudy")).toContain("#6b7c93");
  });

  test("returns rainy gradient", () => {
    expect(getWeatherGradient("Heavy Rain")).toContain("#2c3e50");
  });

  test("returns storm gradient", () => {
    expect(getWeatherGradient("Thunderstorm")).toContain("#232526");
  });

  test("returns snow gradient", () => {
    expect(getWeatherGradient("Snow")).toContain("#cfd9df");
  });

  test("returns fallback gradient for unknown conditions", () => {
    expect(getWeatherGradient("Volcanic Ash")).toContain("#4facfe");
  });

  test("handles empty condition", () => {
    expect(getWeatherGradient("")).toContain("#4facfe");
  });
});