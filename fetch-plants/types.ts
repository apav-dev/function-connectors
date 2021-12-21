// deno-lint-ignore-file camelcase
export type State = {
  speciesIndex: number,
  speciesIdList: string[],
  nextPage: number,
}

export type SpeciesListResponse = {
  data: SpeciesLight[],
  meta: ListMeta,
  self: string,
  first?: string,
  next?: string,
  prev?: string,
  last?: string,
}

export type SpeciesLight = {
  id: string,
  common_name?: string,
  slug: string,
  scientific_name: string,
  year?: number,
  bibliography?: string,
  author?: string,
  status: string,
  rank: string,
  family_common_name?: string,
  family: string,
  genus_id: string,
  genus: string,
  image_url?: string,
  links: Links,
  synonyms?: string[] | Synonym,
  images?: Images,
}

export type Species = SpeciesLight & {
  duration?: string[],
  edible_part?: string[],
  edible?: boolean,
  vegetable?: boolean,
  observations?: string,
  // common_names
  distributions?: Distributions, 
  flower?: Flower,
  foilage?: Foilage,
  fruit_or_seed?: FruitOrSeed,
  specifications: Specifications,
  growth: Growth,
  sources?: Source[],
  // deno-lint-ignore no-explicit-any
  extras: any
}

export type Links = {
  self: string,
  genus: string,
  plant: string,
}

export type ListMeta = {
  total: number;
}

export type SpeciesMeta = { 
  last_modified: string,  
  images_count: string,
  sources_count: string,
  synonyms_count: string,
}

export type Image = {
  id: string,
  image_url: string,
  copyright?: string,
}

export type Images = {
  flower?: Image[],
  leaf?: Image[],
  habit?: Image[],
  fruit?: Image[],
  bark?: Image[],
  other?: Image[],
}

export type Distributions = {
  native?: Zone[],
  introduced?: Zone[],
  doubtful?: Zone[],
  absent?: Zone[],
  extinct?: Zone[],
}

export type Zone = {
  id: string,
  name: string,
  slug: string,
  tdwg_code: string,
  tdwg_level: number,
  species_count: number,
  links: ZoneLinks,
}

export type ZoneLinks = {
  self: string,
  species: string,
  plants: string,
}

export type Flower = {
  color?: string[],
  conspicuous?: boolean,
}

export type FruitOrSeed = Flower & {
  shape?: string,
  seed_persistence?: boolean,
}

export type Foilage = {
  texture?: string,
  color?: string[],
  leaf_retention?: boolean, 
}

export type Specifications = { 
  ligneous_type?: string,
  growth_form?: string,
  growth_habit?: string,
  growth_rate?: string,
  average_height: CM,
  maximum_height: CM,
  nitrogen_fixation?: string,
  shape_and_orientation?: string
  toxicity?: string,
}

export type CM = {
  cm?: number;
}

export type MM = {
  mm?: number;
}

export type Temperature = {
  deg_f?: number,
  deg_c?: number,
}

export type Source = {
  id: string,
  name: string,
  citation?: string,
  url?: string
  last_update: string,
}

export type Growth = {
  days_to_harvest?: number,
  description?: string,
  sowing?: string,
  ph_maximum?: number,
  light?: number,
  atmospheric_humidity?: number,
  growth_months?: string[],
  bloom_months?: string[],
  fruit_months?: string[],
  row_spacing?: CM,
  spread?: CM,
  minimum_precipitation?: MM,
  maximum_precipitation?: MM,
  minimum_root_depth?: CM,
  minimum_temperature?: Temperature,
  maximum_temperature?: Temperature,
  soil_nutriments?: number,
  soil_salinity?: number,
  soil_texture?: number,
  soil_humidity?: number,
}

export type Synonym = { 
  id: string,
  name: string,
  author: string,
}