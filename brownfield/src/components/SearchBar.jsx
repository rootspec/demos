import React, { Component } from 'react';
import { searchCities } from '../utils/api';
import styles from './SearchBar.module.css';

// Class component — this was the first component written and nobody refactored it
class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      results: [],
      isOpen: false,
    };
    this.timeout = null;
  }

  componentWillUnmount() {
    if (this.timeout) clearTimeout(this.timeout);
  }

  handleChange = (e) => {
    const query = e.target.value;
    this.setState({ query });

    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      if (query.length >= 2) {
        searchCities(query).then((results) => {
          this.setState({ results, isOpen: true });
        });
      } else {
        this.setState({ results: [], isOpen: false });
      }
    }, 300);
  };

  handleSelect = (city) => {
    this.setState({ query: city.name, results: [], isOpen: false });
    this.props.onCitySelect(city);
  };

  render() {
    const { query, results, isOpen } = this.state;

    return (
      <div className={styles.container}>
        <input
          type="text"
          value={query}
          onChange={this.handleChange}
          placeholder="Search for a city..."
          className={styles.input}
        />
        {isOpen && results.length > 0 && (
          <ul className={styles.dropdown}>
            {results.map((city, i) => (
              <li
                key={`${city.id}-${i}`}
                className={styles.item}
                onClick={() => this.handleSelect(city)}
              >
                {city.name}, {city.admin1 || ''} {city.country}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default SearchBar;
