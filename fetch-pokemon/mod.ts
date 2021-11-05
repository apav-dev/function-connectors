import { Pokemon } from './Pokemon.ts';

const fetchPokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/?limit=1`;

export const fetchPokemon = async (inputString: string) => {
  const inputJson = JSON.parse(inputString);
  const nextSpeciesUrl = inputJson.pageToken;

  if (!nextSpeciesUrl) {
    const speciesUrlsResponse = await fetch(fetchPokemonSpeciesUrl).then(response => response.json());
    const firstSpeciesUrl = speciesUrlsResponse.results[0].url;

    return JSON.stringify({ data: { pokemon: [ await getPokemonFromApis(firstSpeciesUrl) ] }, nextPageToken: speciesUrlsResponse.next }); 
  } else {
    try {
      const speciesUrlsResponse = await fetch(nextSpeciesUrl).then(response => response.json());

      return JSON.stringify({ data: { pokemon: [ await getPokemonFromApis(speciesUrlsResponse.results[0].url) ] }, nextPageToken: speciesUrlsResponse.next}); 

      // retry API request when it times out
    } catch (err) {
      const speciesUrlsResponse = await fetch(nextSpeciesUrl).then(response => response.json());

      return JSON.stringify({ data: { pokemon: [ await getPokemonFromApis(speciesUrlsResponse.results[0].url) ] }, nextPageToken: speciesUrlsResponse.next}); 
    }
  }
}

const getPokemonFromApis = async (speciesUrl: string) => {
  const speciesDataResponse = await fetch(speciesUrl).then(response => response.json());

  const basicInfoUrl = speciesUrl.replace('-species', '');
  const basicInfoResponse = await fetch(basicInfoUrl).then(response => response.json());

  return new Pokemon(basicInfoResponse, speciesDataResponse);
}
