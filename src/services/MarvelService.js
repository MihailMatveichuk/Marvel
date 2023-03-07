class MarvelService {
	_apiKey = "apikey=2871e0d7f3b0d714f363b4a594559b78";
	_URL = "https://gateway.marvel.com:443/v1/public/";
	_baseOffset = 210;

	getResource = async (url) => {
		let res = await fetch(url);
		if (!res.ok) {
			throw new Error(`${res.status}`);
		}

		return await res.json();
	}


	getAllCharacters = async (offset = this._baseOffset) => {
		const res = await this.getResource(`${this._URL}characters?limit=9&offset=${offset}&${this._apiKey}`);
		return res.data.results.map(this._transformCharacter);
	}

	getCharacter = async (id) => {
		const res = await this.getResource(`${this._URL}characters/${id}?&${this._apiKey}`);
		return this._transformCharacter(res.data.results[0]);
	}

	_transformCharacter = (res) => {
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
}

export default MarvelService;