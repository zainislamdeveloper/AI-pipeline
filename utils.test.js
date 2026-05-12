const {
  celsiusToFahrenheit,
  fahrenheitToCelsius,
  formatWindSpeed,
  getHumidityLabel,
  getWeatherGradient
} = require('./utils');

describe('celsiusToFahrenheit', () => {
  test('converts freezing point', () => {
    expect(celsiusToFahrenheit(0)).toBe(32);
  });

  test('converts boiling point', () => {
    expect(celsiusToFahrenheit(100)).toBe(212);
  });

  test('converts negative boundary', () => {
    expect(celsiusToFahrenheit(-40)).toBe(-40);
  });

  test('rounds fractional results', () => {
    expect(celsiusToFahrenheit(36.6)).toBe(98);
  });
});

describe('fahrenheitToCelsius', () => {
  test('converts freezing point', () => {
    expect(fahrenheitToCelsius(32)).toBe(0);
  });

  test('converts boiling point', () => {
    expect(fahrenheitToCelsius(212)).toBe(100);
  });

  test('converts negative boundary', () => {
    expect(fahrenheitToCelsius(-40)).toBe(-40);
  });

  test('rounds fractional results', () => {
    expect(fahrenheitToCelsius(98.6)).toBe(37);
  });
});

describe('formatWindSpeed', () => {
  test('returns invalid for non-number', () => {
    expect(formatWindSpeed('fast')).toBe('Invalid wind speed');
  });

  test('handles negative by clamping to calm', () => {
    expect(formatWindSpeed(-2)).toBe('Calm');
  });

  test('boundary 0 is calm', () => {
    expect(formatWindSpeed(0)).toBe('Calm');
  });

  test('boundary 15 is light breeze', () => {
    expect(formatWindSpeed(15)).toBe('15 km/h (Light breeze)');
  });

  test('boundary 16 enters moderate breeze', () => {
    expect(formatWindSpeed(16)).toBe('16 km/h (Moderate breeze)');
  });

  test('boundary 35 stays moderate breeze', () => {
    expect(formatWindSpeed(35)).toBe('35 km/h (Moderate breeze)');
  });

  test('boundary 36 enters strong breeze', () => {
    expect(formatWindSpeed(36)).toBe('36 km/h (Strong breeze)');
  });

  test('boundary 55 stays strong breeze', () => {
    expect(formatWindSpeed(55)).toBe('55 km/h (Strong breeze)');
  });

  test('boundary 56 enters gusty', () => {
    expect(formatWindSpeed(56)).toBe('56 km/h (Gusty)');
  });
});

describe('getHumidityLabel', () => {
  test('invalid below 0', () => {
    expect(getHumidityLabel(-1)).toBe('Invalid humidity');
  });

  test('invalid above 100', () => {
    expect(getHumidityLabel(101)).toBe('Invalid humidity');
  });

  test('invalid for non-numeric', () => {
    expect(getHumidityLabel('wet')).toBe('Invalid humidity');
  });

  test('boundary 29 is dry', () => {
    expect(getHumidityLabel(29)).toBe('Dry');
  });

  test('boundary 30 is comfortable', () => {
    expect(getHumidityLabel(30)).toBe('Comfortable');
  });

  test('boundary 59 is comfortable', () => {
    expect(getHumidityLabel(59)).toBe('Comfortable');
  });

  test('boundary 60 is humid', () => {
    expect(getHumidityLabel(60)).toBe('Humid');
  });

  test('boundary 79 is humid', () => {
    expect(getHumidityLabel(79)).toBe('Humid');
  });

  test('boundary 80 is very humid', () => {
    expect(getHumidityLabel(80)).toBe('Very Humid');
  });

  test('boundary 100 is very humid', () => {
    expect(getHumidityLabel(100)).toBe('Very Humid');
  });
});

describe('getWeatherGradient', () => {
  test('returns sunny gradient', () => {
    expect(getWeatherGradient('Sunny')).toContain('#f6d365');
  });

  test('returns cloudy gradient', () => {
    expect(getWeatherGradient('Partly Cloudy')).toContain('#66a6ff');
  });

  test('returns rain gradient', () => {
    expect(getWeatherGradient('Rain')).toContain('#182848');
  });

  test('returns storm gradient', () => {
    expect(getWeatherGradient('Thunderstorm')).toContain('#414345');
  });

  test('returns snow gradient', () => {
    expect(getWeatherGradient('Snow')).toContain('#274046');
  });

  test('returns fog gradient', () => {
    expect(getWeatherGradient('Fog')).toContain('#bdc3c7');
  });

  test('is case-insensitive', () => {
    expect(getWeatherGradient('SUNNY')).toBe(getWeatherGradient('sunny'));
  });

  test('returns default gradient for unknown conditions', () => {
    expect(getWeatherGradient('Volcanic Ash')).toContain('#00f2fe');
  });

  test('returns default gradient for empty values', () => {
    expect(getWeatherGradient('')).toContain('#00f2fe');
    expect(getWeatherGradient(null)).toContain('#00f2fe');
  });
});