import React, { Component } from 'react';
import { Toaster } from 'react-hot-toast';

import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';

import styles from './App.module.css';

export class App extends Component {
  state = {
    theme: '',
  };

  handleSubmit = theme => {
    this.setState({ theme });
  };

  render() {
    return (
      <div
        className={styles.app}
        style={{
          fontSize: 40,
          color: '#010101',
        }}
      >
        <Toaster position="top-right" toastOptions={{ duration: 2500 }} />
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery theme={this.state.theme} />
      </div>
    );
  }
}
