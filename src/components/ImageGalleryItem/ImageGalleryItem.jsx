import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Modal } from 'components/Modal';

import styles from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
  image: { webformatURL, tags, largeImageURL },
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(prevstate => !prevstate);

  return (
    <li className="galleryItem">
      <img
        src={webformatURL}
        alt={tags}
        className={styles.galleryItemImage}
        onClick={toggleModal}
      />
      {isModalOpen && (
        <Modal
          largeImageURL={largeImageURL}
          tags={tags}
          onClose={toggleModal}
        />
      )}
    </li>
  );
};

ImageGalleryItem.propTypesm = {
  image: PropTypes.exact({
    tags: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};
