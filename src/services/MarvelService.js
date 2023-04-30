import useHttp from "../hooks/http.hook";
const useMarvelService = () => {

	const {
		loading,
		request,
		err,
		clearError
	} = useHttp()

	const _apiKey = "apikey=2871e0d7f3b0d714f363b4a594559b78";
	const _URL = "https://gateway.marvel.com:443/v1/public/";
	const _baseOffset = 210;


	const getAllCharacters = async (offset = _baseOffset) => {
		const res = await request(`${_URL}characters?limit=9&offset=${offset}&${_apiKey}`);
		return res.data.results.map(_transformCharacter);
	}

	const getCharacter = async (id) => {
		const res = await request(`${_URL}characters/${id}?&${_apiKey}`);
		return _transformCharacter(res.data.results[0]);
	}

	const _transformCharacter = (res) => {
		return {
			id: res.id,
			name: res.name,
			description: res.description.length > 180 ?
				res.description.slice(0, 177) + '...' : res.description,
			thumbnail: res.thumbnail.path +
				'.' +
				res.thumbnail.extension,
			homepage: res.urls[0].url,
			wiki: res.urls[1].url,
			comics: res.comics.items,
		}
	}

	return {
		loading,
		err,
		getAllCharacters,
		getCharacter,
		clearError
	}
}

export default useMarvelService;