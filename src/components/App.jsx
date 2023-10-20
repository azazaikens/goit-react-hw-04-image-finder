import { useState, useEffect } from 'react';
import { axiosAPI } from './axios';

import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

import style from '../styles.module.css';

export const App = () => {
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState({
    isOpen: false,
    modalData: null,
  });

  const handleSubmit = inputValue => {
    setQuery(inputValue);
    setPage(1);
  };

  const onClickLoadMore = () => {
    setPage(page + 1);
  };

  const onOpenModal = modalData => {
    setModal({
      isOpen: true,
      modalData: modalData,
    });
  };

  const onCloseModal = () => {
    setModal({
      isOpen: false,
      modalData: null,
    });
  };

  useEffect(() => {
    if (page === 1 && query === '') {
      return;
    }

    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await axiosAPI(query, page);
        setPosts(prevPosts =>
          page > 1 ? [...prevPosts, ...response.hits] : response.hits
        );
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [query, page]);

  return (
    <div className={style.App}>
      <Searchbar handleSubmit={handleSubmit} />
      <Loader loadingt={isLoading} error={error} />
      <ImageGallery posts={posts} onOpenModal={onOpenModal} />
      <Button onClickLoadMore={onClickLoadMore} />
      {modal.isOpen === true && (
        <Modal data={modal.modalData} onCloseModal={onCloseModal} />
      )}
    </div>
  );
};
