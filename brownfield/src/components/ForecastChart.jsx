import React, { Component } from 'react';
import { getWeatherEmoji } from '../utils/api';
import { formatTemp } from '../utils/temperature';

// Another class component — renders the 7-day forecast as a simple bar chart
// Inline styles because whoever wrote this "was going to add CSS later"
class ForecastChart extends Component {
  render() {
    const { weather, unit } = this.props;
    if (!weather || !weather.daily) return null;

    const daily = weather.daily;
    const days = daily.time.map((date, i) => ({
      date,
      max: daily.temperature_2m_max[i],
      min: daily.temperature_2m_min[i],
      code: daily.weather_code[i],
      precip: daily.precipitation_probability_max[i],
    }));

    const maxTemp = Math.max(...days.map((d) => d.max));
    const minTemp = Math.min(...days.map((d) => d.min));
    const range = maxTemp - minTemp || 1;

    return (
      <div style={{ marginBottom: 20 }}>
        <h3 style={{ fontSize: 18, marginBottom: 12, color: '#333' }}>7-Day Forecast</h3>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto' }}>
          {days.map((day) => {
            const barHeight = ((day.max - minTemp) / range) * 80 + 20;
            const dayName = new Date(day.date + 'T00:00:00').toLocaleDateString('en', { weekday: 'short' });

            return (
              <div
                key={day.date}
                style={{
                  flex: '1 0 0',
                  minWidth: 60,
                  textAlign: 'center',
                  padding: '8px 4px',
                  background: '#f8f9fa',
                  borderRadius: 8,
                }}
              >
                <div style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>{dayName}</div>
                <div style={{ fontSize: 20, marginBottom: 4 }}>{getWeatherEmoji(day.code)}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#333' }}>
                  {formatTemp(day.max, unit)}
                </div>
                <div
                  style={{
                    height: barHeight,
                    background: 'linear-gradient(180deg, #667eea, #764ba2)',
                    borderRadius: 4,
                    margin: '4px auto',
                    width: 8,
                  }}
                />
                <div style={{ fontSize: 12, color: '#999' }}>
                  {formatTemp(day.min, unit)}
                </div>
                {day.precip > 0 && (
                  <div style={{ fontSize: 11, color: '#4a90d9', marginTop: 2 }}>
                    🌧 {day.precip}%
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ForecastChart;
