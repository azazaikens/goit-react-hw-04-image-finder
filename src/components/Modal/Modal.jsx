import { useEffect } from 'react';
import style from '../../styles.module.css';

export const Modal = ({ data, onCloseModal }) => {
  useEffect(() => {
    const handleKeydown = event => {
      if (event.code === 'Escape') {
        onCloseModal();
      }
      // console.log('escape')
    };

    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [onCloseModal]);

  const handlOverlayClick = event => {
    if (event.target === event.currentTarget) {
      onCloseModal();
    }
  };

  return (
    <div className={style.Overlay} onClick={handlOverlayClick}>
      <div className={style.Modal}>
        <img src={data} alt="somebody" />
      </div>
    </div>
  );
};
