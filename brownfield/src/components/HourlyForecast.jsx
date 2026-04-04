import React, { Component } from 'react';
import { getWeatherEmoji } from '../utils/api';
import { formatTemp } from '../utils/temperature';
import styles from './HourlyForecast.module.css';

// Class component with a ref for horizontal scroll — old habits
class HourlyForecast extends Component {
  constructor(props) {
    super(props);
    this.scrollRef = React.createRef();
  }

  scrollTo(direction) {
    const el = this.scrollRef.current;
    if (!el) return;
    const amount = direction === 'left' ? -200 : 200;
    el.scrollBy({ left: amount, behavior: 'smooth' });
  }

  render() {
    const { weather, unit } = this.props;
    if (!weather || !weather.hourly) return null;

    // Get next 24 hours starting from current hour
    const now = new Date();
    const currentHour = now.getHours();
    const hourly = weather.hourly;

    // Find the index of the current hour in the data
    const todayStr = now.toISOString().split('T')[0];
    let startIdx = hourly.time.findIndex((t) => t.startsWith(todayStr));
    if (startIdx === -1) startIdx = 0;
    startIdx += currentHour;

    const hours = [];
    for (let i = startIdx; i < Math.min(startIdx + 24, hourly.time.length); i++) {
      hours.push({
        time: hourly.time[i],
        temp: hourly.temperature_2m[i],
        code: hourly.weather_code[i],
        precip: hourly.precipitation_probability[i],
      });
    }

    if (hours.length === 0) return null;

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h3 className={styles.title}>Today&apos;s Hourly</h3>
          <div className={styles.controls}>
            <button className={styles.arrow} onClick={() => this.scrollTo('left')}>&larr;</button>
            <button className={styles.arrow} onClick={() => this.scrollTo('right')}>&rarr;</button>
          </div>
        </div>
        <div className={styles.scroll} ref={this.scrollRef}>
          {hours.map((hour) => {
            const d = new Date(hour.time);
            const label = d.getHours().toString().padStart(2, '0') + ':00';

            return (
              <div key={hour.time} className={styles.hourCard}>
                <div className={styles.hourLabel}>{label}</div>
                <div className={styles.hourEmoji}>{getWeatherEmoji(hour.code)}</div>
                <div className={styles.hourTemp}>{formatTemp(hour.temp, unit)}</div>
                {hour.precip > 0 && (
                  <div className={styles.hourPrecip}>🌧 {hour.precip}%</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default HourlyForecast;
