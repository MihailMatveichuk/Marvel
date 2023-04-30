import './comicsList.scss';
import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const ComicsList = () => {
	const [comicsList, setComicsList] = useState([]);
	const [newItemLoading, setNewItemLoading] = useState(false);
	const [offset, setOffset] = useState(0);
	const [comicsEnded, setComicsEnded] = useState(false);

	const { loading, err, getAllComics } = useMarvelService();

	useEffect(() => {
		onRequest(offset, true);
	}, []);

	const onRequest = (offset, initial) => {
		initial ? setNewItemLoading(false) : setNewItemLoading(true);
		getAllComics(offset).then(onComicsListLoaded);
	};

	const onComicsListLoaded = (newComicsList) => {
		let ended = false;
		if (newComicsList.length < 8) {
			ended = true;
		}
		setComicsList([...comicsList, ...newComicsList]);
		setNewItemLoading(false);
		setOffset(offset + 8);
		setComicsEnded(ended);
	};

	function renderItems(arr) {
		const items = arr.map((item, i) => {
			return (
				<li className='comics__item' key={i}>
					<img
						src={item.thumbnail}
						alt={item.title}
						className='comics__item-img'
					/>
					<div className='comics__item-name'>{item.title}</div>
					<div className='comics__item-price'>{item.price}</div>
				</li>
			);
		});
		return <ul className='comics__grid'>{items}</ul>;
	}

	const items = renderItems(comicsList);

	const errorMessage = err ? <ErrorMessage /> : null;
	const spinner = loading && !newItemLoading ? <Spinner /> : null;

	return (
		<div className='char__list'>
			{errorMessage}
			{spinner}
			{items}
			<button
				className='button button__main button__long'
				disabled={newItemLoading}
				style={{ display: comicsEnded ? 'none' : 'block' }}
			>
				<div className='inner' onClick={() => onRequest(offset)}>
					load more
				</div>
			</button>
		</div>
	);
};

export default ComicsList;
