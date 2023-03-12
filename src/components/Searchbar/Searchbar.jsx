import { Formik, Form, Field } from 'formik';
import { toast } from 'react-hot-toast';
import { ImSearch } from 'react-icons/im';
import PropTypes from 'prop-types';

import styles from './SearchBar.module.css';

export const Searchbar = ({ onSubmit }) => {
  const initialValues = {
    theme: '',
  };

  const handleSubmit = (values, { resetForm }) => {
    if (!values.theme) {
      toast.error('Please, enter a valid theme');
    }
    resetForm();
    onSubmit(values.theme.trim());
  };
  return (
    <header className={styles.searchbar}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={styles.searchForm}>
          <button type="submit" className={styles.searchFormButton}>
            <ImSearch />
          </button>
          <Field
            className={styles.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="theme"
          />
        </Form>
      </Formik>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
