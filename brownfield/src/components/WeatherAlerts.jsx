import React from 'react';
import styled from 'styled-components';

// Styled-components again — the intern's influence spreads
const AlertsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
`;

const Alert = styled.div`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  background: ${(props) => props.$bg};
  color: ${(props) => props.$color};
`;

function getAlerts(current) {
  const alerts = [];

  // UV warnings
  if (current.uv_index >= 8) {
    alerts.push({ text: '☀️ Very High UV', bg: '#fed7d7', color: '#c53030' });
  } else if (current.uv_index >= 6) {
    alerts.push({ text: '☀️ High UV', bg: '#fefcbf', color: '#975a16' });
  } else if (current.uv_index >= 3) {
    alerts.push({ text: '☀️ Moderate UV', bg: '#fefcbf', color: '#975a16' });
  }

  // Wind warnings
  if (current.wind_speed_10m >= 60) {
    alerts.push({ text: '💨 Storm-force winds', bg: '#fed7d7', color: '#c53030' });
  } else if (current.wind_speed_10m >= 40) {
    alerts.push({ text: '💨 Strong winds', bg: '#feebc8', color: '#c05621' });
  } else if (current.wind_speed_10m >= 25) {
    alerts.push({ text: '💨 Breezy', bg: '#e2e8f0', color: '#4a5568' });
  }

  // Humidity
  if (current.relative_humidity_2m >= 85) {
    alerts.push({ text: '💧 Very humid', bg: '#bee3f8', color: '#2b6cb0' });
  }

  // Temperature extremes
  if (current.temperature_2m >= 35) {
    alerts.push({ text: '🌡️ Extreme heat', bg: '#fed7d7', color: '#c53030' });
  } else if (current.temperature_2m <= -10) {
    alerts.push({ text: '🥶 Extreme cold', bg: '#bee3f8', color: '#2b6cb0' });
  } else if (current.temperature_2m <= 0) {
    alerts.push({ text: '❄️ Freezing', bg: '#e2e8f0', color: '#4a5568' });
  }

  return alerts;
}

function WeatherAlerts({ weather }) {
  if (!weather || !weather.current) return null;

  const alerts = getAlerts(weather.current);
  if (alerts.length === 0) return null;

  return (
    <AlertsContainer className="weather-alerts">
      {alerts.map((alert, i) => (
        <Alert key={i} $bg={alert.bg} $color={alert.color}>
          {alert.text}
        </Alert>
      ))}
    </AlertsContainer>
  );
}

export default WeatherAlerts;
