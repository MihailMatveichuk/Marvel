import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import './charInfo.scss';

const CharInfo = (props) => {
	const [chared, setChared] = useState(null);
	const { loading, err, getCharacter, clearError } = useMarvelService();

	useEffect(() => {
		updateChar();
	}, [props.charId]);

	const onCharLoaded = (char) => {
		setChared(char);
	};

	const updateChar = () => {
		const { charId } = props;
		if (!charId) {
			return;
		}
		clearError();
		getCharacter(charId).then(onCharLoaded);
	};

	const skeleton = chared || loading || err ? null : <Skeleton />;
	const errorMessage = err ? <ErrorMessage /> : null;
	const spiner = loading ? <Spinner /> : null;
	const content = !(err || loading || !chared) ? <View char={chared} /> : null;
	return (
		<div className='char__info'>
			{skeleton}
			{errorMessage}
			{spiner}
			{content}
		</div>
	);
};

const View = ({ char }) => {
	const { name, description, thumbnail, homepage, wiki, comics } = char;
	const defaultLink =
		'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
	const style = thumbnail === defaultLink ? 'default' : null;
	return (
		<>
			<div className='char__basics'>
				<img src={thumbnail} alt={name} className={style} />
				<div>
					<div className='char__info-name'>{name}</div>
					<div className='char__btns'>
						<a href={homepage} className='button button__main'>
							<div className='inner'>homepage</div>
						</a>
						<a href={wiki} className='button button__secondary'>
							<div className='inner'>Wiki</div>
						</a>
					</div>
				</div>
			</div>
			<div className='char__descr'>
				{description || 'This description will be Added soon'}
			</div>
			<div className='char__comics'>Comics:</div>
			<ul className='char__comics-list'>
				{comics.length > 0 ? null : 'There is no comics'}
				{comics
					.map((item, i) => {
						return (
							<li className='char__comics-item' key={i}>
								{item.name}
							</li>
						);
					})
					.splice(0, 9)}
			</ul>
		</>
	);
};

export default CharInfo;
