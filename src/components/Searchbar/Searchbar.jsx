import { useState } from 'react';
import style from '../../styles.module.css';

export const Searchbar = ({ handleSubmit }) => {
  const [inpValue, setInpValue] = useState('');

  const onChange = ev => {
    setInpValue(ev.target.value);
  };

  const onSubmit = ev => {
    ev.preventDefault();
    handleSubmit(inpValue);
  };

  return (
    <header className={style.Searchbar}>
      <form className={style.SearchForm} onSubmit={onSubmit}>
        <button type="submit" className={style.SearchFormButton}>
          <span className={style.SearchFormButtonLabel}></span>
        </button>

        <input
          className={style.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onChange}
          value={inpValue}
          name="inpValue"
        />
      </form>
    </header>
  );
};
