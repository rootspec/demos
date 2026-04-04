import React, { useState, useEffect } from 'react';
import { getWeather } from '../utils/api';
import CurrentWeather from './CurrentWeather';
import HourlyForecast from './HourlyForecast';
import ForecastChart from './ForecastChart';
import WeatherAlerts from './WeatherAlerts';
import styles from './ComparisonView.module.css';

function ComparisonView({ cities, unit, timeFormat, onRemoveCity, onBack }) {
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (cities.length === 0) {
      setWeatherData({});
      setLoading(false);
      return;
    }

    setLoading(true);
    const promises = cities.map((city) =>
      getWeather(city.latitude, city.longitude)
        .then((data) => ({ key: `${city.latitude}-${city.longitude}`, data }))
        .catch(() => ({ key: `${city.latitude}-${city.longitude}`, data: null }))
    );

    Promise.all(promises).then((results) => {
      const data = {};
      results.forEach((r) => { data[r.key] = r.data; });
      setWeatherData(data);
      setLoading(false);
    });
  }, [cities]);

  return (
    <div className={`comparison-view ${styles.container}`}>
      <div className={styles.topBar}>
        <button className={`back-to-dashboard ${styles.backBtn}`} onClick={onBack}>
          ← Back to Dashboard
        </button>
      </div>

      {loading ? (
        <div className={styles.loading}>Loading comparison...</div>
      ) : (
        <div className={styles.columns}>
          {cities.map((city) => {
            const key = `${city.latitude}-${city.longitude}`;
            const weather = weatherData[key];

            return (
              <div key={key} className={styles.column} data-testid="comparison-column">
                <div className={styles.columnHeader}>
                  <h3 className={styles.cityName}>{city.name}</h3>
                  <button
                    className={styles.removeBtn}
                    data-testid="comparison-remove"
                    onClick={() => onRemoveCity(city)}
                  >
                    ✕
                  </button>
                </div>
                {weather ? (
                  <div className={styles.columnContent}>
                    <WeatherAlerts weather={weather} />
                    <CurrentWeather weather={weather} unit={unit} cityName={city.name} />
                    <HourlyForecast weather={weather} unit={unit} timeFormat={timeFormat} />
                    <ForecastChart weather={weather} unit={unit} />
                  </div>
                ) : (
                  <div className={styles.error}>Unable to load weather</div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ComparisonView;
