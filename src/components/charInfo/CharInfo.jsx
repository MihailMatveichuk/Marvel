import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import './charInfo.scss';

class CharInfo extends Component {
	state = {
		char: null,
		loading: false,
		error: false,
	};

	marvelService = new MarvelService();

	componentDidMount() {
		this.updateChar();
	}

	componentDidUpdate(prevProps) {
		if (this.props.charId !== prevProps.charId) {
			this.updateChar();
		}
	}

	onCharLoaded = (char) => {
		this.setState({
			char,
			loading: false,
		});
	};

	onCharLoading = () => {
		this.setState({
			loading: true,
		});
	};

	onError = () => {
		this.setState({
			loading: false,
			error: true,
		});
	};

	updateChar = () => {
		const { charId } = this.props;
		if (!charId) {
			return;
		}
		this.onCharLoading();
		this.marvelService
			.getCharacter(charId)
			.then(this.onCharLoaded)
			.catch(this.onError);
	};

	render() {
		const { char, loading, error } = this.state;

		const skeleton = char || loading || error ? null : <Skeleton />;
		const errorMessage = error ? <ErrorMessage /> : null;
		const spiner = loading ? <Spinner /> : null;
		const content = !(error || loading || !char) ? <View char={char} /> : null;
		return (
			<div className='char__info'>
				{skeleton}
				{errorMessage}
				{spiner}
				{content}
			</div>
		);
	}
}

const View = ({ char }) => {
	const { name, description, thumbnail, homepage, wiki, comics } = char;
	console.log(comics);
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
