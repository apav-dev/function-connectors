import { Pokemon } from './Pokemon.ts';

Deno.test("async get Pokemon", async () => {
  const speciesDataResponse = await fetch('https://pokeapi.co/api/v2/pokemon-species/1/').then(response => response.json());
  const pokemonResponse = await fetch('https://pokeapi.co/api/v2/pokemon/1/').then(response => response.json());

  const bulbasaur = new Pokemon(pokemonResponse, speciesDataResponse);
  console.log(bulbasaur);

  if (bulbasaur.name !== 'bulbasaur') {
    throw Error("constructor did not work");
  }
});