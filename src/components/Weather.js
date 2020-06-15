import React, { Component } from 'react';
import axios from 'axios';

class Weather extends Component {
  state = {
    weatherData: null,
  };

  componentDidMount() {
    this.getWeather();
  }

  getWeather = () => {
    axios
      .get(
        'https://api.openweathermap.org/data/2.5/weather?q=Vancouver,ca&appid=4a48e1e1428fd83889074671fbf259d9'
      )
      .then((response) => {
        const data = response.data;
        const iconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;

        this.setState({
          weatherData: data,
          weatherIcon: iconUrl,
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { weatherIcon, weatherData } = this.state;

    if (!weatherData) {
      return <p>Loading</p>;
    }

    return (
      <div className="weather">
        <img
          className="weather__icon"
          src={weatherIcon}
          alt={`${weatherData.name} weather`}
        />
        <p className="weather__text">{weatherData.name}</p>
        <p className="weather__text">{weatherData.weather[0].description}</p>
      </div>
    );
  }
}

export default Weather;
