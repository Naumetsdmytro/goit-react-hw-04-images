import PropTypes from 'prop-types';

import { ImageGalleryItem } from 'components/ImageGalleryItem';

import styles from './ImageGallery.module.css';

export const ImageGallery = ({ images }) => {
  return (
    <>
      {images.length > 0 && (
        <ul className={styles.gallery}>
          {images.map(image => (
            <ImageGalleryItem image={image} key={image.id} />
          ))}
        </ul>
      )}
    </>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
};
