const {
  celsiusToFahrenheit,
  fahrenheitToCelsius,
  formatWindSpeed,
  getHumidityLabel,
  getWeatherGradient
} = require("./utils");

describe("celsiusToFahrenheit", () => {
  test("converts freezing point", () => {
    expect(celsiusToFahrenheit(0)).toBe(32);
  });

  test("converts boiling point", () => {
    expect(celsiusToFahrenheit(100)).toBe(212);
  });

  test("handles negative value", () => {
    expect(celsiusToFahrenheit(-40)).toBe(-40);
  });

  test("rounds decimal conversion", () => {
    expect(celsiusToFahrenheit(37.5)).toBe(100);
  });

  test("throws on invalid input", () => {
    expect(() => celsiusToFahrenheit("20")).toThrow(TypeError);
  });
});

describe("fahrenheitToCelsius", () => {
  test("converts freezing point", () => {
    expect(fahrenheitToCelsius(32)).toBe(0);
  });

  test("converts boiling point", () => {
    expect(fahrenheitToCelsius(212)).toBe(100);
  });

  test("handles negative equivalent", () => {
    expect(fahrenheitToCelsius(-40)).toBe(-40);
  });

  test("rounds decimal conversion", () => {
    expect(fahrenheitToCelsius(99.5)).toBe(37);
  });

  test("throws on invalid input", () => {
    expect(() => fahrenheitToCelsius(NaN)).toThrow(TypeError);
  });
});

describe("formatWindSpeed", () => {
  test("formats whole number speed", () => {
    expect(formatWindSpeed(18)).toBe("18 km/h");
  });

  test("rounds decimal speed", () => {
    expect(formatWindSpeed(18.7)).toBe("19 km/h");
  });

  test("handles zero", () => {
    expect(formatWindSpeed(0)).toBe("0 km/h");
  });

  test("throws on negative speed", () => {
    expect(() => formatWindSpeed(-1)).toThrow(RangeError);
  });

  test("throws on non-number", () => {
    expect(() => formatWindSpeed("10")).toThrow(TypeError);
  });
});

describe("getHumidityLabel", () => {
  test("returns Dry at lower boundary", () => {
    expect(getHumidityLabel(0)).toBe("Dry");
    expect(getHumidityLabel(30)).toBe("Dry");
  });

  test("returns Comfortable in middle range", () => {
    expect(getHumidityLabel(31)).toBe("Comfortable");
    expect(getHumidityLabel(60)).toBe("Comfortable");
  });

  test("returns Humid in higher range", () => {
    expect(getHumidityLabel(61)).toBe("Humid");
    expect(getHumidityLabel(80)).toBe("Humid");
  });

  test("returns Very Humid above 80", () => {
    expect(getHumidityLabel(81)).toBe("Very Humid");
    expect(getHumidityLabel(100)).toBe("Very Humid");
  });

  test("throws for out-of-range values", () => {
    expect(() => getHumidityLabel(-1)).toThrow(RangeError);
    expect(() => getHumidityLabel(101)).toThrow(RangeError);
  });
});

describe("getWeatherGradient", () => {
  test("returns sunny gradient", () => {
    expect(getWeatherGradient("sunny")).toContain("#ff9a44");
  });

  test("is case-insensitive and trims spaces", () => {
    expect(getWeatherGradient("  CLOUDY ")).toContain("#607d8b");
  });

  test("returns fallback gradient for unknown condition", () => {
    expect(getWeatherGradient("volcanic-ash")).toContain("#3a7bd5");
  });

  test("returns fallback gradient for empty input", () => {
    expect(getWeatherGradient("")).toContain("#3a7bd5");
  });

  test("accepts nullish input safely", () => {
    expect(getWeatherGradient(null)).toContain("#3a7bd5");
    expect(getWeatherGradient(undefined)).toContain("#3a7bd5");
  });
});