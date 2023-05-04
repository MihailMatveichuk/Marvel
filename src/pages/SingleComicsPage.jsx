import "./singleComicsPage.scss";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useMarvelService from "../services/MarvelService";
import Spinner from "../components/spinner/Spinner";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";

const SingleComicsPage = () => {
  const { comicId } = useParams();
  const [comic, setComic] = useState(null);
  const { loading, err, getComic, clearError } = useMarvelService();

  useEffect(() => {
    updateComic();
  }, [comicId]);

  const onComicLoaded = (comic) => {
    setComic(comic);
  };

  const updateComic = () => {
    if (!comicId) {
      return;
    }
    clearError();
    getComic(comicId).then(onComicLoaded);
  };

  const errorMessage = err ? <ErrorMessage /> : null;
  const spiner = loading ? <Spinner /> : null;
  const content = !(err || loading || !comic) ? <View comic={comic} /> : null;
  return (
    <>
      {errorMessage}
      {spiner}
      {content}
    </>
  );
};

const View = ({ comic }) => {
  const { title, description, thumbnail, price, pageCount, language } = comic;
  return (
    <div className='single-comic'>
      <img src={thumbnail} alt={title} className='single-comic__img' />
      <div className='single-comic__info'>
        <h2 className='single-comic__name'>{title}</h2>
        <p className='single-comic__descr'>{description}</p>
        <p className='single-comic__descr'>{pageCount}</p>
        <p className='single-comic__descr'> Language: {language}</p>
        <div className='single-comic__price'>{price}</div>
      </div>
      <Link to={"/comics"} className='single-comic__back'>
        Back to all
      </Link>
    </div>
  );
};

export default SingleComicsPage;
