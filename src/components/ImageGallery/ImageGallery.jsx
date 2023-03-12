import React, { Component } from 'react';
import { toast } from 'react-hot-toast';
import PropTypes from 'prop-types';

import { fetchImagesByTheme } from '../../services/pixabayAPI';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { Loader } from 'components/Loader';
import { Button } from 'components/Button';

import styles from './ImageGallery.module.css';

export class ImageGallery extends Component {
  state = {
    images: [],
    loading: false,
    error: false,
    page: 1,
    total: 0,
  };

  async componentDidUpdate(prevprops, prevstate) {
    if (
      prevstate.page !== this.state.page ||
      prevprops.theme !== this.props.theme
    ) {
      this.setState({ loading: true });
      if (prevprops.theme !== this.props.theme) {
        this.setState({ images: [] });
      }
      try {
        const images = await fetchImagesByTheme(
          this.props.theme,
          this.state.page
        );
        if (images.hits.length === 0) {
          toast.error('Please, enter a valid theme');
        }
        if (prevprops.theme === this.props.theme && this.state.page !== 1) {
          this.setState(prev => ({
            images: [...prev.images, ...images.hits],
          }));
          return;
        }
        this.setState({ images: images.hits, total: images.total, page: 1 });
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  handleClickButton = () => {
    this.setState(prevstate => ({
      page: prevstate.page + 1,
      total: prevstate.total - 12,
    }));
  };

  render() {
    const { images, error, loading, total } = this.state;
    return (
      <>
        {error && <h3>{error.message}</h3>}
        {images.length > 0 && (
          <ul className={styles.gallery}>
            {images.map(image => (
              <ImageGalleryItem image={image} key={image.id} />
            ))}
          </ul>
        )}
        {loading && <Loader />}
        {total > 12 && !loading && <Button onClick={this.handleClickButton} />}
      </>
    );
  }
}

ImageGallery.propTypes = {
  theme: PropTypes.string.isRequired,
};
