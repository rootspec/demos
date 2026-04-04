import React, { Component } from 'react';
import styles from './SettingsPanel.module.css';

// Class component because settings were bolted on late and matched the existing style
class SettingsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  toggle = () => {
    this.setState((prev) => ({ isOpen: !prev.isOpen }));
  };

  render() {
    const { unit, onUnitChange, windUnit, onWindUnitChange, timeFormat, onTimeFormatChange, defaultCity, favorites, onDefaultCityChange } = this.props;
    const { isOpen } = this.state;

    return (
      <div className={styles.container}>
        <button className={styles.toggle} onClick={this.toggle}>
          ⚙️ {isOpen ? 'Hide Settings' : 'Settings'}
        </button>

        {isOpen && (
          <div className={styles.panel}>
            <div className={styles.setting}>
              <label className={styles.label}>Temperature</label>
              <div className={styles.options}>
                <button
                  className={`${styles.option} ${unit === 'celsius' ? styles.active : ''}`}
                  onClick={() => onUnitChange('celsius')}
                >
                  °C
                </button>
                <button
                  className={`${styles.option} ${unit === 'fahrenheit' ? styles.active : ''}`}
                  onClick={() => onUnitChange('fahrenheit')}
                >
                  °F
                </button>
              </div>
            </div>

            <div className={styles.setting}>
              <label className={styles.label}>Wind Speed</label>
              <div className={styles.options}>
                <button
                  className={`${styles.option} ${windUnit === 'kmh' ? styles.active : ''}`}
                  onClick={() => onWindUnitChange('kmh')}
                >
                  km/h
                </button>
                <button
                  className={`${styles.option} ${windUnit === 'mph' ? styles.active : ''}`}
                  onClick={() => onWindUnitChange('mph')}
                >
                  mph
                </button>
              </div>
            </div>

            <div className={styles.setting}>
              <label className={styles.label}>Time Format</label>
              <div className={styles.options}>
                <button
                  className={`${styles.option} ${timeFormat === '24h' ? styles.active : ''}`}
                  onClick={() => onTimeFormatChange('24h')}
                >
                  24h
                </button>
                <button
                  className={`${styles.option} ${timeFormat === '12h' ? styles.active : ''}`}
                  onClick={() => onTimeFormatChange('12h')}
                >
                  12h
                </button>
              </div>
            </div>

            {favorites.length > 0 && (
              <div className={styles.setting}>
                <label className={styles.label}>Default Location</label>
                <select
                  className={styles.select}
                  value={defaultCity || ''}
                  onChange={(e) => onDefaultCityChange(e.target.value || null)}
                >
                  <option value="">None</option>
                  {favorites.map((fav) => (
                    <option key={`${fav.latitude}-${fav.longitude}`} value={fav.name}>
                      {fav.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default SettingsPanel;
