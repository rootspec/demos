import React from 'react';
import { getWeatherDescription, getWeatherEmoji } from '../utils/api';
import { formatTemp } from '../utils/temperature';
import styles from './CurrentWeather.module.css';

// Hooks-based component — written later by a different dev
function CurrentWeather({ weather, unit, cityName }) {
  if (!weather || !weather.current) return null;

  const current = weather.current;
  const emoji = getWeatherEmoji(current.weather_code);
  const description = getWeatherDescription(current.weather_code);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.city}>{cityName}</h2>
        <span className={styles.emoji}>{emoji}</span>
      </div>
      <div className={styles.temp}>
        {formatTemp(current.temperature_2m, unit)}
      </div>
      <div className={styles.description}>{description}</div>
      <div className={styles.details}>
        <span>💧 {current.relative_humidity_2m}%</span>
        <span>💨 {Math.round(current.wind_speed_10m)} km/h</span>
        <span>☀️ UV {current.uv_index}</span>
      </div>
    </div>
  );
}

export default CurrentWeather;
