import { fetchSpeciesPage, fetchSpecies } from "./api.ts";
import { State } from "./types.ts";
import { sleep } from "./utils.ts";

const fetchPlants = async (stateString: string): Promise<string> => {
  let state: State;
  let speciesId = '';

  const inputJson = JSON.parse(stateString);
  state = inputJson.pageToken;

  if(!state){
    state = {
      speciesIndex: 0,
      speciesIdList: [],
      nextPage: 0,
    }
  } 
  else {
    state = JSON.parse(inputJson.pageToken);
  }

  if(state.nextPage == -1 && state.speciesIndex >= state.speciesIdList.length) {
    return JSON.stringify({data: {}})
  }

  if(state.speciesIndex >= state.speciesIdList.length || state.speciesIdList.length === 0){
    // fetch next page of plants species, reset state index to 0, set new species list, set next page url
    const plantPage = await fetchSpeciesPage(state.nextPage);
    state.speciesIndex = 0;
    state.nextPage = plantPage.next ? state.nextPage += 1 : -1;
    state.speciesIdList = plantPage.data.map(speciesLite => speciesLite.id);
  }
    
  // fetch plant species and increment next page url
  speciesId = state.speciesIdList[state.speciesIndex];
  state.speciesIndex = state.speciesIndex + 1;

  const species = await fetchSpecies(speciesId);

  await sleep();

  return JSON.stringify({data: species, nextPageToken: JSON.stringify(state)});
}

export default fetchPlants;