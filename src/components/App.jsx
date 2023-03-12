import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { toast } from 'react-hot-toast';

import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';
import { Button } from 'components/Button';
import { fetchImagesByTheme } from '../services/pixabayAPI';
import { Loader } from 'components/Loader';

import styles from './App.module.css';

export const App = () => {
  const [theme, setTheme] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!theme) {
      return;
    }
    setLoading(true);
    const fetchImages = async () => {
      try {
        const images = await fetchImagesByTheme(theme, page);

        if (images.hits.length === 0) {
          toast.error('Please, enter a valid theme');
        }

        if (page > 1) {
          setImages(prevstate => [...prevstate, ...images.hits]);
          return;
        }
        setImages(images.hits);
        setTotal(images.total);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [page, theme]);

  const handleSubmit = theme => {
    setImages([]);
    setPage(1);
    setTheme(theme);
  };

  const handleClickButton = () => {
    setPage(prevstate => prevstate + 1);
    setTotal(prevstate => prevstate - 12);
  };

  return (
    <div className={styles.app}>
      <Toaster position="top-right" toastOptions={{ duration: 2500 }} />
      <Searchbar onSubmit={handleSubmit} />
      {error && <h3>{error.message}</h3>}
      <ImageGallery images={images} />
      {loading && <Loader />}
      {total > 12 && !loading && <Button onClick={handleClickButton} />}
    </div>
  );
};
