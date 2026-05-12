const {
  celsiusToFahrenheit,
  fahrenheitToCelsius,
  formatWindSpeed,
  getHumidityLabel,
  getWeatherGradient,
  getWeatherIcon,
} = require('./utils');

describe('celsiusToFahrenheit', () => {
  test('converts 0°C to 32°F', () => {
    expect(celsiusToFahrenheit(0)).toBe(32);
  });

  test('converts 24°C to 75°F', () => {
    expect(celsiusToFahrenheit(24)).toBe(75);
  });

  test('converts -40°C to -40°F', () => {
    expect(celsiusToFahrenheit(-40)).toBe(-40);
  });

  test('converts 100°C to 212°F', () => {
    expect(celsiusToFahrenheit(100)).toBe(212);
  });

  test('rounds 37.5°C correctly to 100°F', () => {
    expect(celsiusToFahrenheit(37.5)).toBe(100);
  });

  test('handles negative values', () => {
    expect(celsiusToFahrenheit(-10)).toBe(14);
  });
});

describe('fahrenheitToCelsius', () => {
  test('converts 32°F to 0°C', () => {
    expect(fahrenheitToCelsius(32)).toBe(0);
  });

  test('converts 75°F to 24°C', () => {
    expect(fahrenheitToCelsius(75)).toBe(24);
  });

  test('converts -40°F to -40°C', () => {
    expect(fahrenheitToCelsius(-40)).toBe(-40);
  });

  test('converts 212°F to 100°C', () => {
    expect(fahrenheitToCelsius(212)).toBe(100);
  });

  test('rounds correctly for decimal inputs', () => {
    expect(fahrenheitToCelsius(68)).toBe(20);
  });

  test('handles negative values', () => {
    expect(fahrenheitToCelsius(-10)).toBe(-23);
  });
});

describe('formatWindSpeed', () => {
  test('formats 12.5 km/h to 12.5', () => {
    expect(formatWindSpeed(12.5)).toBe(12.5);
  });

  test('formats 10 km/h to 10', () => {
    expect(formatWindSpeed(10)).toBe(10);
  });

  test('rounds 12.567 km/h to 12.6', () => {
    expect(formatWindSpeed(12.567)).toBe(12.6);
  });

  test('formats 0 km/h to 0', () => {
    expect(formatWindSpeed(0)).toBe(0);
  });

  test('handles large values', () => {
    expect(formatWindSpeed(100.5)).toBe(100.5);
  });

  test('handles very small decimal values', () => {
    expect(formatWindSpeed(0.1)).toBe(0.1);
  });
});

describe('getHumidityLabel', () => {
  test('returns "Low" for humidity below 30%', () => {
    expect(getHumidityLabel(20)).toBe('Low');
  });

  test('returns "Low" at boundary 29%', () => {
    expect(getHumidityLabel(29)).toBe('Low');
  });

  test('returns "Moderate" for 30-59%', () => {
    expect(getHumidityLabel(45)).toBe('Moderate');
  });

  test('returns "Moderate" at boundary 30%', () => {
    expect(getHumidityLabel(30)).toBe('Moderate');
  });

  test('returns "Moderate" at boundary 59%', () => {
    expect(getHumidityLabel(59)).toBe('Moderate');
  });

  test('returns "High" for 60-79%', () => {
    expect(getHumidityLabel(70)).toBe('High');
  });

  test('returns "High" at boundary 60%', () => {
    expect(getHumidityLabel(60)).toBe('High');
  });

  test('returns "Very High" for 80% or above', () => {
    expect(getHumidityLabel(85)).toBe('Very High');
  });

  test('returns "Very High" at boundary 80%', () => {
    expect(getHumidityLabel(80)).toBe('Very High');
  });

  test('returns "Very High" for 100%', () => {
    expect(getHumidityLabel(100)).toBe('Very High');
  });
});

describe('getWeatherGradient', () => {
  test('returns sunny gradient for "sunny" condition', () => {
    const gradient = getWeatherGradient('sunny');
    expect(gradient).toContain('linear-gradient');
    expect(gradient).toContain('FFD89B');
  });

  test('returns cloudy gradient for "cloudy" condition', () => {
    const gradient = getWeatherGradient('cloudy');
    expect(gradient).toContain('linear-gradient');
    expect(gradient).toContain('A0A9C9');
  });

  test('returns rainy gradient for "rainy" condition', () => {
    const gradient = getWeatherGradient('rainy');
    expect(gradient).toContain('linear-gradient');
    expect(gradient).toContain('667eea');
  });

  test('returns snowy gradient for "snowy" condition', () => {
    const gradient = getWeatherGradient('snowy');
    expect(gradient).toContain('linear-gradient');
    expect(gradient).toContain('E0E7FF');
  });

  test('returns windy gradient for "windy" condition', () => {
    const gradient = getWeatherGradient('windy');
    expect(gradient).toContain('linear-gradient');
    expect(gradient).toContain('B993D6');
  });

  test('returns foggy gradient for "foggy" condition', () => {
    const gradient = getWeatherGradient('foggy');
    expect(gradient).toContain('linear-gradient');
    expect(gradient).toContain('C9C9C9');
  });

  test('returns sunny gradient as default for unknown condition', () => {
    const gradient = getWeatherGradient('unknown');
    expect(gradient).toEqual(getWeatherGradient('sunny'));
  });
});

describe('getWeatherIcon', () => {
  test('returns ☀️ for "sunny" condition', () => {
    expect(getWeatherIcon('sunny')).toBe('☀️');
  });

  test('returns ☁️ for "cloudy" condition', () => {
    expect(getWeatherIcon('cloudy')).toBe('☁️');
  });

  test('returns 🌧️ for "rainy" condition', () => {
    expect(getWeatherIcon('rainy')).toBe('🌧️');
  });

  test('returns ❄️ for "snowy" condition', () => {
    expect(getWeatherIcon('snowy')).toBe('❄️');
  });

  test('returns 💨 for "windy" condition', () => {
    expect(getWeatherIcon('windy')).toBe('💨');
  });

  test('returns 🌫️ for "foggy" condition', () => {
    expect(getWeatherIcon('foggy')).toBe('🌫️');
  });

  test('returns ☀️ as default for unknown condition', () => {
    expect(getWeatherIcon('unknown')).toBe('☀️');
  });

  test('returns correct icon for all known weather conditions', () => {
    const conditions = ['sunny', 'cloudy', 'rainy', 'snowy', 'windy', 'foggy'];
    conditions.forEach(condition => {
      expect(getWeatherIcon(condition)).toBeTruthy();
    });
  });
});