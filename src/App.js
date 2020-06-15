import React, { Component } from 'react';
import axios from 'axios';
import Clock from './components/Clock';
import Quote from './components/Quote';
import Weather from './components/Weather';
import './App.css';

class App extends Component {
  bgImageTimer = null;

  state = {
    bgImgUrl: '',
    quote: '',
  };

  componentDidMount() {
    this.getQuote();
    this.getBgImage();
  }

  getBgImage = (term) => {
    const searchTerm = term || 'mountains';

    axios
      .get(
        `https://api.unsplash.com/search/photos?query=${searchTerm}&client_id=rlxxyFZH9gSAEOdP7UXVSZllIPQk1f9_Lwjo6qbpq_0`
      )
      .then((response) => {
        const data = response.data.results;
        if (!data.length) return;

        this.setBgImage(data);

        if (this.bgImageTimer) {
          clearInterval(this.bgImageTimer);
          this.bgImageTimer = setInterval(() => {
            this.setBgImage(data);
          }, 20000);
        } else {
          this.bgImageTimer = setInterval(() => {
            this.setBgImage(data);
          }, 20000);
        }
      })
      .catch((err) => console.log(err));
  };

  // fetch large set of quote data and create quote elem with timer
  getQuote() {
    axios
      .get(`https://cors-anywhere.herokuapp.com/https://type.fit/api/quotes`)
      .then((response) => {
        const data = response.data;

        const shuffleQuote = () => {
          return this.randomArrayIndex(data).text;
        };

        // initial quote
        this.setState({
          quote: <Quote text={shuffleQuote()} />,
        });

        // load random quote every 6 seconds
        setInterval(() => {
          this.setState({
            quote: <Quote text={shuffleQuote()} />,
          });
        }, 6000);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // util to get random index from array of elems
  randomArrayIndex(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  setBgImage = (data) => {
    const root = document.body;
    const randomImage = this.randomArrayIndex(data);
    const bgImage = randomImage.urls.regular;
    root.style.setProperty('--main-bg-img', `url(${bgImage}) center/cover`);
  };

  handleImageFormSubmit = (event) => {
    event.preventDefault();
    const searchTerm = event.target.imageSearch.value;
    searchTerm && this.getBgImage(searchTerm);
  };

  render() {
    return (
      <div className="app">
        <h1 className="app__title">Momentus</h1>
        <Clock />
        <form
          onSubmit={this.handleImageFormSubmit}
          id="image-form"
          className="image-form"
        >
          <input
            className="image-form__input"
            name="imageSearch"
            type="text"
            placeholder="image term"
          />
          <button className="image-form__submit" type="submit">
            set background
          </button>
        </form>
        {this.state.quote || 'loading quotes'}
        <Weather />
      </div>
    );
  }
}

export default App;
