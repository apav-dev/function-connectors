// URL to search for all the cards for a particular pokemon
const fetchCardsForPokemonUrl = `https://api.pokemontcg.io/v2/cards?q=name:`;

// URL to get the name of the next pokemon
const fetchPokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/?limit=1`;
declare const API_KEY: string;

export const fetchCardsForPokemon = async (inputString: string) => {
  const inputJson = JSON.parse(inputString);

  // pokemonId will be null if it's the first this function is being called
  const pokemonId = inputJson.pageToken;

  if(!pokemonId){
    // first time function is called, get the name of the 1st pokemon
    const pokemonCardsResponse = await fetchCardsForPokemonId('0');

    // return a list of cards for the first pokemon and the id for getting the next pokemon name. Remember to strigify the response.
    return JSON.stringify({ data: { pokemonCards: pokemonCardsResponse.cards.data.map(c => new PokemonCard(c)) }, nextPageToken: 1});
  } else {

    // get the cards for the next pokemon
    const pokemonCardsResponse = await fetchCardsForPokemonId(pokemonId);

    // if there is another pokemon, iterate the pokemon id and return it as the next page token
    if(pokemonCardsResponse.next){
      return JSON.stringify({ data: { pokemonCards: pokemonCardsResponse.cards.data.map(c => new PokemonCard(c)) }, nextPageToken: parseInt(pokemonId) + 1});

    // if there is not another pokemon, don't return a nextPageToken and the function won't be called again
    } else {
      return JSON.stringify({ data: { pokemonCards: pokemonCardsResponse.cards.data.map(c => new PokemonCard(c)) }});
    }
  }
}

const fetchCardsForPokemonId = async (pokemonId: string) => {
  // get the name of the pokemon for the given pokemon id
  const speciesResponse = await fetchPokemonName(`${fetchPokemonSpeciesUrl}&offset=${pokemonId}`);
  const pokemonName = speciesResponse.results[0].name;

  // use the pokemon name to search for all the cards for that name
  return { cards: await fetchCards(pokemonName), next: speciesResponse.next } 
}

const fetchPokemonName = async (url: string) => {
  // sometimes the API call fails, call it again in the catch block
  try {
    return await fetch(url).then(response => response.json());
  } catch (err) {
    return await fetch(url).then(response => response.json());
  }
}

const fetchCards = async (pokemonName: string) => {
    // sometimes the API call fails, call it again in the catch block
  try{
    return await fetch(`${fetchCardsForPokemonUrl}${pokemonName}`, { headers: { 'X-Api-Key': API_KEY } }).then(response => response.json());
  } catch (err){
    return await fetch(`${fetchCardsForPokemonUrl}${pokemonName}`, { headers: { 'X-Api-Key': API_KEY } }).then(response => response.json());
  }
}

interface IPokemonCard {
  id: string;
  name: string;
  hp: number;
  number: number;
  artist: string;
  rarity: string;
  setId: string;
  setName: string;
  setPrintedTotal: number;
  setTotal: number;
  setReleaseDate: string;
  setUpdatedAt: string;
  setSymbol: string;
  setLogo: string;
  smallImage: string;
  largeImage: string;
  lowNormalPrice: number;
  midNormalPrice: number;
  highNormalPrice: number;
  marketNormalPrice: number;
  directLowNormalPrice: number;
  lowHolofoilPrice: number;
  midHolofoilPrice: number;
  highHolofoilPrice: number;
  marketHolofoilPrice: number;
  directLowHolofoilPrice: number;
  lowReverseHolofoilPrice: number;
  midReverseHolofoilPrice: number;
  highReverseHolofoilPrice: number;
  marketReverseHolofoilPrice: number;
  directLowReverseHolofoilPrice: number;
  low1stEditionHolofoilPrice: number;
  mid1stEditionHolofoilPrice: number;
  high1stEditionHolofoilPrice: number;
  market1stEditionHolofoilPrice: number;
  directLow1stEditionHolofoilPrice: number;
  low1stEditionNormalPrice: number;
  mid1stEditionNormalPrice: number;
  high1stEditionNormalPrice: number;
  market1stEditionNormalPrice: number;
  directLow1stEditionNormalPrice: number;
}

class PokemonCard implements IPokemonCard {
  id: string;
  name: string;
  hp: number;
  number: number;
  artist: string;
  rarity: string;
  smallImage: string;
  largeImage: string;
  setId: string;
  setName: string;
  setPrintedTotal: number;
  setTotal: number;
  setReleaseDate: string;
  setUpdatedAt: string;
  setSymbol: string;
  setLogo: string;
  lowNormalPrice: number;
  midNormalPrice: number;
  highNormalPrice: number;
  marketNormalPrice: number;
  directLowNormalPrice: number;
  lowHolofoilPrice: number;
  midHolofoilPrice: number;
  highHolofoilPrice: number;
  marketHolofoilPrice: number;
  directLowHolofoilPrice: number;
  lowReverseHolofoilPrice: number;
  midReverseHolofoilPrice: number;
  highReverseHolofoilPrice: number;
  marketReverseHolofoilPrice: number;
  directLowReverseHolofoilPrice: number;
  low1stEditionHolofoilPrice: number;
  mid1stEditionHolofoilPrice: number;
  high1stEditionHolofoilPrice: number;
  market1stEditionHolofoilPrice: number;
  directLow1stEditionHolofoilPrice: number;
  low1stEditionNormalPrice: number;
  mid1stEditionNormalPrice: number;
  high1stEditionNormalPrice: number;
  market1stEditionNormalPrice: number;
  directLow1stEditionNormalPrice: number;

  constructor(cardData: any){
    this.id = cardData.id;
    this.name = cardData.name;
    this.hp = cardData.hp;
    this.number = cardData.number;
    this.artist = cardData.artist;
    this.rarity = cardData.rarity;
    this.smallImage = cardData.images.small;
    this.largeImage = cardData.images.large;
    if(cardData.set) {
      this.setId = cardData.set.id;
      this.setName = cardData.set.name;
      this.setPrintedTotal = cardData.set.printedTotal;
      this.setTotal = cardData.set.total;
      this.setReleaseDate = cardData.set.releaseDate;
      this.setUpdatedAt = cardData.set.updatedAt;
      this.setSymbol = cardData.set.images.symbol
      this.setLogo = cardData.set.images.logo;
    }
    if(cardData.tcgplayer && cardData.tcgplayer.prices){
      if(cardData.tcgplayer.prices.normal){
        this.lowNormalPrice = cardData.tcgplayer.prices.normal.low;
        this.midNormalPrice = cardData.tcgplayer.prices.normal.mid;
        this.highNormalPrice = cardData.tcgplayer.prices.normal.high;
        this.marketNormalPrice = cardData.tcgplayer.prices.normal.market;
        this.directLowNormalPrice = cardData.tcgplayer.prices.normal.directLow;
      }
      if(cardData.tcgplayer.prices.holofoil){
        this.lowHolofoilPrice = cardData.tcgplayer.prices.holofoil.low;
        this.midHolofoilPrice = cardData.tcgplayer.prices.holofoil.mid;
        this.highHolofoilPrice = cardData.tcgplayer.prices.holofoil.high;
        this.marketHolofoilPrice = cardData.tcgplayer.prices.holofoil.market;
        this.directLowHolofoilPrice = cardData.tcgplayer.prices.holofoil.directLow;
      }
      if(cardData.tcgplayer.prices.reverseHolofoil){
        this.lowReverseHolofoilPrice = cardData.tcgplayer.prices.reverseHolofoil.low;
        this.midReverseHolofoilPrice = cardData.tcgplayer.prices.reverseHolofoil.mid;
        this.highReverseHolofoilPrice = cardData.tcgplayer.prices.reverseHolofoil.high;
        this.marketReverseHolofoilPrice = cardData.tcgplayer.prices.reverseHolofoil.market;
        this.directLowReverseHolofoilPrice = cardData.tcgplayer.prices.reverseHolofoil.directLow;
      }
      if(cardData.tcgplayer.prices['1stEditionHolofoil']){
        this.low1stEditionHolofoilPrice = cardData.tcgplayer.prices['1stEditionHolofoil'].low;
        this.mid1stEditionHolofoilPrice = cardData.tcgplayer.prices['1stEditionHolofoil'].mid;
        this.high1stEditionHolofoilPrice = cardData.tcgplayer.prices['1stEditionHolofoil'].high;
        this.market1stEditionHolofoilPrice = cardData.tcgplayer.prices['1stEditionHolofoil'].market;
        this.directLow1stEditionHolofoilPrice = cardData.tcgplayer.prices['1stEditionHolofoil'].directLow;
        
      }
      if(cardData.tcgplayer.prices['1stEditionNormal']){
        this.low1stEditionNormalPrice = cardData.tcgplayer.prices['1stEditionNormal'].low;
        this.mid1stEditionNormalPrice = cardData.tcgplayer.prices['1stEditionNormal'].mid;
        this.high1stEditionNormalPrice = cardData.tcgplayer.prices['1stEditionNormal'].high;
        this.market1stEditionNormalPrice = cardData.tcgplayer.prices['1stEditionNormal'].market;
        this.directLow1stEditionNormalPrice = cardData.tcgplayer.prices['1stEditionNormal'].directLow;
      }
    }
  }
} 
