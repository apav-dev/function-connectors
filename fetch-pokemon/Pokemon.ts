interface IPokemon {
  id: number;
  name: string;
  baseExperience: number;
  height: number;
  weight: number;
  abilitiesHidden: boolean[];
  abilitySlots: number[],
  abilityNames: string[],
  abilityUrls: string[],
  statBaseStats: number[];
  statEfforts: number[];
  statNames: string[];
  statUrls: string[];
  backDefault: string;
  backFemale: string;
  backShiny: string;
  backShinyFemale: string;
  frontDefault: string;
  frontFemale: string;
  frontShiny: string;
  frontShinyFemale: string;
  officialArtwork: string;
  typeSlots: number[];
  typeNames: string[];
  typeUrls: string[];
  genus: string;
  pokedexVersionDescriptions: string[];
  pokedexVersions: string[];
  habitat: string;
  generation: string;
  genderRate: number;
  captureRate: number;
  growthRate: string;
  baseHappiness: number;
  isBaby: boolean;
  isLegendary: boolean;
  isMythical: boolean;
  hatchCounter: number;
  hasGenderDifferences: boolean;
  formsSwitchable: boolean;
}

export class Pokemon implements IPokemon {
  id: number;
  name: string;
  baseExperience: number;
  height: number;
  weight: number;
  abilitiesHidden: boolean[];
  abilitySlots: number[];
  abilityNames: string[];
  abilityUrls: string[];
  statBaseStats: number[];
  statEfforts: number[];
  statNames: string[];
  statUrls: string[];
  backDefault: string;
  backFemale: string;
  backShiny: string;
  backShinyFemale: string;
  frontDefault: string;
  frontFemale: string;
  frontShiny: string;
  frontShinyFemale: string;
  officialArtwork: string;
  typeSlots: number[];
  typeNames: string[];
  typeUrls: string[];
  genus: string;
  pokedexVersionDescriptions: string[];
  pokedexVersions: string[];
  habitat: string;
  generation: string;
  genderRate: number;
  captureRate: number;
  growthRate: string;
  baseHappiness: number;
  isBaby: boolean;
  isLegendary: boolean;
  isMythical: boolean;
  hatchCounter: number;
  hasGenderDifferences: boolean;
  formsSwitchable: boolean;

  constructor(
    basicInfoResponse: any, 
    speciesDataResponse: any
    ) {
    this.id = basicInfoResponse.id;
    this.name = speciesDataResponse.name;
    this.baseExperience = basicInfoResponse.base_experience;
    this.height = basicInfoResponse.height;
    this.weight = basicInfoResponse.weight;
    this.abilitiesHidden = basicInfoResponse.abilities.map(a => a.is_hidden);
    this.abilityNames = basicInfoResponse.abilities.map(a => a.ability.name);
    this.abilitySlots = basicInfoResponse.abilities.map(a => a.slot);
    this.abilityUrls = basicInfoResponse.abilities.map(a => a.ability.url);
    this.statBaseStats = basicInfoResponse.stats.map(s => s.base_stat);
    this.statEfforts = basicInfoResponse.stats.map(s => s.effort);
    this.statNames = basicInfoResponse.stats.map(s => s.stat.name);
    this.statUrls = basicInfoResponse.stats.map(s => s.stat.url);
    this.backDefault = basicInfoResponse.sprites.back_default;
    this.backFemale = basicInfoResponse.sprites.back_female;
    this.backShiny = basicInfoResponse.sprites.back_shiny;
    this.backShinyFemale = basicInfoResponse.sprites.back_shiny_female;
    this.frontDefault = basicInfoResponse.sprites.front_default;
    this.frontFemale = basicInfoResponse.sprites.front_female;
    this.frontShiny = basicInfoResponse.sprites.front_shiny;
    this.frontShinyFemale = basicInfoResponse.sprites.front_shiny_female;
    this.officialArtwork = basicInfoResponse.sprites.other['official-artwork'].front_default;
    this.typeSlots = basicInfoResponse.types.map(t => t.slot);
    this.typeNames = basicInfoResponse.types.map(t => t.type.name);
    this.typeUrls = basicInfoResponse.types.map( t => t.type.url);
    this.genus = speciesDataResponse.genera.find(g => g.language.name === 'en').genus,
    this.pokedexVersions = speciesDataResponse.flavor_text_entries.filter(flavor => flavor.language.name === 'en').map(flavor => flavor.version.name);
    this.pokedexVersionDescriptions = speciesDataResponse.flavor_text_entries.filter(flavor => flavor.language.name === 'en').map(flavor => flavor.flavor_text.replace(/[\u0000-\u001F\u007F-\u009F]/g, " "));
    this.habitat = speciesDataResponse.habitat ? speciesDataResponse.habitat.name : '',
    this.generation = speciesDataResponse.generation.name,
    this.genderRate = speciesDataResponse.gender_rate;
    this.captureRate = speciesDataResponse.capture_rate;
    this.growthRate = speciesDataResponse.growth_rate.name;
    this.baseHappiness = speciesDataResponse.base_happiness;
    this.isBaby = speciesDataResponse.is_baby;
    this.isLegendary = speciesDataResponse.is_legendary;
    this.isMythical = speciesDataResponse.is_mythical;
    this.hatchCounter = speciesDataResponse.hatch_counter;
    this.hasGenderDifferences = speciesDataResponse.has_gender_differences;
    this.formsSwitchable = speciesDataResponse.forms_switchable;
  }
}