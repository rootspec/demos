import React, { Component } from 'react';
import { getWeather, getWeatherEmoji } from '../utils/api';
import { formatTemp } from '../utils/temperature';

// Class component — fetches weather for all favorites on mount
// Someone copy-pasted this from a Stack Overflow answer and adapted it
class LocationsDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: {},
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchAll();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.favorites !== this.props.favorites) {
      this.fetchAll();
    }
  }

  fetchAll() {
    const { favorites } = this.props;
    if (favorites.length === 0) {
      this.setState({ weatherData: {}, loading: false });
      return;
    }

    this.setState({ loading: true });
    const promises = favorites.map((fav) =>
      getWeather(fav.latitude, fav.longitude)
        .then((data) => ({ key: `${fav.latitude}-${fav.longitude}`, data }))
        .catch(() => ({ key: `${fav.latitude}-${fav.longitude}`, data: null }))
    );

    Promise.all(promises).then((results) => {
      const weatherData = {};
      results.forEach((r) => {
        weatherData[r.key] = r.data;
      });
      this.setState({ weatherData, loading: false });
    });
  }

  render() {
    const { favorites, unit, onSelect } = this.props;
    const { weatherData, loading } = this.state;

    if (favorites.length === 0) {
      return (
        <div style={{ textAlign: 'center', padding: '40px 20px', color: '#999' }}>
          No saved locations yet. Search for a city and save it.
        </div>
      );
    }

    if (loading) {
      return <div style={{ textAlign: 'center', padding: 20, color: '#666' }}>Loading all locations...</div>;
    }

    return (
      <div>
        <h3 style={{ fontSize: 18, color: '#333', marginBottom: 12 }}>All Locations</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: 12,
          marginBottom: 20,
        }}>
          {favorites.map((fav) => {
            const key = `${fav.latitude}-${fav.longitude}`;
            const w = weatherData[key];
            const current = w?.current;

            return (
              <div
                key={key}
                onClick={() => onSelect(fav)}
                style={{
                  background: 'white',
                  borderRadius: 12,
                  padding: 16,
                  cursor: 'pointer',
                  border: '1px solid #eee',
                  transition: 'box-shadow 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
              >
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{fav.name}</div>
                {current ? (
                  <>
                    <div style={{ fontSize: 28, marginBottom: 4 }}>
                      {getWeatherEmoji(current.weather_code)} {formatTemp(current.temperature_2m, unit)}
                    </div>
                    <div style={{ fontSize: 12, color: '#999' }}>
                      💧 {current.relative_humidity_2m}% &middot; 💨 {Math.round(current.wind_speed_10m)} km/h
                    </div>
                  </>
                ) : (
                  <div style={{ fontSize: 12, color: '#ccc' }}>Unable to load</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default LocationsDashboard;
