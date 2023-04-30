import './charList.scss';
import { useEffect, useRef, useState } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const CharList = ({ onCharSelected }) => {
	const [charList, setCharList] = useState([]);
	const [loading, setLoading] = useState(true);
	const [err, setErr] = useState(false);
	const [newItemLoading, setNewItemLoading] = useState(false);
	const [offset, setOffset] = useState(210);
	const [charEnded, setCharEnded] = useState(false);

	const marvelService = new MarvelService();

	useEffect(() => {
		onRequest();
	}, []);

	const onCharListLoaded = (newCharList) => {
		let ended = false;
		if (newCharList < 9) {
			ended = true;
		}
		setCharList((charList) => [...charList, ...newCharList]);
		setLoading(false);
		setNewItemLoading((newItemLoading) => false);
		setOffset((offset) => offset + 9);
		setCharEnded((charEnded) => ended);
	};

	const onError = () => {
		setLoading(false);
		setErr(true);
	};

	const onRequest = (offset) => {
		onCharListLoading();
		marvelService
			.getAllCharacters(offset)
			.then(onCharListLoaded)
			.catch(onError);
	};

	const onCharListLoading = () => {
		setNewItemLoading(true);
	};

	const itemRefs = useRef([]);

	const focusOnItem = (id) => {
		itemRefs.current.forEach((item) =>
			item.classList.remove('char__item_selected')
		);
		itemRefs.current[id].classList.add('char__item_selected');
		itemRefs.current[id].focus();
	};

	function renderItems(arr) {
		const items = arr.map((item, i) => {
			let imgStyle = { objectFit: 'cover' };
			if (
				item.thumbnail ===
				'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
			) {
				imgStyle = { objectFit: 'unset' };
			}

			return (
				<li
					className='char__item'
					key={item.id}
					ref={(el) => (itemRefs.current[i] = el)}
					tabIndex={0}
					onClick={() => {
						onCharSelected(item.id);
						focusOnItem(i);
					}}
					onKeyDown={(e) => {
						if (e.key === ' ' || e.key === 'Enter') {
							onCharSelected(item.id);
							focusOnItem(i);
						}
					}}
				>
					<img src={item.thumbnail} alt={item.name} style={imgStyle} />
					<div className='char__name'>{item.name}</div>
				</li>
			);
		});
		return <ul className='char__grid'>{items}</ul>;
	}

	const items = renderItems(charList);

	const errorMessage = err ? <ErrorMessage /> : null;
	const spinner = loading ? <Spinner /> : null;
	const content = !(loading || err) ? items : null;

	return (
		<div className='char__list'>
			{errorMessage}
			{spinner}
			{content}
			<button
				className='button button__main button__long'
				disabled={newItemLoading}
				style={{ display: charEnded ? 'none' : 'block' }}
			>
				<div className='inner' onClick={() => onRequest(offset)}>
					load more
				</div>
			</button>
		</div>
	);
};

export default CharList;
