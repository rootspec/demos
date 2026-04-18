import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import ForecastChart from './components/ForecastChart';
import HourlyForecast from './components/HourlyForecast';
import FavoritesList from './components/FavoritesList';
import LocationsDashboard from './components/LocationsDashboard';
import WeatherAlerts from './components/WeatherAlerts';
import SettingsPanel from './components/SettingsPanel';
import ComparisonView from './components/ComparisonView';
import { useWeather } from './hooks/useWeather';
import {
  loadFavorites, saveFavorites,
  loadUnit, saveUnit,
  loadWindUnit, saveWindUnit,
  loadTimeFormat, saveTimeFormat,
  loadDefaultCity, saveDefaultCity,
} from './utils/storage';
import './styles/global.css';

// The main app — uses hooks because it was rewritten most recently
function App() {
  const [city, setCity] = useState(null);
  const [favorites, setFavorites] = useState(() => loadFavorites());
  const [unit, setUnit] = useState(() => loadUnit());
  const [windUnit, setWindUnit] = useState(() => loadWindUnit());
  const [timeFormat, setTimeFormat] = useState(() => loadTimeFormat());
  const [defaultCity, setDefaultCity] = useState(() => loadDefaultCity());
  const [view, setView] = useState('weather'); // 'weather', 'dashboard', or 'compare'
  const [compareMode, setCompareMode] = useState(false);
  const [comparedCities, setComparedCities] = useState([]);

  const { weather, loading, error } = useWeather(
    city?.latitude,
    city?.longitude
  );

  // Load default city on mount
  useEffect(() => {
    if (defaultCity && favorites.length > 0 && !city) {
      const found = favorites.find((f) => f.name === defaultCity);
      if (found) setCity(found);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { saveFavorites(favorites); }, [favorites]);
  useEffect(() => { saveUnit(unit); }, [unit]);
  useEffect(() => { saveWindUnit(windUnit); }, [windUnit]);
  useEffect(() => { saveTimeFormat(timeFormat); }, [timeFormat]);
  useEffect(() => { saveDefaultCity(defaultCity); }, [defaultCity]);

  const handleCitySelect = (selectedCity) => {
    setCity(selectedCity);
    setView('weather');
  };

  const handleAddFavorite = () => {
    if (!city) return;
    const exists = favorites.some(
      (f) => f.latitude === city.latitude && f.longitude === city.longitude
    );
    if (!exists) {
      setFavorites([...favorites, {
        name: city.name,
        latitude: city.latitude,
        longitude: city.longitude,
        country: city.country,
      }]);
    }
  };

  const handleRemoveFavorite = (fav) => {
    const next = favorites.filter(
      (f) => f.latitude !== fav.latitude || f.longitude !== fav.longitude
    );
    setFavorites(next);
    // Clear default if removed
    if (defaultCity === fav.name) {
      setDefaultCity(null);
    }
    // Clear active city when no favorites remain so empty state shows
    if (next.length === 0) {
      setCity(null);
    }
  };

  // Comparison handlers
  const handleEnterCompareMode = () => {
    setCompareMode(true);
    setComparedCities([]);
  };

  const handleToggleCompareCity = (fav) => {
    setComparedCities((prev) => {
      const exists = prev.some(
        (c) => c.latitude === fav.latitude && c.longitude === fav.longitude
      );
      if (exists) {
        return prev.filter(
          (c) => c.latitude !== fav.latitude || c.longitude !== fav.longitude
        );
      }
      if (prev.length >= 3) return prev;
      return [...prev, fav];
    });
  };

  // Auto-transition to comparison view when 2+ cities selected
  useEffect(() => {
    if (compareMode && comparedCities.length >= 2) {
      setView('compare');
      setCompareMode(false);
    }
  }, [compareMode, comparedCities]);

  const handleRemoveCompareCity = (cityToRemove) => {
    const next = comparedCities.filter(
      (c) => c.latitude !== cityToRemove.latitude || c.longitude !== cityToRemove.longitude
    );
    if (next.length < 2) {
      setComparedCities([]);
      setView('dashboard');
    } else {
      setComparedCities(next);
    }
  };

  const handleBackToDashboard = () => {
    setComparedCities([]);
    setCompareMode(false);
    setView('dashboard');
  };

  const isFavorite = city && favorites.some(
    (f) => f.latitude === city.latitude && f.longitude === city.longitude
  );

  return (
    <div className={`app${view === 'compare' ? ' comparison-active' : ''}`}>
      <header className="header">
        <h1 className="title">🌤️ RootWeather</h1>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {favorites.length > 0 && (
            <div className="view-toggle">
              <button
                className={`view-btn ${view === 'weather' ? 'active' : ''}`}
                onClick={() => setView('weather')}
              >
                Weather
              </button>
              <button
                className={`view-btn ${view === 'dashboard' ? 'active' : ''}`}
                onClick={() => setView('dashboard')}
              >
                Dashboard
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="main">
        <SearchBar onCitySelect={handleCitySelect} />

        <SettingsPanel
          unit={unit}
          onUnitChange={setUnit}
          windUnit={windUnit}
          onWindUnitChange={setWindUnit}
          timeFormat={timeFormat}
          onTimeFormatChange={setTimeFormat}
          defaultCity={defaultCity}
          favorites={favorites}
          onDefaultCityChange={setDefaultCity}
        />

        {view === 'compare' ? (
          <ComparisonView
            cities={comparedCities}
            unit={unit}
            timeFormat={timeFormat}
            onRemoveCity={handleRemoveCompareCity}
            onBack={handleBackToDashboard}
          />
        ) : view === 'dashboard' ? (
          <LocationsDashboard
            favorites={favorites}
            unit={unit}
            onSelect={handleCitySelect}
            compareMode={compareMode}
            selectedForCompare={comparedCities}
            onToggleCompareCity={handleToggleCompareCity}
            onEnterCompareMode={handleEnterCompareMode}
          />
        ) : (
          <>
            <FavoritesList
              favorites={favorites}
              activeCity={city}
              onSelect={handleCitySelect}
              onRemove={handleRemoveFavorite}
            />

            {city && !isFavorite && (
              <div className="actions">
                <button className="save-btn" onClick={handleAddFavorite}>
                  ⭐ Save Location
                </button>
              </div>
            )}

            {loading && <div className="loading">Loading weather data...</div>}
            {error && <div className="error">Error: {error}</div>}

            {weather && city && (
              <>
                <WeatherAlerts weather={weather} />
                <CurrentWeather weather={weather} unit={unit} cityName={city.name} />
                <HourlyForecast weather={weather} unit={unit} timeFormat={timeFormat} />
                <ForecastChart weather={weather} unit={unit} />
              </>
            )}

            {!city && !loading && (
              <div className="empty">
                Search for a city to see the weather forecast
              </div>
            )}
          </>
        )}
      </main>

      <footer className="footer">
        <p>
          RootWeather — A <a href="https://github.com/rootspec/rootspec">RootSpec</a> brownfield demo
          &middot; v7.2.8 &middot; Data from <a href="https://open-meteo.com/">Open-Meteo</a>
          &middot; <a href="https://github.com/rootspec/demos/tree/main/brownfield/SEED.md">Seed</a>
          &middot; <a href="https://github.com/rootspec/demos/tree/main/brownfield/rootspec">Spec</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
