import { Component, useEffect, useState } from 'react';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const RandomChar = () => {
	const [char, setChar] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	const marvelService = new MarvelService();

	useEffect(() => {
		updateChar();
		const timerId = setInterval(updateChar, 60000);

		return () => {
			clearInterval(timerId);
		};
	}, []);

	const onCharLoaded = (char) => {
		setChar(char);
		setLoading(false);
	};

	const onCharLoading = () => {
		setLoading(true);
	};

	const onError = () => {
		setLoading(false);
		setError(true);
	};

	const updateChar = () => {
		const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
		onCharLoading();
		marvelService.getCharacter(id).then(onCharLoaded).catch(onError);
	};
	const errorMessage = error ? <ErrorMessage /> : null;
	const spiner = loading ? <Spinner /> : null;
	const content = !(error || loading) ? <View char={char} /> : null;
	return (
		<div className='randomchar'>
			{errorMessage}
			{spiner}
			{content}
			<div className='randomchar__static'>
				<p className='randomchar__title'>
					Random character for today!
					<br />
					Do you want to get to know him better?
				</p>
				<p className='randomchar__title'>Or choose another one</p>
				<button className='button button__main' onClick={updateChar}>
					<div className='inner'>try it</div>
				</button>
				<img src={mjolnir} alt='mjolnir' className='randomchar__decoration' />
			</div>
		</div>
	);
};

const View = ({ char }) => {
	const { name, description, thumbnail, homepage, wiki } = char;
	const defaultLink =
		'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
	const style =
		thumbnail === defaultLink ? 'randomchar__img_default' : 'randomchar__img';
	return (
		<div className='randomchar__block'>
			<img src={thumbnail} alt='Random character' className={style} />
			<div className='randomchar__info'>
				<p className='randomchar__name'>{name}</p>
				<p className='randomchar__descr'>
					{description || 'This description will be Added soon'}
				</p>
				<div className='randomchar__btns'>
					<a href={homepage} className='button button__main'>
						<div className='inner'>homepage</div>
					</a>
					<a href={wiki} className='button button__secondary'>
						<div className='inner'>Wiki</div>
					</a>
				</div>
			</div>
		</div>
	);
};

export default RandomChar;
